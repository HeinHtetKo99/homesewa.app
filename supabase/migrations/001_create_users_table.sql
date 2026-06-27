-- HomeSewa users table (migrated from Airtable Dashboard export)
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  legacy_id integer unique not null,
  uin integer,
  first_name text,
  middle_name text,
  last_name text,
  headshot_url text,
  headshot_filename text,
  phone text,
  profession text,
  city text,
  area text,
  created_by text,
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
  government_issued_id text,
  area_of_expertise text,
  working_area text,
  migrated_at timestamptz not null default now()
);

create index if not exists users_profession_idx on public.users (profession);
create index if not exists users_city_idx on public.users (city);
create index if not exists users_phone_idx on public.users (phone);
create index if not exists users_uin_idx on public.users (uin);

comment on table public.users is 'Service professionals migrated from Airtable Dashboard';
