const { Router } = require("express");
const router = Router();

/**
 * @swagger
 *  /trip:
 *   post:
 *     tags: [
 *       "Trips"
 *     ]
 *     summary: Creates a trip for the users
 *     requestBody:
 *      content:
 *       application/json:
 *        scehma: 
 *          type: object
 *          properties: 
 *              tripName:
 *                type: string
 *                required: true
 *                descriptions: The trip name 
 *              userEmailAddress:
 *                type: string
 *                required: true
 *                descriptions: The users email
 *              startDate:
 *                type: string
 *                required: true
 *                descriptions: The start date of the trip
 *              endDate:
 *                type: string
 *                required: true
 *                descriptions: The end date of the trip
 *              countries:
 *                type: object
 *                required: true
 *                descriptions: The Trip countries 
  *     responses:
 *       201:
 *         description: Created
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
 *                         stay_duration: 7
 *                       - countryId: 28
 *                         country: "Brazil"
 *                         stay_duration: 3
 *       400:
 *         description: Bad Request
 */

/**
 * @swagger
 *  /trip:
 *   get:
 *     tags: [
 *       "Trips"
 *     ]
 *     summary: Returns Details for the Trip
 *     parameters:
 *       - userId: userId
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
 *                   - tripId: 123
 *                     userId: 1
 *                     startDate: "2023-01-01"
 *                     endDate: "2023-03-10"
 *                     countries: 
 *                       - countryId: 24
 *                         country: "Colombia"
 *                         stay_duration: 7
 *                       - countryId: 28
 *                         country: "Brazil"
 *                         stay_duration: 3
 *       404:
 *         description: Not Found
 */

/**
 * @swagger
 *  /trip/{tripId}:
 *   get:
 *     tags: [
 *       "Trips"
 *     ]
 *     summary: Returns Details for the Trip
 *     parameters:
 *       - userId: userId
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
 *                   - tripId: 123
 *                     userId: 1
 *                     startDate: "2023-01-01"
 *                     endDate: "2023-03-10"
 *                     countries: 
 *                       - country_id: 24
 *                         country: "Colombia"
 *                         stay_duration: 7
 *                       - country_id: 28
 *                         country: "Brazil"
 *                         stay_duration: 3
 *       204:
 *         description: No content
 */

/**
 * @swagger
 *  /trip/{tripId}:
 *   put:
 *     tags: [
 *       "Trips"
 *     ]
 *     summary: Returns Details for the Trip
 *     parameters:
 *       - userId: userId
 *         in: query
 *         type: int
 *         description: The filter for userId
 *       - tripId: tripId
 *         in: query
 *         type: int
 *         description: The filter for tripId
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
 *                       - country_id: 24
 *                         country: "Colombia"
 *                         stay_duration: 7
 *                       - country_id: 28
 *                         country: "Brazil"
 *                         stay_duration: 3
 *       204:
 *         description: No content
 *       400: 
 *          description: Bad Request
 */
router.route("/").get((req, res) => res.send('Hello World'))


module.exports = router;