-- When career.status is set to Hired, copy the applicant into workforce.
-- Safe to re-run. Requires public.career (004) and public.workforce (001).

alter table public.career
  add column if not exists workforce_uin integer references public.workforce (uin) on delete set null;

create index if not exists career_workforce_uin_idx on public.career (workforce_uin);

comment on column public.career.status is 'New on submit. Set to Hired to auto-promote into workforce.';
comment on column public.career.workforce_uin is 'Set automatically when status becomes Hired';

create or replace function public.promote_career_to_workforce()
returns trigger
language plpgsql
as $$
declare
  v_uin integer;
  v_parts text[];
  v_first text;
  v_middle text;
  v_last text;
  v_bio text;
  v_city_id integer;
  v_area_id integer;
  v_area_name text;
  v_service_name text;
  v_service_id integer;
  v_names text[] := array[]::text[];
begin
  -- Only promote when status becomes Hired (case-insensitive)
  if lower(trim(coalesce(new.status, ''))) <> 'hired' then
    return new;
  end if;

  -- Already promoted
  if new.workforce_uin is not null then
    return new;
  end if;

  -- Skip if status did not change into Hired
  if tg_op = 'UPDATE'
     and lower(trim(coalesce(old.status, ''))) = 'hired' then
    return new;
  end if;

  -- Split full name
  v_parts := regexp_split_to_array(trim(new.full_name), '\s+');
  if array_length(v_parts, 1) is null then
    v_first := null;
    v_middle := null;
    v_last := null;
  elsif array_length(v_parts, 1) = 1 then
    v_first := v_parts[1];
    v_middle := null;
    v_last := null;
  elsif array_length(v_parts, 1) = 2 then
    v_first := v_parts[1];
    v_middle := null;
    v_last := v_parts[2];
  else
    v_first := v_parts[1];
    v_last := v_parts[array_length(v_parts, 1)];
    v_middle := array_to_string(v_parts[2:array_length(v_parts, 1) - 1], ' ');
  end if;

  v_bio := nullif(
    trim(both E'\n' from concat_ws(
      E'\n\n',
      case when new.email is not null and new.email <> '' then 'Email: ' || new.email end,
      case when new.years_experience is not null and new.years_experience <> ''
        then 'Years of experience: ' || new.years_experience end,
      case when new.insurance_policy_number is not null and new.insurance_policy_number <> ''
        then 'Insurance policy: ' || new.insurance_policy_number end,
      case when new.emergency_contact is not null and new.emergency_contact <> ''
        then 'Emergency contact: ' || new.emergency_contact end,
      case when new.cover_letter is not null and new.cover_letter <> ''
        then 'Cover letter:' || E'\n' || new.cover_letter end,
      case when new.resume_url is not null and new.resume_url <> ''
        then 'Resume: ' || new.resume_url end,
      case when new.id is not null
        then 'Career application id: ' || new.id::text end
    )),
    ''
  );

  select c.id into v_city_id
  from public.cities c
  where lower(c.name) = 'kathmandu'
  limit 1;

  -- Primary area = first preferred area
  if new.preferred_areas is not null and array_length(new.preferred_areas, 1) >= 1 then
    v_area_name := trim(new.preferred_areas[1]);
    select a.id into v_area_id
    from public.areas a
    where lower(a.name) = lower(v_area_name)
      and (v_city_id is null or a.city_id = v_city_id)
    limit 1;
  end if;

  -- Allocate next UIN
  select coalesce(max(w.uin), 0) + 1 into v_uin from public.workforce w;

  insert into public.workforce (
    uin,
    first_name,
    middle_name,
    last_name,
    phone,
    city_id,
    area_id,
    issues,
    bio,
    government_issued_id_filename,
    government_issued_id_url,
    training_certificate,
    profile_status,
    created_date,
    updated_at,
    migrated_at
  ) values (
    v_uin,
    v_first,
    v_middle,
    v_last,
    new.phone,
    v_city_id,
    v_area_id,
    new.message,
    v_bio,
    new.id_proof_filename,
    new.id_proof_url,
    new.resume_url,
    'active',
    coalesce(new.submitted_at, now()),
    now(),
    now()
  );

  -- Services from positions + expertise
  if new.positions is not null then
    v_names := v_names || new.positions;
  end if;
  if new.expertise is not null then
    v_names := v_names || new.expertise;
  end if;

  if array_length(v_names, 1) is not null then
    foreach v_service_name in array v_names loop
      if v_service_name is null or trim(v_service_name) = '' then
        continue;
      end if;
      select s.id into v_service_id
      from public.services s
      where lower(s.name) = lower(trim(v_service_name))
      limit 1;
      if v_service_id is not null then
        insert into public.workforce_services (workforce_uin, service_id)
        values (v_uin, v_service_id)
        on conflict do nothing;
      end if;
    end loop;
  end if;

  -- Working areas
  if new.preferred_areas is not null then
    foreach v_area_name in array new.preferred_areas loop
      if v_area_name is null or trim(v_area_name) = '' then
        continue;
      end if;
      select a.id into v_area_id
      from public.areas a
      where lower(a.name) = lower(trim(v_area_name))
        and (v_city_id is null or a.city_id = v_city_id)
      limit 1;
      if v_area_id is not null then
        insert into public.workforce_working_areas (workforce_uin, area_id)
        values (v_uin, v_area_id)
        on conflict do nothing;
      end if;
    end loop;
  end if;

  new.workforce_uin := v_uin;
  return new;
end;
$$;

drop trigger if exists career_hire_to_workforce on public.career;

create trigger career_hire_to_workforce
before insert or update of status on public.career
for each row
execute function public.promote_career_to_workforce();
