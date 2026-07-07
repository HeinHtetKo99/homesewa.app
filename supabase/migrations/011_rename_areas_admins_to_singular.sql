-- Rename public.areas → public.area and public.admins → public.admin.
-- Matches singular naming used by booking, contact, workforce, etc.
-- Safe to re-run.

-- ---------------------------------------------------------------------------
-- 1. areas → area
-- ---------------------------------------------------------------------------

do $$
begin
  if to_regclass('public.areas') is not null and to_regclass('public.area') is null then
    alter table public.areas rename to area;
    raise notice 'Renamed public.areas → public.area';
  elsif to_regclass('public.area') is not null then
    raise notice 'public.area already exists — skip rename';
  else
    raise notice 'public.areas not found — skip rename';
  end if;
end $$;

-- Rename sequence / constraints when present (cosmetic; safe if already renamed).
do $$
begin
  if to_regclass('public.area_id_seq') is null
     and to_regclass('public.areas_id_seq') is not null then
    alter sequence public.areas_id_seq rename to area_id_seq;
  end if;
exception
  when undefined_table then null;
end $$;

do $$
begin
  if to_regclass('public.area') is not null then
    alter table public.area rename constraint areas_pkey to area_pkey;
  end if;
exception
  when undefined_object then null;
end $$;

do $$
begin
  if to_regclass('public.area') is not null then
    alter table public.area rename constraint areas_name_key to area_name_key;
  end if;
exception
  when undefined_object then null;
end $$;

comment on table public.area is
  'Kathmandu valley areas (HomeSewa operates in Kathmandu only)';

-- ---------------------------------------------------------------------------
-- 2. workforce.area_id FK → public.area
-- ---------------------------------------------------------------------------

do $$
begin
  if to_regclass('public.workforce') is null or to_regclass('public.area') is null then
    return;
  end if;

  alter table public.workforce drop constraint if exists workforce_area_id_fkey;

  alter table public.workforce
    add constraint workforce_area_id_fkey
    foreign key (area_id) references public.area (id) on delete set null;
end $$;

-- ---------------------------------------------------------------------------
-- 3. admins → admin
-- ---------------------------------------------------------------------------

do $$
begin
  if to_regclass('public.admins') is not null and to_regclass('public.admin') is null then
    alter table public.admins rename to admin;
    raise notice 'Renamed public.admins → public.admin';
  elsif to_regclass('public.admin') is not null then
    raise notice 'public.admin already exists — skip rename';
  else
    raise notice 'public.admins not found — skip rename';
  end if;
end $$;

do $$
begin
  if to_regclass('public.admin_id_seq') is null
     and to_regclass('public.admins_id_seq') is not null then
    alter sequence public.admins_id_seq rename to admin_id_seq;
  end if;
exception
  when undefined_table then null;
end $$;

do $$
begin
  if to_regclass('public.admin') is not null then
    alter table public.admin rename constraint admins_pkey to admin_pkey;
  end if;
exception
  when undefined_object then null;
end $$;

do $$
declare
  v_area integer;
  v_admin integer;
begin
  if to_regclass('public.area') is not null then
    execute 'select count(*) from public.area' into v_area;
  end if;
  if to_regclass('public.admin') is not null then
    execute 'select count(*) from public.admin' into v_admin;
  end if;
  raise notice 'Done. area: %, admin: %', coalesce(v_area, 0), coalesce(v_admin, 0);
end $$;
