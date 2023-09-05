const { Router } = require("express");
const router = Router();

/**
 * @swagger
 *  /transportmodes?source={source_country_id}&destination={destination_country_id}:
 *   get:
 *     tags: [
 *       "Transport"
 *     ]
 *     summary: Returns an array of Transport modes from Source Country to the Destination country
 *     parameters:
 *      - name: country_id
 *        in: query
 *        type: int
 *        description: The filter for the source country
 *      - name: border_country_id
 *        in: query
 *        type: int
 *        description: The filter for the destination country
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{  "transport_id": 1, available_options: [ { "mode": "Flight", "avg_cost": 300 }, { "mode": "Bus", "avg_cost": 50 }, { "mode": "Train", "avg_cost": 150 }]}]'
 *       204:
 *         description: No content
 */

router.route("/").get((req, res) => res.send('Hello World'))


module.exports = router;