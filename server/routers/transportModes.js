const { Router } = require("express");
const router = Router();

/**
 * @swagger
 *  /transportmodes?source={sourceCountryId}&destination={destinationCountryId}:
 *   get:
 *     tags: [
 *       "Transport"
 *     ]
 *     summary: Returns an array of Transport modes from Source Country to the Destination country
 *     parameters:
 *      - name: CountryId
 *        in: query
 *        type: int
 *        description: The filter for the source country
 *      - name: destinationCountryId
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
 *                 value: 
 *                   - transportmodeId: 1
 *                     availableOptions: 
 *                       - mode: "Flight"
 *                         averageCost: 300
 *                       - mode: "Bus"
 *                         averageCost: 50
 *                       - mode: "Train"
 *                         averageCost: 150
 *       404:
 *         description: Not Found
 */

router.route("/").get((req, res) => res.send('Hello World'))


module.exports = router;