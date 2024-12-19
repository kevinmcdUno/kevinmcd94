const express = require('express');
const router = express.Router();
const { getBorderFees, getSingleBorderFees } = require('../controllers/borderFees');

/**
 * @swagger
 * /borderFees:
 *   get:
 *     tags:
 *       - Border Fees
 *     summary: Retrieve all border fees with associated countries and entry requirements.
 *     responses:
 *       200:
 *         description: Successful response with an array of border fees.
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 cost: 50
 *                 country: "Mexico" 
 *               - id: 2
 *                 cost: 30
 *                 countries: "Costa Rica" 
 *       404:
 *         description: Not Found. No border fees found.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/', getBorderFees);


/**
 * @swagger
 *  /borderFees/{borderFeesId}:
 *   get:
 *     tags: [
 *       "Border Fees"
 *     ]
 *     summary: Returns Details for the Border Fees entering a country
 *     parameters:
 *       - name: borderFeesId
 *         in: path
 *         type: int
 *         description: The filter for Id of the border fees
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: 
 *                     id: 1
 *                     cost: 1
 *                     country: "Mexico" 
 *       404:
 *         description: Not Found
 */
router.route("/:borderFeesId(\\d+)").get(getSingleBorderFees)


module.exports = router;
