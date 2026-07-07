-- Upgrade legacy databases that still have workforce_services / career tables.
-- Fresh installs use 001 only (single public.workforce table).

-- ---------------------------------------------------------------------------
-- Extend workforce if upgrading from an older schema
-- ---------------------------------------------------------------------------

alter table public.workforce
  add column if not exists email text,
  add column if not exists positions text[] default '{}',
  add column if not exists expertise text[] default '{}',
  add column if not exists services text[] default '{}',
  add column if not exists years_experience text,
  add column if not exists working_areas text[] default '{}',
  add column if not exists insurance_policy_number text,
  add column if not exists emergency_contact text,
  add column if not exists cover_letter text,
  add column if not exists resume_filename text,
  add column if not exists resume_url text,
  add column if not exists submitted_at timestamptz;

alter table public.workforce
  alter column positions set default '{}',
  alter column expertise set default '{}',
  alter column services set default '{}',
  alter column working_areas set default '{}';

update public.workforce
set
  positions = coalesce(positions, '{}'),
  expertise = coalesce(expertise, '{}'),
  services = coalesce(services, '{}'),
  working_areas = coalesce(working_areas, '{}');

-- Migrate legacy join-table data into workforce arrays
do $$
begin
  if to_regclass('public.workforce_services') is not null then
    update public.workforce w
    set services = coalesce(sub.names, w.services, '{}')
    from (
      select
        ws.workforce_uin,
        array_agg(distinct s.name order by s.name) as names
      from public.workforce_services ws
      join public.services s on s.id = ws.service_id
      group by ws.workforce_uin
    ) sub
    where w.uin = sub.workforce_uin;
  end if;

  if to_regclass('public.workforce_working_areas') is not null then
    update public.workforce w
    set working_areas = coalesce(sub.names, w.working_areas, '{}')
    from (
      select
        wwa.workforce_uin,
        array_agg(distinct a.name order by a.name) as names
      from public.workforce_working_areas wwa
      join public.areas a on a.id = wwa.area_id
      group by wwa.workforce_uin
    ) sub
    where w.uin = sub.workforce_uin;
  end if;
end $$;

-- Normalize profile_status
update public.workforce
set profile_status = case
  when profile_status is null or trim(profile_status) = '' then 'Active'
  when lower(trim(profile_status)) in ('active', 'approved', 'hired') then 'Active'
  when lower(trim(profile_status)) in ('suspended', 'inactive', 'blocked') then 'Suspended'
  when lower(trim(profile_status)) in (
    'new', 'pending', 'waiting', 'waiting for verification'
  ) then 'Waiting for Verification'
  when profile_status in ('Active', 'Suspended', 'Waiting for Verification') then profile_status
  else 'Active'
end;

-- Migrate pending career applications into workforce
do $$
declare
  r record;
  v_parts text[];
  v_first text;
  v_middle text;
  v_last text;
  v_services text[];
begin
  if to_regclass('public.career') is null then
    return;
  end if;

  for r in
    select *
    from public.career
    where workforce_uin is null
  loop
    v_parts := regexp_split_to_array(trim(r.full_name), '\s+');
    if coalesce(array_length(v_parts, 1), 0) = 0 then
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

    v_services := array[]::text[];
    if r.positions is not null then
      v_services := v_services || r.positions;
    end if;
    if r.expertise is not null then
      v_services := v_services || r.expertise;
    end if;

    insert into public.workforce (
      first_name,
      middle_name,
      last_name,
      phone,
      email,
      positions,
      expertise,
      services,
      years_experience,
      working_areas,
      insurance_policy_number,
      emergency_contact,
      cover_letter,
      issues,
      government_issued_id_filename,
      government_issued_id_url,
      resume_filename,
      resume_url,
      profile_status,
      created_date,
      submitted_at,
      updated_at,
      migrated_at
    ) values (
      v_first,
      v_middle,
      v_last,
      r.phone,
      r.email,
      coalesce(r.positions, '{}'),
      coalesce(r.expertise, '{}'),
      coalesce(v_services, '{}'),
      r.years_experience,
      coalesce(r.preferred_areas, '{}'),
      r.insurance_policy_number,
      r.emergency_contact,
      r.cover_letter,
      r.message,
      r.id_proof_filename,
      r.id_proof_url,
      r.resume_filename,
      r.resume_url,
      'Waiting for Verification',
      coalesce(r.submitted_at, now()),
      coalesce(r.submitted_at, now()),
      now(),
      now()
    );
  end loop;
end $$;

-- Remove legacy tables (only workforce remains for professionals)
drop trigger if exists career_hire_to_workforce on public.career;
drop function if exists public.promote_career_to_workforce();
drop table if exists public.career cascade;
drop table if exists public.workforce_services cascade;
drop table if exists public.workforce_working_areas cascade;

-- UIN auto-assign for join form submissions
create sequence if not exists public.workforce_uin_seq;
select setval(
  'public.workforce_uin_seq',
  coalesce((select max(uin) from public.workforce), 0),
  true
);

create or replace function public.assign_workforce_uin()
returns trigger
language plpgsql
as $$
begin
  if new.uin is null then
    new.uin := nextval('public.workforce_uin_seq');
  end if;

  if new.profile_status is null or trim(new.profile_status) = '' then
    new.profile_status := 'Active';
  end if;

  if new.submitted_at is null and new.profile_status = 'Waiting for Verification' then
    new.submitted_at := now();
  end if;

  if new.created_date is null then
    new.created_date := now();
  end if;

  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists workforce_assign_uin on public.workforce;

create trigger workforce_assign_uin
before insert on public.workforce
for each row
execute function public.assign_workforce_uin();

alter table public.workforce
  drop constraint if exists workforce_profile_status_check;

alter table public.workforce
  add constraint workforce_profile_status_check
  check (
    profile_status in (
      'Waiting for Verification',
      'Active',
      'Suspended'
    )
  );

comment on table public.workforce is
  'HomeSewa professionals — single table. Join form → Waiting for Verification; only Active are activated.';
