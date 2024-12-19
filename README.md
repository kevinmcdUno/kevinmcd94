## Problem Definition
When users plan trips, they often encounter various complexities in the planning process. To tackle this, our travel application aims to provide a user-friendly web-based solution that offers access to all essential trip-related information.

The application facilitates user account creation and the selection of their nationality. Users can then choose a country from a dropdown menu and specify their intended stay duration. Based on these inputs, the application provides critical details, including required visa types, visa costs, local currency, predominant language, and available transportation options. The application is designed to accurately represent varying visa requirements that depend on the duration of the planned stay.

Users can manage multiple trips within their profile, empowering them to prepare for future journeys. For each trip, they can define start and end dates, select visited countries, and add expenses like flights, accommodations, and activities. This feature empowers users to meticulously plan and budget for upcoming adventures.

### Moscow Prioritization
**Must-Have:**

- User Account Creation: Enable account creation with the ability to choose EU nationality.
- Country Selection: Provide a dropdown menu for selecting the destination South American country.
- Duration Selection: Allow input of stay duration in the selected country.
- Information Provision: Present essential data like visa types, costs, currency, language, and travel modes.
- Create and Manage Trips: Enable users to create trips, specify countries, and add bookings with associated costs.

**Should-Have:**

- Diverse Nationality Options: Extend nationality choices to cater to a broader user range.
- Nationality-Based Visa Information: Offer visa details aligned with user nationality.
- Multi-Country Selection: Enable selection of multiple countries for multi-destination trips.
- Interactive Map Selection: Implement a map-based interface for intuitive country selection.

**Could-Have:**

- North and Central America Inclusion: Provide option to select from North and Central American countries.
- Visa Government Website Link: Include links to government visa resources for detailed information.
- Weather Integration: Incorporate weather data to offer current and forecasted conditions.
- Activity Recommendations: Suggest activities to enhance user travel experiences.
- Clothing Guidelines: Provide country-specific clothing recommendations.

**Won't-Have:**

- Mobile Application: Exclude mobile app development.

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

User Authentication:
### Auth 
`POST /auth/login`
###### User Login

Request:
```json
{
  "email": "string",
  "password": "string"
}
```

Responses: 
- `200 Login successful`
- `401 Invalid email or password`
- `500 Server error`
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "testemail@test.com",
    "forename": "John",
    "surname": "Doe",
    "nationalityId": 1
  }
}
```

---


User Account Management:
### Users 
`POST /users`
###### Creates an account

Request:
```json
{
   "email": "user@example.com",
    "forename": "string",
    "surname": "string",
    "password": "ABC12345!",
    "nationalityId": 0
}
```

Responses: 
- `201 Created`
- `400 Bad Request`
```json
{
    "id": 1,
    "email": "user@example.com",
    "forename": "string",
    "surname": "string",
    "password": "ABC12345!",
    "nationality": "Irish"
}
```

---
`GET /users`
###### Returns a list of users
Responses: 
- `200 OK`
```json
[
 {
    "id": 1,
    "email": "testemail@test.com",
    "forename": "Testforename",
    "surname": "testsurname",
    "password": "pa$word",
    "nationality": "Irish"
  },
  {
    "id": "2,",
    "email": "test@test.com",
    "forename": "test2fore",
    "surname": "testSur",
    "password": "passw0rd",
    "nationality": "Irish"
  }
]
```


---

`GET /user/{userId}`
###### Returns a user account

Responses: 
- `200 OK`
- `404 Not Found`
```json
[
  {
    "id": 1,
    "email": "testemail@test.com",
    "forename": "Testforename",
    "surname": "testsurname",
    "password": "pa$word",
    "nationality": "Irish"
  }
]
```
---

`PUT /users/{userId}`
###### Updates an account
_NOTE: Password is an optional field, if it is not supplied, it is not updated._

Request:
```json
{
  "email": "user@example.com",
  "forename": "string",
  "surname": "string",
  "password": "@oF$?IDq9Ff7RHJ",
  "nationalityId": 0
}
```

Responses: 
- `204 No Content`
- `400 Bad Request`
- `404 Not Found`
```json
[
  {
    "id": 1,
    "email": "testemail@test.com",
    "forename": "Testforename",
    "surname": "testsurname",
    "password": "pa$word",
    "nationality": "Irish"
  }
]
```
---

`DELETE /users/{userId}`
###### Delete user account
_NOTE: This actually performs a 'soft' deletion, we don't remove the account from the database, we simply mark it as inactive._

Response: `204 No Content`

---

### Countries 
`GET /countries`
###### Returns a list of countries
Responses: 
- `200 OK`
```json
[
  {
    "id": 1,
    "name": "Mexico",
    "language": "Spanish",
    "currency": "MXN_Pesos"
  },
  {
    "id": 2,
    "name": "Costa Rica",
    "language": "Spanish",
    "currency": "CR_Colon"
  },
  {
    "id": 3,
    "name": "Guatemala",
    "language": "Spanish",
    "currency": "Guat_Quetzal"
  }
]
```


---

`GET /country/{countryId}`
###### Returns details for a specific country

Responses: 
- `200 OK`
- `404 Not Found`
```json
{
  "id": 1,
  "name": "Mexico",
  "language": "Spanish",
  "currency": "MXN_Pesos"
}
```


### Border Fees 
`GET /borderFees`
###### Returns the border fee when entering a country
Responses: 
- `200 OK`
- `404 Not Found`
```json
[
  {
    "id": 1,
    "cost": 50,
    "country": "Mexico"
  },
  {
    "id": 2,
    "cost": 30,
    "country": "Costa Rica"
    }
]
```

`GET /borderFees/{borderFeesId}`
###### Returns the border fee when entering a country
Responses: 
- `200 OK`
- `404 Not Found`
```json
{
  "borderFeesId": 1,
  "cost": 50,
  "country": "Mexico"
}
```

### Entry Requirements 
`GET /entryRequirements`
###### Returns All fees required to enter a country
Responses: 
- `200 OK`
- `404 Not Found`
```json
[
  {
    "id": 1,
    "cost": 30,
    "exceedsMaxDays": false,
    "borderFeeId": 1,
    "visaTypeId": 1,
    "countryId": 1,
    "country": "Mexico",
    "borderFees": 50,
    "visaTypes": "Tourist Visa"
  },
  {
    "id": 2,
    "cost": 30,
    "exceedsMaxDays": true,
    "borderFeeId": 2,
    "visaTypeId": 2,
    "country": "Mexico",
    "borderFees": 50,
    "visaTypes": "Long-Term"
  }
]
```

`GET /entryRequirements/{entryRequirementsId}`
###### Returns All fees required to enter a country
Responses: 
- `200 OK`
- `404 Not Found`
```json
{
  "id": 1,
  "cost": 30,
  "exceedsMaxDays": false,
  "borderFeeId": 1,
  "visaTypeId": 1,
  "country": "Mexico",
  "borderFees": 50,
  "visaTypes": "Tourist Visa"
}
```

### Transport 
`GET /transportmodes?source={sourceCountryId}&destination={destinationCountryId}`
###### Returns the transport options from source Country to Destination country
Responses: 
- `200 OK`
- `404 Not Found`
```json
{
  "sourceCountry": "Mexico",
  "destinationCountry": "Costa Rica",
  "availableOptions": [
  {
    "mode": "Flight",
    "averageCost": 300
  },
  {
    "mode": "Bus",
    "averageCost": 50
  },
  {
    "mode": "Car Rental",
    "averageCost": 100
  },
  {
    "mode": "Boat",
    "averageCost": 200
  }
]
}
```
### Trips
`POST /trip`
###### Creates a trip for the user 

Request:
```json
{
  "name": "string",
  "description": "string",
  "startDate": "string",
  "endDate": "string",
  "userId": 1
}

```

Responses: 
- `201 Created`
- `400 Bad Request`
```json
{
  "id": 1,
  "name": "testTrip",
  "description": "test",
  "startDate": "2023-03-10",
  "endDate": "2023-04-10",
  "userId": 1
}
```

---

`PUT /trip/{tripId}`
###### Updates details of a specific trip for the user 

Request:
```json
{
  "name": "string",
  "userId": 0,
  "startDate": "string",
  "endDate": "string",
  "countries": "string"
}
```

Responses: 
- `204 No Content`
- `400 Bad Request`
- `404 Not Found`
```json
  {
    "tripId": 2,
    "name": "Mexico Trip",
    "startDate": "2024-06-21",
    "endDate": "2024-08-21",
    "countries": [
      "Mexico",
      "Costa Rica"
    ],
    "transports": [
      "Aeroplane",
      "Bus"
    ],
    "lodgings": [
      "Hotel",
      "Airbnb"
    ],
    "user": {
      "id": 2,
      "email": "test@test.com",
      "forename": "string",
      "surname": "string"
    }
  }
```


---

`GET /trips`
###### Get a list of trips associated with a specific user 


Responses: 
- `200 OK`
- `404 Not Found`
```json
[
  {
    "tripId": 1,
    "name": "testTrip",
    "startDate": "2024-03-10",
    "endDate": "2023-04-10",
    "countries": [
      "Mexico",
      "Costa Rica",
      "Guatemala"
    ],
    "transports": [
      "Bus",
      "Train",
      "Boat"
    ],
    "lodgings": [
      "Hotel",
      "Airbnb"
    ],
    "user": {
      "id": 1,
      "email": "ussr@test.com",
      "forename": "testforename",
      "surname": "testsurname"
    }
  },
  {
    "tripId": 2,
    "name": "testTrip2",
    "startDate": "2024-03-10",
    "endDate": "2023-04-10",
    "countries": [
      "Colombia",
      "Peru",
      "Brazil"
    ],
    "transports": [
      "Train",
      "Bus"
    ],
    "lodgings": [
      "Airbnb",
      "Hostel"
    ],
    "user": {
      "id": 1,
      "email": "user@test.com",
      "forename": "testforename",
      "surname": "testsurname"
    }
  }
]
```


---

`GET /trips/{tripId}`
###### Get details of a specific trip, including countries and bookings 


Responses: 
- `200 OK`
- `404 Not Found`
```json
{
  "tripId": 3,
  "name": "USA trip",
  "startDate": "2024-06-10",
  "endDate": "2024-06-10",
  "countries": [
    "USA"
  ],
  "transports": [
    "Aeroplane"
  ],
  "lodgings": [
    "Hostel"
  ],
  "user": {
    "id": 2,
    "email": "test@test.com",
    "forename": "string",
    "surname": "string"
  }
}
```

---



`DELETE /trips/{tripId}`
###### Delete a specific trip
_NOTE: This actually performs a 'soft' deletion, we don't remove the account from the database, we simply mark it as inactive._

Response: `204 No Content`

---

### Trip Transports

`POST /tripTransportmodes`
###### Creates a transport mode for the trip

Request:
```json

  {
  "tripId": 0,
  "transportModeTypeId": 0,
  "cost": 0
}
```

Responses: 
- `201 Created`
- `400 Bad Request`
```json
{
  "id": 1,
  "cost": 100,
  "tripId": 1,
  "transportModeTypeId": 1
}
```

---

`PUT /tripTransportmodes/{tripTransportsId}`
###### updates transport mode for the trip

Request:
```json

{
  "tripId": 0,
  "transportModeTypeId": 0,
  "cost": 0
}
```

Responses: 
- `204 No Content`
- `400 Bad Request`
- `404 Not Found`
```json
 {
    "id": 1,
    "cost": 150,
    "tripId": 2,
    "transportModeTypeId": 3
  }
```

---

`GET /tripTransportmodes`
###### Get all trip transports


Responses: 
- `200 OK`
- `404 Not Found`
```json
[
  {
    "id": 1,
    "cost": 100,
    "tripId": 1,
    "transportModeTypeId": 1
  },
  {
    "id": 2,
    "cost": 150,
    "tripId": 1,
    "transportModeTypeId": 2
  }
]
```

---

`GET /tripTransportmodes/{tripTransportsId}`
###### Get a single trip transport by ID


Responses: 
- `200 OK`
- `404 Not Found`
```json
{
  "id": 1,
  "cost": 100,
  "tripId": 1,
  "transportModeTypeId": 1
}
```

---

`DELETE /tripTransportmodes/{tripTransportsId}`
###### deletes a trip transport 
_NOTE: This actually performs a 'soft' deletion, we don't remove the account from the database, we simply mark it as inactive._

Response: `204 No Content`

---

### Trip Lodgings

`POST /tripLodgings`
###### Creates a lodging type for the trip

Request:
```json

  {
  "tripId": 0,
  "lodgingTypeId": 0,
  "cost": 0
}
```

Responses: 
- `201 Created`
- `400 Bad Request`
```json
{
     "tripLodgingId": 76,
      "description": "hotel",
      "cost": 200,
      "tripId": 1
}
```

---

`PUT /tripLodgings/{tripLodgingId}`
###### Updates lodging type for the trip

Request:
```json

  {
  "tripId": 0,
  "lodgingTypeId": 0,
  "cost": 0
}
```

Responses: 
- `204 No Content`
- `400 Bad Request`
- `404 Not Found`
```json
{
  "id": 1,
  "cost": 150,
  "tripId": 2,
  "lodgingTypeId": 3
}
```

---

---

`GET /tripLodgings`
###### Returns lodging type for the trip

Responses: 
- `200 OK`
- `404 Not Found`
```json
[
  {
    "id": 1,
    "cost": 100,
    "tripId": 1,
    "lodgingTypeId": 1
  },
  {
    "id": 2,
    "cost": 150,
    "tripId": 1,
    "lodgingTypeId": 2
  }
]
```

---


`GET /tripLodgings{tripLodgingId}`
###### Returns single trip lodging by ID

Responses: 
- `200 OK`
- `404 Not Found`
```json
{
  "id": 1,
  "cost": 100,
  "tripId": 1,
  "lodgingTypeId": 1
}
```

---

`DELETE /tripLodgings{tripLodgingId}`
###### Delete a trip lodging 
_NOTE: This actually performs a 'soft' deletion, we don't remove the account from the database, we simply mark it as inactive._

Response: `204 No Content`

---

