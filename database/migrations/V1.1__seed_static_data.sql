-- Insert European Nationalities
insert into nationalities (id, name) 
values 
    (1, 'Irish'),
    (2, 'British'),
    (3, 'French'),
    (4, 'German'),
    (5, 'Italian'),
    (6, 'Spanish'),
    (7, 'Portuguese'),
    (8, 'Dutch'),
    (9, 'Belgian'),
    (10, 'Austrian'),
    (11, 'Swiss'),
    (12, 'Polish'),
    (13, 'Swedish'),
    (14, 'Norwegian'),
    (15, 'Danish'),
    (16, 'Finnish'),
    (17, 'Greek'),
    (18, 'Hungarian'),
    (19, 'Czech'),
    (20, 'Slovak'),
    (21, 'Romanian'),
    (22, 'Bulgarian'),
    (23, 'Croatian'),
    (24, 'Serbian'),
    (25, 'Slovenian');

-- Insert Languages
insert into languages (id, name) 
values (1, 'Spanish'),
       (2, 'English'),
       (3, 'Portuguese'),
       (4, 'French');

-- Insert Currencies (updated for consistency, with three currencies for each)
insert into currencies (id, name) 
values (1, 'MXN Pesos'),         -- Mexico
       (2, 'CRC Colon'),         -- Costa Rica
       (3, 'GTQ Quetzal'),       -- Guatemala
       (4, 'PAB Balboa'),        -- Panama
       (5, 'USD Dollar'),        -- United States
       (6, 'CAD Dollar'),        -- Canada
       (7, 'BRL Real'),          -- Brazil
       (8, 'ARS Peso'),          -- Argentina
       (9, 'COP Peso');          -- Colombia

-- Insert Countries with Longitude and Latitude (keeping 3 currencies per country)
insert into countries (id, name, language_id, currency_id) 
values 
    (1, 'Mexico', 1, 1), 
    (2, 'Costa Rica', 1, 2), 
    (3, 'Guatemala', 1, 3),
    (4, 'Panama', 1, 4),
    (5, 'United States', 2, 5), 
    (6, 'Canada', 2, 6),
    (7, 'Brazil', 3, 7),
    (8, 'Argentina', 3, 8),
    (9, 'Colombia', 1, 9),
    (10, 'Chile', 3, 7),
    (11, 'Peru', 1, 7),
    (12, 'Venezuela', 1, 9),
    (13, 'Ecuador', 1, 7),
    (14, 'Bolivia', 1, 7),
    (15, 'Paraguay', 1, 7),
    (16, 'Uruguay', 1, 7),
    (17, 'Suriname', 2, 7),
    (18, 'French Guiana', 4, 7),
    (19, 'Belize', 1, 3),
    (20, 'Honduras', 1, 3),
    (21, 'El Salvador', 1, 3),
    (22, 'Nicaragua', 1, 3),
    (23, 'Jamaica', 2, 5),
    (24, 'Trinidad and Tobago', 2, 5),
    (25, 'Barbados', 2, 5),
    (26, 'Guyana', 2, 7),
    (27, 'Saint Lucia', 2, 5),
    (28, 'Saint Vincent and the Grenadines', 2, 5),
    (29, 'Antigua and Barbuda', 2, 5),
    (30, 'Saint Kitts and Nevis', 2, 5),
    (31, 'Dominica', 2, 5),
    (32, 'Grenada', 2, 5);


insert into lodging_types (id, description) 
values (1, 'Hotel'),
       (2, 'Apartment'),
       (3, 'Airbnb'),
       (4, 'Hostel');

insert into transport_mode_types (id, description) 
values (1, 'Bus'),
       (2, 'Train'),
       (3, 'Aeroplane');

insert into transport_modes (source_country_id, destination_country_id, transport_mode_type_id, avg_cost) 
values (1, 2, 1, 10),
       (1, 2, 3, 40);

insert into border_fees (id, cost, country_id) 
values (1, 10, 1),
       (2, 20, 2),
       (3, 8, 3),
       (4, 60, 4);

insert into visa_types (id, name) 
values (1, 'Tourist'),
       (2, 'Long-term');

insert into entry_requirements (id, cost, exceeds_max_days, border_fee_id, visa_type_id, country_id)
values (1, 0, false, 1, 1, 1),
       (2, 30, true, 1, 2, 1);      