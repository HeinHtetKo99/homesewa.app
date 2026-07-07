-- Drop legacy workforce join tables. All professional data stays in public.workforce.
-- Safe to re-run. Run in Supabase SQL Editor on existing projects.
--
-- Removes: workforce_services, workforce_working_areas, career (if present)
-- Keeps:   public.workforce (every row preserved)

-- ---------------------------------------------------------------------------
-- 1. Ensure workforce has array columns for merged data
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

update public.workforce
set
  positions = coalesce(positions, '{}'),
  expertise = coalesce(expertise, '{}'),
  services = coalesce(services, '{}'),
  working_areas = coalesce(working_areas, '{}');

-- ---------------------------------------------------------------------------
-- 2. Copy services from workforce_services → workforce.services (merge, not replace)
-- ---------------------------------------------------------------------------

do $$
begin
  if to_regclass('public.workforce_services') is null then
    raise notice 'workforce_services not found — nothing to merge';
    return;
  end if;

  update public.workforce w
  set services = merged.names
  from (
    select
      w2.uin,
      (
        select coalesce(array_agg(distinct n order by n), '{}')
        from (
          select unnest(coalesce(w2.services, '{}')) as n
          union
          select s.name
          from public.workforce_services ws
          join public.services s on s.id = ws.service_id
          where ws.workforce_uin = w2.uin
        ) x
      ) as names
    from public.workforce w2
    where exists (
      select 1
      from public.workforce_services ws
      where ws.workforce_uin = w2.uin
    )
  ) merged
  where w.uin = merged.uin;

  raise notice 'Merged workforce_services into workforce.services';
end $$;

-- ---------------------------------------------------------------------------
-- 3. Copy areas from workforce_working_areas → workforce.working_areas (merge)
-- ---------------------------------------------------------------------------

do $$
begin
  if to_regclass('public.workforce_working_areas') is null then
    raise notice 'workforce_working_areas not found — nothing to merge';
    return;
  end if;

  update public.workforce w
  set working_areas = merged.names
  from (
    select
      w2.uin,
      (
        select coalesce(array_agg(distinct n order by n), '{}')
        from (
          select unnest(coalesce(w2.working_areas, '{}')) as n
          union
          select a.name
          from public.workforce_working_areas wwa
          join public.areas a on a.id = wwa.area_id
          where wwa.workforce_uin = w2.uin
        ) x
      ) as names
    from public.workforce w2
    where exists (
      select 1
      from public.workforce_working_areas wwa
      where wwa.workforce_uin = w2.uin
    )
  ) merged
  where w.uin = merged.uin;

  raise notice 'Merged workforce_working_areas into workforce.working_areas';
end $$;

-- ---------------------------------------------------------------------------
-- 4. Normalize status on existing workforce rows (data kept)
-- ---------------------------------------------------------------------------

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

-- ---------------------------------------------------------------------------
-- 5. Drop legacy tables only (workforce rows are NOT deleted)
-- ---------------------------------------------------------------------------

drop trigger if exists career_hire_to_workforce on public.career;
drop function if exists public.promote_career_to_workforce();

drop table if exists public.workforce_services cascade;
drop table if exists public.workforce_working_areas cascade;
drop table if exists public.workfor_service_area cascade;
drop table if exists public.career cascade;

-- ---------------------------------------------------------------------------
-- 6. UIN + join-form defaults (for new submissions)
-- ---------------------------------------------------------------------------

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
  'HomeSewa professionals — single table. Legacy workforce_services / workforce_working_areas removed; data merged here.';

do $$
declare
  v_count integer;
begin
  select count(*) into v_count from public.workforce;
  raise notice 'Done. workforce row count: %', v_count;
end $$;

-- Verify after run:
-- select count(*) from public.workforce;
-- select uin, first_name, last_name, services, working_areas from public.workforce limit 10;
