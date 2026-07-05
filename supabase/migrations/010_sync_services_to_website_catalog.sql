-- Sync public.services to the website /services catalog only (servicesCatalog.ts).
-- Name only — slugs live in app code for /services/[slug] URLs, not in the database.
-- Safe to re-run.

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

delete from public.services
where name not in (
  'Salon at Home',
  'Bridal Makeup',
  'Chef at Home',
  'Massage Therapy',
  'Spa at Home',
  'Physiotherapy',
  'Handyman',
  'Carpentry',
  'Plumbing',
  'Electrical Repairs',
  'Tiling',
  'Washing Machine Repair',
  'Home Automation',
  'EV Charger Installation',
  'AC Services',
  'Painting',
  'Indoor Planting',
  'CCTV Services',
  'Drywall Repair',
  'Modular Kitchen',
  'Parqueting',
  'Home Renovation',
  'RO Water Purifying',
  'Garden Care',
  'Pest Control',
  'Masonry Repair',
  'Deep Cleaning',
  'Packing & Moving',
  'Airbnb Maintenance',
  'Refrigerator Repair'
);

drop index if exists public.services_slug_key;
alter table public.services drop column if exists slug;

comment on table public.services is
  'Website /services catalog — names only; must match app/data/servicesCatalog.ts';

comment on column public.workforce.expertise is
  'Selected service titles from /services (max 5 on join form)';

comment on column public.workforce.services is
  'Same as expertise — website service titles offered by the professional';
