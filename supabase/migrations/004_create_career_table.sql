-- Career applications (job applicants). Separate from workforce professionals.
-- When an applicant is hired, copy them into public.workforce and assign a UIN.

create table if not exists public.career (
  id serial primary key,
  full_name varchar(255) not null,
  phone varchar(50) not null,
  email varchar(255),
  positions text[],
  expertise text[],
  years_experience varchar(100),
  preferred_areas text[],
  insurance_policy_number varchar(100),
  emergency_contact varchar(50),
  cover_letter text,
  message text,
  id_proof_filename varchar(255),
  id_proof_url text,
  resume_filename varchar(255),
  resume_url text,
  status varchar(50) not null default 'New',
  workforce_uin integer references public.workforce (uin) on delete set null,
  submitted_at timestamp without time zone not null default current_timestamp
);

create index if not exists career_phone_idx on public.career (phone);
create index if not exists career_status_idx on public.career (status);
create index if not exists career_submitted_at_idx on public.career (submitted_at desc);
create index if not exists career_workforce_uin_idx on public.career (workforce_uin);

comment on table public.career is 'Career / job applications from the website form';
comment on column public.career.status is 'New on submit. Set to Hired to auto-promote into workforce.';
comment on column public.career.workforce_uin is 'Set automatically when status becomes Hired';

