-- Join as a Professional form fields aligned with mobile app.

alter table public.workforce
  add column if not exists preferred_city text,
  add column if not exists referral_phone text;

comment on column public.workforce.preferred_city is
  'Preferred city from join form (Kathmandu, Lalitpur, Bhaktapur, Other)';
comment on column public.workforce.referral_phone is
  'Referral phone number from join form';
