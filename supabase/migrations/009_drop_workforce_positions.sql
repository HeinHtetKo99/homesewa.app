-- Drop workforce.positions — expertise + services hold selected service titles from /services.
-- Safe to re-run.

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'workforce'
      and column_name = 'positions'
  ) then
    update public.workforce w
    set
      expertise = coalesce(
        (
          select coalesce(array_agg(distinct n order by n), '{}')
          from (
            select unnest(coalesce(w.expertise, '{}')) as n
            union
            select unnest(coalesce(w.positions, '{}'))
          ) x
        ),
        '{}'
      ),
      services = coalesce(
        (
          select coalesce(array_agg(distinct n order by n), '{}')
          from (
            select unnest(coalesce(w.services, '{}')) as n
            union
            select unnest(coalesce(w.expertise, '{}'))
            union
            select unnest(coalesce(w.positions, '{}'))
          ) x
        ),
        '{}'
      );

    alter table public.workforce drop column positions;
  end if;
end $$;

comment on column public.workforce.expertise is
  'Areas of expertise selected on join form (from /services catalog, max 5)';
