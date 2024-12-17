insert into nationalities (id, name) 
values (1, 'Irish'),
       (2, 'British'),
       (3, 'French'),
       (4, 'German'),
       (5, 'Italian');

insert into languages (id, name) 
values (1, 'Spanish'),
       (2, 'English'),
       (3, 'Portuguese');

insert into currencies (id, name) 
values (1, 'MXN_Pesos'),
       (2, 'CR_Colon'),
       (3, 'Guat_Quetzal'),
       (4, 'Pan_Sol');

insert into countries (id, name, language_id, currency_id ) 
values (1, 'Mexico', 1, 1), 
       (2, 'Costa Rica', 1, 2), 
       (3, 'Guatemala', 1, 3),
       (4, 'Panama', 1, 4);

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