const { Router } = require("express");
const router = Router();

/**
 * @swagger
 * /countries:
 *   get:
 *     tags: [
 *       "Countries"
 *     ]
 *     summary: Returns an array of countries with the country id, name, currency and lanaguage 
 *     parameters:
 *      - name: name
 *        in: query
 *        type: string
 *        description: The filter for the country name
 *      - name: currency
 *        in: query
 *        type: string
 *        description: The filter for the country currency
 *      - name: language
 *        in: query
 *        type: string
 *        description: The filter for the country language
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{  "id": 1, "name": "Brazil", "currency": "Brazilian real","language": "Portuguese" }, { "id": 1, "name": "Colombia", "currency": "Colombian peso","language": "Spannish"}]'
 *       404:
 *         description: Not Found
 */

/**
 * @swagger
 *   /country/{CountryId}:
 *   get:
 *     tags: [
 *       "Countries"
 *     ]
 *     summary: Returns details for a specific country 
 *     parameters:
 *      - name: name
 *        in: query
 *        type: string
 *        description: The filter for the country name
 *      - name: currency
 *        in: query
 *        type: string
 *        description: The filter for the country currency
 *      - name: language
 *        in: query
 *        type: string
 *        description: The filter for the country language
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{  "id": 1, "name": "Brazil", "currency": "Brazilian real","language": "Portuguese" }]'
 *       404:
 *         description: Not Found 
 */
router.route("/").get((req, res) => res.send('Hello World'))


module.exports = router;