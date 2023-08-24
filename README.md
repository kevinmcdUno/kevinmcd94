## Problem Definition
When users plan trips, they often encounter various complexities in the planning process. To tackle this, our travel application aims to provide a user-friendly web-based solution that offers access to all essential trip-related information.

The application facilitates user account creation and the selection of their nationality. Users can then choose a country from a dropdown menu and specify their intended stay duration. Based on these inputs, the application provides critical details, including required visa types, visa costs, local currency, predominant language, and available transportation options. The application is designed to accurately represent varying visa requirements that depend on the duration of the planned stay.

Users can manage multiple trips within their profile, empowering them to prepare for future journeys. For each trip, they can define start and end dates, select visited countries, and add expenses like flights, accommodations, and activities. This feature empowers users to meticulously plan and budget for upcoming adventures.

### Moscow Prioritization
**Must-Have:**

User Account Creation: Enable account creation with the ability to choose EU nationality.
Country Selection: Provide a dropdown menu for selecting the destination South American country.
Duration Selection: Allow input of stay duration in the selected country.
Information Provision: Present essential data like visa types, costs, currency, language, and travel modes.
Create and Manage Trips: Enable users to create trips, specify countries, and add bookings with associated costs.
**Should-Have:**

Diverse Nationality Options: Extend nationality choices to cater to a broader user range.
Nationality-Based Visa Information: Offer visa details aligned with user nationality.
Multi-Country Selection: Enable selection of multiple countries for multi-destination trips.
Interactive Map Selection: Implement a map-based interface for intuitive country selection.
**Could-Have:**

North and Central America Inclusion: Provide option to select from North and Central American countries.
Visa Government Website Link: Include links to government visa resources for detailed information.
Weather Integration: Incorporate weather data to offer current and forecasted conditions.
Activity Recommendations: Suggest activities to enhance user travel experiences.
Clothing Guidelines: Provide country-specific clothing recommendations.
**Won't-Have:**

Mobile Application: Exclude mobile app development.
Overall, the application streamlines trip planning by furnishing essential details and accurately addressing varying visa prerequisites. It empowers users to make informed decisions about travel plans and allows them to create trips with specified dates, add bookings, and effectively budget for flights, accommodations, and activities.

### Entity Relationship Diagram

```mermaid
%%{init: {'theme':'dark'}}%%
erDiagram
    users ||--|| countries : retrieves
    users {
        int id PK
        text first_name
        text second_name
        text password
        int nationality_id FK
    }

    users ||--|| nationalities : selects
    nationalities {
        int id PK
        text name
    }

    countries ||--|{ languages : contains
    countries ||--|{ currencies : contains
    countries {
        int id PK
        text name
        int language_id FK
        int currency_id FK

    }

    currencies {
        int id PK
        text name
    }

    languages {
        int id PK
        text name
    }

    border_fees {
        int id PK
        int cost 
        int countries_id FK
        int entry_requirements_id FK
    }
    border_fees ||--|{ countries : includes

    entry_requirements ||--|{ countries : includes
    entry_requirements ||--|{ visa_types : includes
    entry_requirements ||--|{ border_fees : includes
    entry_requirements {
        int id PK
        int cost 
        bool exceeds_max_days
        int countries_id FK
        int border_fees_id FK
        int visa_types_id FK
    }

     visa_types {
        int id PK
        text name
    }

        transport_modes ||--|{ countries : includes
        transport_modes ||--|{ countries : includes
        transport_modes ||--|{ transport_mode_types : includes
    transport_modes {
        int id PK
        int avg_cost 
        int source_country_id FK
        int destination_country_id FK
        int transport_mode_type_id FK
    }
   
    trips ||--|{ users : includes
    trips {
        int id PK
        text name
        text description
        text start_date
        text end_date
        int user_id FK
    }

        trips_countries ||--|{ countries : includes
        trips_countries ||--|{ trips : includes
    trips_countries {
        int id PK
        int trip_id FK
        int country_id FK
    }

       transport_mode_types {
        int id PK
        text description
    }
        trip_transports ||--|{ transport_mode_types : includes
        trip_transports ||--|{ trips : includes
       trip_transports {
        int id PK
        int cost
        int transport_mode_type_id FK
        int trip_id FK
    }

       trip_accommodations ||--|{ accommodation_types : includes
       trip_accommodations ||--|{ trips : includes
       trip_accommodations {
        int id PK
        int cost
        int accommodation_types_id FK
        int trip_id FK
    }

       accommodation_types {
        int id PK
        text description
    }

```


 ## API Specification: 

**User Account Management:**
Create User Account: POST /users - Create a new user account with nationality and other details.
Authenticate User: POST /login - Authenticate a user with username and password.

**Country Information:**
Get Country List: GET /countries - Get a list of countries.
Get Country Details: GET /countries/{country_id} - Get details of a specific country, including entry requirements.

**Border Fees:**
Get Border Fee Details for a country: GET /countries/{country_id}/borderfees/{borderfee_id}.

**Visa Types:**
Get Visa Type List: GET countries/{country_id}/visatypes.
Get Visa Fees: GET /countries/{country_id}/visafees.

**Entry Requirements:**
Get Entry Requirement Details for a country: GET /countries/{country_id}/entryrequirements/{entry_requirement_id}.

**Transport Information:**
Get available transport modes: GET /transportmodes?source={source_country_id}&destination={destination_country_id}.

**Trip Management:**
Create Trip: POST /trips - Create a new trip with start and end dates, and associate user ID.
Get User's Trips: GET /users/{user_id}/trips - Get a list of trips associated with a specific user.
Get Trip Details: GET /trips/{trip_id} - Get details of a specific trip, including countries and bookings.
Update Trip: PUT /trips/{trip_id} - Update details of a specific trip.
Delete Trip: DELETE /trips/{trip_id} - Delete a specific trip.

Add Transport Mode to Trip: POST /trips/{trip_id}/transportmodes.
Request Body: { "mode": "flight", "cost": 200 }.

Update Transport Mode: PUT /trips/{trip_id}/transportmodes/{trip_transports_id}.
Get Transport Mode Details: GET /trips/{trip_id}/transportmodes/{trip_transports_id}.
Delete Transport Mode: DELETE /trips/{trip_id}/transportmodes/{trip_transports_id}.

Add Trip_Accommodations to Trip: POST /trips/{trip_id}/accommodations.
Request Body: { "mode": "hotel", "cost": 150 }.

Update Accommodation: PUT /trips/{trip_id}/accommodations/{trip_accommodations_id}.
Get Accommodation Mode Details: GET /trips/{trip_id}/accommodations/{trip_accommodations_id}.
Delete Accommodation Mode: DELETE /trips/{trip_id}/accommodations/{trip_accommodations_id}.
