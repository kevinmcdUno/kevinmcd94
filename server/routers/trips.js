const { Router } = require("express");
const validation = require("../utils/validation");
const { body } = require("express-validator");
const { createTrip, getSingleTrip, updateTrip, getAllTrips, deleteTrip } = require("../controllers/trips");
const router = Router();


/**
 * @swagger
 *   /trips:
 *   post:
 *     tags: [
 *       "Trips"
 *     ]
 *     summary: Creates a new trip
 *     requestBody:
 *       content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *            name:
 *              type: string
 *              required: true
 *              description: The name of the trip 
 *            description:
 *              type: string
 *              required: true
 *              description: The users nationality
 *            start_date:
 *              type: string
 *              required: true
 *              description: The trip start date
 *            end_date:
 *              type: string
 *              required: true
 *              description: The trip end date
 *            user_id:
 *              type: integer
 *              required: true
 *              description: The UserId for the trip 
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: 
 *                     id: 1
 *                     name: testTrip
 *                     description: "test"
 *                     start_date: "2023-03-10"
 *                     end_date: "2023-04-10"
 *                     user_id: 1
 *       400:
 *         description: Bad Request
 */
router.route("/").post(  
    [
    body("name")
      .isLength({ min: 3 })
      .withMessage("the trip name must have minimum length of 3")
      .trim(),
    body("start_date")
      .isDate({ format: "yyyy-MM-dd"} )
      .withMessage("the date format must be correct")
      .trim(),
      body("end_date")
      .isDate({ format: "yyyy-MM-dd"} )
      .withMessage("the date format must be correct")
      .trim(),
      body("user_id")
      .isInt()
      .trim(), 
  ],
  validation.validate,
  createTrip
);

/**
 * @swagger
 *  /trips:
 *   get:
 *     tags: [
 *       "Trips"
 *     ]
 *     summary: Returns Details for the All Trips for the User
 *     parameters:
 *       - name: userId
 *         in: query
 *         type: int
 *         description: The filter for userId
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: 
 *                   - trip_id: 1
 *                     name: testTrip
 *                     start_date: "2024-03-10"
 *                     end_date: "2023-04-10"
 *                     countries:
 *                       - Mexico
 *                       - Costa Rica
 *                       - Guatemala
 *                     transports:
 *                       - Bus
 *                       - Train
 *                       - Boat
 *                     lodgings:
 *                       - Hotel
 *                       - Airbnb
 *                     user:
 *                      id: 1
 *                      email: ussr@test.com
 *                      first_name: testforename
 *                      second_name: testsurname
 *                   - trip_id: 2
 *                     name: testTrip2
 *                     start_date: "2024-03-10"
 *                     end_date: "2023-04-10"
 *                     countries:
 *                       - Colombia
 *                       - Peru
 *                       - Brazil
 *                     transports:
 *                       - Train
 *                       - Bus
 *                     lodgings:
 *                       - Airbnb
 *                       - Hostel
 *                     user:
 *                      id: 1
 *                      email: user@test.com
 *                      first_name: testforename
 *                      second_name: testsurname
 *                    
 *       404:
 *         description: Not Found
 */

router.route("/").get(getAllTrips),


/**
 * @swagger
 *  /trips/{tripId}:
 *   get:
 *     tags: [
 *       "Trips"
 *     ]
 *     summary: Returns Details for the Trip
 *     parameters:
 *       - name: tripId
 *         in: path
 *         type: int
 *         description: The filter for Id of the trip
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: 
 *                   - trip_id: 2
 *                     name: Mexico Trip
 *                     start_date: "2024-06-21"
 *                     end_date: "2024-08-21"
 *                     countries:
 *                       - Mexico
 *                     transports: 
 *                       - Aeroplane
 *                     lodgings: 
 *                       - Hotel
 *                     user:
 *                       id: 2
 *                       email: test@test.com
 *                       first_name: string
 *                       second_name: string
 *       404:
 *         description: Not Found
 */
router.route("/:tripId(\\d+)").get(getSingleTrip)

/**
 * @swagger
 *  /trips/{tripId}:
 *   put:
 *     tags: [
 *       "Trips"
 *     ]
 *     summary: Update Details for the Trip
 *     parameters:
 *       - name: tripId
 *         in: path
 *         type: int
 *         description: The filter for tripId
 *     requestBody:
 *       content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *            name:
 *              type: string
 *              required: true
 *              description: The name of the trip 
 *            userId:
 *              type: integer
 *              required: true
 *              description: The UserId for the trip 
 *            startDate:
 *              type: string
 *              required: true
 *              description: The trip start date
 *            endDate:
 *              type: string
 *              required: true
 *              description: The trip end date
 *            countries:
 *              type: string
 *              required: true
 *              description: The users nationality
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: 
 *                   - tripId: 123
 *                     userId: 1
 *                     startDate: "2023-01-01"
 *                     endDate: "2023-03-10"
 *                     countries: 
 *                       - countryId: 24
 *                         country: "Colombia"
 *                       - countryId: 28
 *                         country: "Brazil"
 *       204:
 *         description: No content
 *       400: 
 *          description: Bad Request
 */
router.route("/:tripId(\\d+)").put(
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("the trip name must have minimum length of 3")
      .trim(),
    body("userId")
      .isInt()
      .trim(),
    body("startDate")
      .isDate({format: "yyyy-MM-dd"})
      .withMessage("the date format must be correct")
      .trim(),
      body("endDate")
      .isDate({format: "yyyy-MM-dd"})
      .withMessage("the date format must be correct")
      .trim(),
  ],
  validation.validate,
  updateTrip );

/**
 * @swagger
 * /trips/{tripId}:
 *   delete:
 *     tags: [
 *       "Trips"
 *     ]
 *     summary: Deletes a trip by trip ID
 *     parameters:
 *      - name: tripId
 *        in: path
 *        type: interger
 *        description: The ID of the requested trip
 *     responses:
 *       204:
 *         description: No content
 */
router.route("/:tripId(\\d+)").delete(
  deleteTrip);


module.exports = router;