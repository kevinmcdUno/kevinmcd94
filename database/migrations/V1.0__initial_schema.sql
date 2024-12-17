CREATE TABLE IF NOT EXISTS public.nationalities
(
    id serial constraint nationalities_pk primary key,
    name text not null
);

CREATE TABLE IF NOT EXISTS public.users 
(
    id serial constraint users_pk primary key,
    email text not null,
    first_name text not null,
    second_name text not null,
    password text not null,
    nationality_id int constraint users_nationalities_nationality_id_fk references public.nationalities
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

CREATE TABLE IF NOT EXISTS public.countries
(
    id serial constraint country_pk primary key,
    name text not null,
    language_id int constraint countries_languages_language_id_fk references public.languages,
    currency_id int constraint countries_currencies_currency_id_fk references public.currencies
);

CREATE TABLE IF NOT EXISTS public.border_fees 
(
    id serial constraint border_fees_pk primary key,
    cost int,
    country_id int constraint border_fees_countries_country_id_fk references public.countries
);

CREATE TABLE IF NOT EXISTS public.visa_types
(
    id serial constraint visa_types_pk primary key,
    name text
);

CREATE TABLE IF NOT EXISTS public.entry_requirements 
(
    id serial constraint entry_requirements_pk primary key,
    cost int,
    exceeds_max_days boolean default false not null,
    border_fee_id int constraint entry_requirements_border_fees_border_fee_id_fk references public.border_fees,
    visa_type_id int constraint entry_requirements_visa_types_visa_id_fk references public.visa_types,
    country_id int constraint entry_requirements_countries_country_id_fk references public.countries
);

CREATE TABLE IF NOT EXISTS public.transport_mode_types
(
    id serial constraint transport_mode_types_pk primary key,
    description text not null
);

CREATE TABLE IF NOT EXISTS public.transport_modes 
(
    id serial constraint transport_modes_pk primary key,
    source_country_id int constraint transport_modes_countries_source_country_id_fk references public.countries,
    destination_country_id int constraint transport_modes_countries_destination_country_id_fk references public.countries,
    transport_mode_type_id int constraint transport_modes_transport_mode_types_transport_mode_type_id_fk references public.transport_mode_types,
    avg_cost int not null
);


CREATE TABLE IF NOT EXISTS public.trips 
(
    id serial constraint trips_pk primary key,
    name text not null,
    description text not null,
    start_date text not null,
    end_date text not null,
    users_id int constraint trips_users_users_id_fk references public.users
);

CREATE TABLE IF NOT EXISTS public.trip_countries
(
    id serial constraint trip_countries_pk primary key,
    trip_id int constraint trip_countries_trips_trip_id_fk references public.trips,
    country_id int constraint trip_countries_countries_country_id_fk references public.countries

);


CREATE TABLE IF NOT EXISTS public.trip_transports
(
    id serial constraint tansports_pk primary key,
    cost int not null,
    trip_id int constraint trip_transports_trips_trip_id_fk references public.trips,
    transport_mode_type_id int constraint trip_transports_transport_mode_types_transport_mode_type_id_fk references public.transport_mode_types
);


CREATE TABLE IF NOT EXISTS public.lodging_types
(
    id serial constraint lodging_types_pk primary key,
    description text not null
);

CREATE TABLE IF NOT EXISTS public.trip_lodgings
(
    id serial constraint trip_lodgings_pk primary key,
    cost int not null,
    trip_id int constraint trip_lodgings_trips_trip_id_fk references public.trips,
    lodging_type_id int constraint trip_lodgings_lodging_types_lodging_type_id_fk references public.lodging_types
);
