-- Drop public.cities. Keep all area and workforce data in a single public.areas table.
-- HomeSewa operates in Kathmandu only — areas are a flat unique name list.
-- Safe to re-run (including after a failed partial run).

-- ---------------------------------------------------------------------------
-- 1. Flatten areas (remove city_id) while preserving workforce links
-- ---------------------------------------------------------------------------

do $$
begin
  if not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'areas'
      and column_name = 'city_id'
  ) then
    raise notice 'areas.city_id not found — areas already flat';
    return;
  end if;

  -- Must drop FK before remapping area_id to new serial IDs in areas_new.
  alter table public.workforce
    drop constraint if exists workforce_area_id_fkey;

  drop table if exists public.areas_new;

  create table public.areas_new (
    id serial primary key,
    name text not null unique
  );

  insert into public.areas_new (name)
  select distinct trim(a.name)
  from public.areas a
  where a.name is not null and trim(a.name) <> ''
  on conflict (name) do nothing;

  -- Clear workforce rows that point at missing legacy area ids
  update public.workforce w
  set area_id = null
  where w.area_id is not null
    and not exists (
      select 1 from public.areas a where a.id = w.area_id
    );

  -- Remap legacy area_id → new areas_new.id (matched by area name)
  update public.workforce w
  set area_id = an.id
  from public.areas old_a
  join public.areas_new an on an.name = old_a.name
  where w.area_id = old_a.id;

  drop table public.areas;

  alter table public.areas_new rename to areas;

  alter table public.workforce
    add constraint workforce_area_id_fkey
    foreign key (area_id) references public.areas (id) on delete set null;

  raise notice 'Flattened public.areas — removed city_id';
end $$;

-- ---------------------------------------------------------------------------
-- 2. Remove city from workforce (Kathmandu is implicit)
-- ---------------------------------------------------------------------------

alter table public.workforce drop column if exists city_id;
drop index if exists workforce_city_id_idx;

-- ---------------------------------------------------------------------------
-- 3. Drop cities table
-- ---------------------------------------------------------------------------

drop table if exists public.cities cascade;

comment on table public.areas is
  'Kathmandu valley areas (HomeSewa operates in Kathmandu only)';

do $$
declare
  v_areas integer;
  v_workforce integer;
begin
  select count(*) into v_areas from public.areas;
  select count(*) into v_workforce from public.workforce;
  raise notice 'Done. areas: %, workforce: %', v_areas, v_workforce;
end $$;

-- Verify:
-- select count(*) from public.areas;
-- select count(*) from public.workforce;
-- select tablename from pg_tables where schemaname = 'public' and tablename = 'cities';
