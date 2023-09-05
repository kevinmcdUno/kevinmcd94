const { Router } = require("express");
const router = Router();

/**
 * @swagger
 * /countries/{country_id}/borders/{border_country_id}:
 *   get:
 *     tags: [
 *       "Border Fees"
 *     ]
 *     summary: Returns the border fee when entering a country 
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
 *                 value: '[{    "id": "654", "sourceCountry": "Brazil", "destinationCountry": "Colombia", "borderfee": "$12" }]'
 *       204:
 *         description: No content
 */
router.route("/").get((req, res) => res.send('Hello World'))


module.exports = router; 