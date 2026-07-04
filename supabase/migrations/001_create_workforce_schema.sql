-- HomeSewa workforce schema
-- Working professionals (users + workforce merged into one table: public.workforce).
-- UIN is the only ID. Run 002_restore_workforce_from_dashboard.sql next to load Dashboard.csv data.

-- ---------------------------------------------------------------------------
-- Reference tables
-- ---------------------------------------------------------------------------

create table if not exists public.cities (
  id serial primary key,
  name text not null unique
);

create table if not exists public.areas (
  id serial primary key,
  city_id integer not null references public.cities (id) on delete cascade,
  name text not null,
  unique (city_id, name)
);

create index if not exists areas_city_id_idx on public.areas (city_id);

create table if not exists public.services (
  id serial primary key,
  name text not null unique
);

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
  city_id integer references public.cities (id) on delete set null,
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
  profile_status text,
  police_report text,
  training_certificate text,
  payment_qr text,
  referred_by text,
  government_issued_id_filename text,
  government_issued_id_url text,
  migrated_at timestamptz not null default now()
);

create index if not exists workforce_phone_idx on public.workforce (phone);
create index if not exists workforce_city_id_idx on public.workforce (city_id);
create index if not exists workforce_area_id_idx on public.workforce (area_id);
create index if not exists workforce_profile_status_idx on public.workforce (profile_status);

comment on table public.workforce is 'Working professionals (HomeSewa workforce)';
comment on column public.workforce.uin is 'Unique identification number — sole primary key';
comment on column public.workforce.headshot_url is 'Public URL for the professional headshot';
comment on column public.workforce.government_issued_id_filename is 'Government-issued ID attachment filename';
comment on column public.workforce.government_issued_id_url is 'Government-issued ID attachment URL';
comment on column public.workforce.city_id is 'City where the professional is based';
comment on column public.workforce.area_id is 'Area within the city where the professional is based';

create table if not exists public.workforce_services (
  workforce_uin integer not null references public.workforce (uin) on delete cascade,
  service_id integer not null references public.services (id) on delete cascade,
  primary key (workforce_uin, service_id)
);

create index if not exists workforce_services_service_id_idx
  on public.workforce_services (service_id);

comment on table public.workforce_services is 'Services offered by a workforce professional';

create table if not exists public.workforce_working_areas (
  workforce_uin integer not null references public.workforce (uin) on delete cascade,
  area_id integer not null references public.areas (id) on delete cascade,
  primary key (workforce_uin, area_id)
);

create index if not exists workforce_working_areas_area_id_idx
  on public.workforce_working_areas (area_id);

comment on table public.workforce_working_areas is 'Areas a workforce professional serves';

-- ---------------------------------------------------------------------------
-- Seed cities, areas, and HomeSewa services
-- ---------------------------------------------------------------------------

insert into public.cities (name)
values ('Kathmandu'), ('Other')
on conflict (name) do nothing;

insert into public.areas (city_id, name)
select c.id, a.name
from public.cities c
cross join (
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
) as a (name)
where c.name = 'Kathmandu'
on conflict (city_id, name) do nothing;

insert into public.areas (city_id, name)
select c.id, 'Other'
from public.cities c
where c.name = 'Other'
on conflict (city_id, name) do nothing;

insert into public.services (name)
values
  ('Cleaning & Deep Cleaning'),
  ('Pressure Washing'),
  ('Gutter & Roof Cleaning'),
  ('Handyman / Small Repairs'),
  ('Carpentry'),
  ('Plumbing'),
  ('Electrical Repairs'),
  ('Flooring & Surface Fixes'),
  ('Smart Home & Fixture Installations'),
  ('EV Charger Installation'),
  ('AC Maintenance & Servicing'),
  ('Painting & Decorating'),
  ('Wallpaper Installation & Removal'),
  ('Drywall Repair & Installation'),
  ('Tile Installation & Repair'),
  ('Lawn Care & Landscaping'),
  ('Tree Trimming & Removal'),
  ('Garden Maintenance'),
  ('Irrigation System Installation & Repair'),
  ('Fence & Gate Repair'),
  ('Outdoor Lighting Installation'),
  ('Moving & Furniture Assembly'),
  ('Airbnb Property Maintenance'),
  ('Packing & Unpacking Services'),
  ('Storage & Relocation Assistance'),
  ('Subscription Home Concierge'),
  ('Regular Home Cleaning Subscription'),
  ('Seasonal Home Maintenance Subscription'),
  ('Smart Home Monitoring & Support Subscription'),
  ('Cleaning Machine Operation'),
  ('Pest Control'),
  ('Garden Cleaning'),
  ('Planting and Transplanting'),
  ('Soil Improvement'),
  ('Hardscaping'),
  ('Landscape Design'),
  ('Consultation Services'),
  ('Landscape Lighting'),
  ('Rooftop Gardening'),
  ('Electrical Wiring'),
  ('Deep Cleaning'),
  ('Handyman'),
  ('Gutter & Cleaning'),
  ('Deep Cleaner'),
  ('Pressure Washer'),
  ('Roof & Gutter Cleaner'),
  ('Carpenter'),
  ('Plumber'),
  ('Electrical Repairer'),
  ('Flooring Fixer'),
  ('Washing Machine Repairer'),
  ('Smart Home Setup'),
  ('EV Charger Installer'),
  ('AC Servicing'),
  ('Painter'),
  ('Wallpaper Fixer'),
  ('Drywall Repairer'),
  ('Tile Worker'),
  ('Window Repairer'),
  ('Floor Repairer'),
  ('Lawn Care'),
  ('Tree Cutter'),
  ('Garden Care'),
  ('Irrigation Installer'),
  ('Fence Repairer'),
  ('Outdoor Lighting Installer'),
  ('Mover'),
  ('Airbnb Maintenance'),
  ('Packing'),
  ('Home Concierge'),
  ('Cleaning Planner'),
  ('Maintenance Planner'),
  ('Other')
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

  -- Cities from users.city
  insert into public.cities (name)
  select distinct trim(u.city)
  from public.users u
  where u.city is not null and trim(u.city) <> ''
  on conflict (name) do nothing;

  -- Areas from users.area (tied to that row's city, default Kathmandu)
  insert into public.areas (city_id, name)
  select distinct
    coalesce(c.id, k.id),
    trim(u.area)
  from public.users u
  left join public.cities c on lower(c.name) = lower(trim(u.city))
  cross join lateral (
    select id from public.cities where name = 'Kathmandu' limit 1
  ) k
  where u.area is not null and trim(u.area) <> ''
  on conflict (city_id, name) do nothing;

  -- Services from users.profession (Services Offered)
  insert into public.services (name)
  select distinct trim(u.profession)
  from public.users u
  where u.profession is not null and trim(u.profession) <> ''
  on conflict (name) do nothing;

  -- Areas mentioned in working_area (multi-value text)
  insert into public.areas (city_id, name)
  select distinct
    coalesce(c.id, k.id),
    trim(part)
  from public.users u
  left join public.cities c on lower(c.name) = lower(trim(u.city))
  cross join lateral (
    select id from public.cities where name = 'Kathmandu' limit 1
  ) k
  cross join lateral regexp_split_to_table(
    coalesce(u.working_area, ''),
    '[,;\n|]+'
  ) as part
  where trim(part) <> ''
  on conflict (city_id, name) do nothing;

  -- Workforce rows (UIN only; one row per UIN)
  insert into public.workforce (
    uin,
    first_name,
    middle_name,
    last_name,
    headshot_url,
    phone,
    city_id,
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
    c.id,
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
  left join public.cities c
    on lower(c.name) = lower(trim(coalesce(u.city, 'Kathmandu')))
  left join public.areas a
    on a.city_id = c.id
   and lower(a.name) = lower(trim(u.area))
  where u.uin is not null
  order by u.uin, u.updated_at desc nulls last
  on conflict (uin) do update set
    first_name = excluded.first_name,
    middle_name = excluded.middle_name,
    last_name = excluded.last_name,
    headshot_url = excluded.headshot_url,
    phone = excluded.phone,
    city_id = excluded.city_id,
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

  -- Services offered (profession → services)
  insert into public.workforce_services (workforce_uin, service_id)
  select distinct u.uin, s.id
  from public.users u
  join public.services s on lower(s.name) = lower(trim(u.profession))
  where u.uin is not null
    and u.profession is not null
    and trim(u.profession) <> ''
  on conflict do nothing;

  -- Working areas professionals serve
  insert into public.workforce_working_areas (workforce_uin, area_id)
  select distinct u.uin, a.id
  from public.users u
  left join public.cities c
    on lower(c.name) = lower(trim(coalesce(u.city, 'Kathmandu')))
  cross join lateral regexp_split_to_table(
    coalesce(u.working_area, ''),
    '[,;\n|]+'
  ) as part
  join public.areas a
    on lower(a.name) = lower(trim(part))
   and (a.city_id = c.id or c.id is null)
  where u.uin is not null
    and trim(part) <> ''
  on conflict do nothing;

  -- Keep public.users until you verify workforce looks correct, then drop it yourself:
  --   drop table public.users cascade;
  raise notice 'Migrated public.users → public.workforce. public.users was kept for safety.';
end $$;
