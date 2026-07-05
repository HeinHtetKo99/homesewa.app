-- HomeSewa workforce schema
-- Single table: public.workforce (professionals + join form data).
-- UIN is the only ID. Run 002_restore_workforce_from_dashboard.sql next to load Dashboard.csv data.

-- ---------------------------------------------------------------------------
-- Reference tables (Kathmandu only — areas list, no separate cities table)
-- ---------------------------------------------------------------------------

create table if not exists public.areas (
  id serial primary key,
  name text not null unique
);

comment on table public.areas is 'Kathmandu valley areas (HomeSewa operates in Kathmandu only)';

create table if not exists public.services (
  id serial primary key,
  name text not null unique
);

comment on table public.services is 'Website /services catalog — names match servicesCatalog.ts';

-- ---------------------------------------------------------------------------
-- Workforce (working professionals). UIN is the sole identifier.
-- ---------------------------------------------------------------------------

create table if not exists public.workforce (
  uin integer primary key,
  first_name text,
  middle_name text,
  last_name text,
  headshot_url text,
  phone text,
  email text,
  area_id integer references public.areas (id) on delete set null,
  created_date timestamptz,
  issues text,
  gender text,
  dob text,
  bio text,
  updated_at timestamptz,
  whatsapp_available boolean,
  ward_number text,
  valid_till timestamptz,
  date_of_birth date,
  blood_group text,
  profile_status text not null default 'Active',
  police_report text,
  training_certificate text,
  payment_qr text,
  referred_by text,
  government_issued_id_filename text,
  government_issued_id_url text,
  expertise text[] not null default '{}',
  services text[] not null default '{}',
  years_experience text,
  working_areas text[] not null default '{}',
  insurance_policy_number text,
  emergency_contact text,
  cover_letter text,
  resume_filename text,
  resume_url text,
  submitted_at timestamptz,
  migrated_at timestamptz not null default now(),
  constraint workforce_profile_status_check check (
    profile_status in (
      'Waiting for Verification',
      'Active',
      'Suspended'
    )
  )
);

create index if not exists workforce_phone_idx on public.workforce (phone);
create index if not exists workforce_area_id_idx on public.workforce (area_id);
create index if not exists workforce_profile_status_idx on public.workforce (profile_status);

comment on table public.workforce is
  'HomeSewa professionals. Join form creates rows as Waiting for Verification; only Active are activated.';
comment on column public.workforce.uin is 'Unique identification number — sole primary key';
comment on column public.workforce.headshot_url is 'Public URL for the professional headshot';
comment on column public.workforce.government_issued_id_filename is 'Government-issued ID attachment filename';
comment on column public.workforce.government_issued_id_url is 'Government-issued ID attachment URL';
comment on column public.workforce.area_id is 'Primary area within Kathmandu where the professional is based';
comment on column public.workforce.services is 'Services offered by the professional';
comment on column public.workforce.working_areas is 'Areas the professional serves';
comment on column public.workforce.profile_status is 'Waiting for Verification | Active | Suspended';

create sequence if not exists public.workforce_uin_seq;

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

-- ---------------------------------------------------------------------------
-- Seed areas (Kathmandu) and HomeSewa services
-- ---------------------------------------------------------------------------

insert into public.areas (name)
values
  ('Asan'),
  ('Balaju'),
  ('Baluwatar'),
  ('Baneshwor'),
  ('Basundhara'),
  ('Bhaisepati'),
  ('Bhaktapur'),
  ('Bouddha'),
  ('Budhanilkantha'),
  ('Chabahil'),
  ('Changunarayan'),
  ('Chundevi'),
  ('Dhapasi'),
  ('Durbar Marg'),
  ('Ekantakuna'),
  ('Gaushala'),
  ('Godawari'),
  ('Gongabu'),
  ('Gwarko'),
  ('Gyaneshwor'),
  ('Harisiddhi'),
  ('Imadol'),
  ('Jawalakhel'),
  ('Jorpati'),
  ('Kalanki'),
  ('Kalimati'),
  ('Kamalbinayak'),
  ('Kamalpokhari'),
  ('Kirtipur'),
  ('Koteshwor'),
  ('Khusibu'),
  ('Kupondole'),
  ('Lagankhel'),
  ('Lazimpat'),
  ('Machhapokhari'),
  ('Maharajgunj'),
  ('Mangal Bazar'),
  ('Naikap'),
  ('Nayabazar'),
  ('New Baneshwor'),
  ('New Road'),
  ('Patan'),
  ('Pulchowk'),
  ('Putalisadak'),
  ('Ranibari'),
  ('Samakhusi'),
  ('Sanepa'),
  ('Satdobato'),
  ('Sitapaila'),
  ('Sinamangal'),
  ('Sukedhara'),
  ('Sundhara'),
  ('Suryabinayak'),
  ('Swayambhu'),
  ('Teku'),
  ('Thamel'),
  ('Thaiba'),
  ('Thankot'),
  ('Thimi'),
  ('Tokha'),
  ('Tripureshwor'),
  ('Other')
on conflict (name) do nothing;

insert into public.services (name)
values
  ('Salon at Home'),
  ('Bridal Makeup'),
  ('Chef at Home'),
  ('Massage Therapy'),
  ('Spa at Home'),
  ('Physiotherapy'),
  ('Handyman'),
  ('Carpentry'),
  ('Plumbing'),
  ('Electrical Repairs'),
  ('Tiling'),
  ('Washing Machine Repair'),
  ('Home Automation'),
  ('EV Charger Installation'),
  ('AC Services'),
  ('Painting'),
  ('Indoor Planting'),
  ('CCTV Services'),
  ('Drywall Repair'),
  ('Modular Kitchen'),
  ('Parqueting'),
  ('Home Renovation'),
  ('RO Water Purifying'),
  ('Garden Care'),
  ('Pest Control'),
  ('Masonry Repair'),
  ('Deep Cleaning'),
  ('Packing & Moving'),
  ('Airbnb Maintenance'),
  ('Refrigerator Repair')
on conflict (name) do nothing;

-- ---------------------------------------------------------------------------
-- Migrate existing public.users → workforce (only when users still exists)
-- ---------------------------------------------------------------------------

do $$
begin
  if to_regclass('public.users') is null then
    raise notice 'public.users not found — schema ready, no row migration needed';
    return;
  end if;

  -- Areas from users.area (Kathmandu only)
  insert into public.areas (name)
  select distinct trim(u.area)
  from public.users u
  where u.area is not null and trim(u.area) <> ''
  on conflict (name) do nothing;

  -- Services table is website catalog only (see services seed in 001 / 010).

  -- Areas mentioned in working_area (multi-value text)
  insert into public.areas (name)
  select distinct trim(part)
  from public.users u
  cross join lateral regexp_split_to_table(
    coalesce(u.working_area, ''),
    '[,;\n|]+'
  ) as part
  where trim(part) <> ''
  on conflict (name) do nothing;

  -- Workforce rows (UIN only; one row per UIN)
  insert into public.workforce (
    uin,
    first_name,
    middle_name,
    last_name,
    headshot_url,
    phone,
    area_id,
    created_date,
    issues,
    gender,
    dob,
    bio,
    updated_at,
    whatsapp_available,
    ward_number,
    valid_till,
    date_of_birth,
    blood_group,
    profile_status,
    police_report,
    training_certificate,
    payment_qr,
    referred_by,
    government_issued_id_filename,
    government_issued_id_url,
    migrated_at
  )
  select distinct on (u.uin)
    u.uin,
    u.first_name,
    u.middle_name,
    u.last_name,
    coalesce(
      nullif(trim(u.headshot_url), ''),
      substring(u.headshot_filename from '\((https?://[^)]+)\)')
    ),
    u.phone,
    a.id,
    u.created_date,
    u.issues,
    u.gender,
    u.dob,
    u.bio,
    u.updated_at,
    u.whatsapp_available,
    u.ward_number,
    u.valid_till,
    u.date_of_birth,
    u.blood_group,
    u.profile_status,
    u.police_report,
    u.training_certificate,
    u.payment_qr,
    u.referred_by,
    case
      when u.government_issued_id ~ '^.+\s+\(https?://[^)]+\)$'
        then trim(regexp_replace(u.government_issued_id, '\s+\(https?://[^)]+\)$', ''))
      when u.government_issued_id ~* '^https?://'
        then null
      else nullif(trim(u.government_issued_id), '')
    end,
    case
      when u.government_issued_id ~ '^.+\s+\(https?://[^)]+\)$'
        then substring(u.government_issued_id from '\((https?://[^)]+)\)')
      when u.government_issued_id ~* '^https?://'
        then trim(u.government_issued_id)
      else null
    end,
    coalesce(u.migrated_at, now())
  from public.users u
  left join public.areas a
    on lower(a.name) = lower(trim(u.area))
  where u.uin is not null
  order by u.uin, u.updated_at desc nulls last
  on conflict (uin) do update set
    first_name = excluded.first_name,
    middle_name = excluded.middle_name,
    last_name = excluded.last_name,
    headshot_url = excluded.headshot_url,
    phone = excluded.phone,
    area_id = excluded.area_id,
    created_date = excluded.created_date,
    issues = excluded.issues,
    gender = excluded.gender,
    dob = excluded.dob,
    bio = excluded.bio,
    updated_at = excluded.updated_at,
    whatsapp_available = excluded.whatsapp_available,
    ward_number = excluded.ward_number,
    valid_till = excluded.valid_till,
    date_of_birth = excluded.date_of_birth,
    blood_group = excluded.blood_group,
    profile_status = excluded.profile_status,
    police_report = excluded.police_report,
    training_certificate = excluded.training_certificate,
    payment_qr = excluded.payment_qr,
    referred_by = excluded.referred_by,
    government_issued_id_filename = excluded.government_issued_id_filename,
    government_issued_id_url = excluded.government_issued_id_url,
    migrated_at = excluded.migrated_at;

  -- Services offered (profession → workforce.services)
  update public.workforce w
  set services = coalesce(sub.names, '{}')
  from (
    select
      u.uin,
      array_agg(distinct trim(u.profession) order by trim(u.profession)) as names
    from public.users u
    where u.uin is not null
      and u.profession is not null
      and trim(u.profession) <> ''
    group by u.uin
  ) sub
  where w.uin = sub.uin;

  -- Working areas professionals serve (working_area → workforce.working_areas)
  update public.workforce w
  set working_areas = coalesce(sub.names, '{}')
  from (
    select
      u.uin,
      array_agg(distinct trim(part) order by trim(part)) as names
    from public.users u
    cross join lateral regexp_split_to_table(
      coalesce(u.working_area, ''),
      '[,;\n|]+'
    ) as part
    where u.uin is not null
      and trim(part) <> ''
    group by u.uin
  ) sub
  where w.uin = sub.uin;

  select setval(
    'public.workforce_uin_seq',
    coalesce((select max(uin) from public.workforce), 0),
    true
  );

  -- Keep public.users until you verify workforce looks correct, then drop it yourself:
  --   drop table public.users cascade;
  raise notice 'Migrated public.users → public.workforce. public.users was kept for safety.';
end $$;
