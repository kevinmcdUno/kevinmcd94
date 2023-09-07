const { Router } = require("express");
const router = Router();

/**
 * @swagger
 * /countries/{CountryId}/borders/{borderCountryId}:
 *   get:
 *     tags: [
 *       "Border Fees"
 *     ]
 *     summary: Returns the border fee when entering a country 
 *     parameters:
 *      - name: CountryId
 *        in: query
 *        type: int
 *        description: The filter for the source country
 *      - name: borderCountryId
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
 *                 value: '[{    "id": "654", "sourceCountry": "Brazil", "destinationCountry": "Colombia", "borderfee": "$12" }]'
 *       404:
 *         description: Not Found
 */
router.route("/").get((req, res) => res.send('Hello World'))


module.exports = router; 