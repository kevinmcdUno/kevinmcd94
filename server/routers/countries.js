const { Router } = require("express");
const router = Router();
const {
    getAllCountries,
    getSingleCountry,
  } = require("../controllers/countries");

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
 *             example:
 *               - id: 1
 *                 name: "Mexico" 
 *                 language: "Spanish"          
 *                 currency: "MXN Pesos"
 *               - id: 2
 *                 name: "Costa Rica" 
 *                 language: "Spanish"          
 *                 currency: "CR Colon"
 *       404:
 *         description: Not Found
 */
router.get('/', getAllCountries);

/**
 * @swagger
 *   /countries/{countryId}:
 *   get:
 *     tags: [
 *       "Countries"
 *     ]
 *     summary: Returns details for a specific country 
 *     parameters:
 *      - name: countryId
 *        in: path
 *        type: Int
 *        description: The filter for the country Id
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *                 id: 1
 *                 name: "Mexico" 
 *                 language: "Spanish"          
 *                 currency: "MXN_Pesos"
 *                   
 *       404:
 *         description: Not Found 
 */

router.route("/:countryId(\\d+)").get(getSingleCountry);


module.exports = router;