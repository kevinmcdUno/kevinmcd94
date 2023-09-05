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
 *     content:
 *     application/json:
 *     scehma: 
 *     type: object
 *     properties: 
 *              name:
 *                type: string
 *                required: true
 *                descriptions: The trip name 
 *              user_emailAddress:
 *                type: string
 *                required: true
 *                descriptions: The users email
 *              start_date:
 *                type: string
 *                required: true
 *                descriptions: The start date of the trip
 *              end_date:
 *                type: string
 *                required: true
 *                descriptions: The end date of the trip
 *              countries:
 *                type: object
 *                required: true
 *                descriptions: The Trip countries 
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{  "trip_id": 123, "user_id": 1, "start_date": "2023-01-01", "end_date": "2023-03-10", "countries": [ { "country_id": 24, "country": "Colombia", "stay_duration": 7 }, {"country_id": 28, "country": "Brazil", "stay_duration": 3} }]'
 *       204:
 *         description: No content
 */

router.route("/").get((req, res) => res.send('Hello World'))


module.exports = router;