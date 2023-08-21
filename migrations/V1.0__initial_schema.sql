CREATE TABLE IF NOT EXISTS public.users 
(
    id serial constraint users_pk primary key,
    first_name text not null,
    second_name text not null,
    password text not null,
    nationalities_id int nationalities_id_fk references public.nationalities
);

CREATE TABLE IF NOT EXISTS public.nationalities
(
    id serial constraint nationalities_pk primary key,
    name text not null
);

CREATE TABLE IF NOT EXISTS public.countries
(
    id serial constraint country_pk primary key,
    name text not null,
    languages_id int languages_id_fk references public.languages,
    currencies_id int currencies_id_fk references public.currencies
);

CREATE TABLE IF NOT EXISTS public.languages
(
    id serial constraint languages_pk primary key,
    name text not null
);

CREATE TABLE IF NOT EXISTS public.currencies
(
    id serial constraint currencies_pk primary key,
    name text not null
);

CREATE TABLE IF NOT EXISTS public.entry_requirements 
(
    id serial constraint entry_requirements_pk primary key,
    exceeds_max_days boolean default false not null,
    border_fees_id int border_fees_id_fk references public.border_fees,
    visa_id int visa_id_fk references public.visa,
    visa_fees_id int visa_fees_id_fk references public.visa_fees,
    countries_id int constraint countries_id_fk references public.countries
);

CREATE TABLE IF NOT EXISTS public.border_fees 
(
    id serial constraint border_fees_pk primary key,
    cost int,
    countries_id int constraint countries_id_fk references public.countries
);

CREATE TABLE IF NOT EXISTS public.visa_types
(
    id serial constraint visa_types_pk primary key,
    name text
);


CREATE TABLE IF NOT EXISTS public.transport_modes 
(
    id serial constraint transport_modes_pk primary key,
    source_country_id int constraint source_country_id_fk references public.countries,
    destination_country_id int constraint destination_country_id_fk references public.countries,
    transport_mode_types_id int constraint transport_mode_types_id_fk references public.transport_modes_types,
    avg_cost int not null
);

CREATE TABLE IF NOT EXISTS public.transport_modes_types
(
    id serial constraint transport_mode_types_pk primary key,
    description text not null
);

CREATE TABLE IF NOT EXISTS public.trips 
(
    id serial constraint trips_pk primary key,
    name text not null,
    description text not null,
    start_date text not null,
    end_date text not null,
    users_id int constraint users_id_fk references public.users
);

CREATE TABLE IF NOT EXISTS public.trip_countries
(
    id serial constraint trip_countries_pk primary key,
    trips_id int constraint trips_id_fk references public.trips,
    countries_id int constraint countries_id_fk references public.countries

);


CREATE TABLE IF NOT EXISTS public.trip_transports
(
    id serial constraint tansports_pk primary key,
    cost int not null,
    trips_id int constraint trips_id_fk references public.trips,
    transport_mode_types_id int constraint transport_mode_types_id_fk references public.transport_mode_types
);

CREATE TABLE IF NOT EXISTS public.trip_accommodations
(
    id serial constraint trip_accommodations_pk primary key,
    cost int not null,
    trips_id int constraint trips_id_fk references public.trips,
    accommodation_types_id int constraint accommodation_types_id_fk references public.accommodation_types
);

CREATE TABLE IF NOT EXISTS public.accommodation_types
(
    id serial constraint accommodation_types_pk primary key,
    description int not null
);