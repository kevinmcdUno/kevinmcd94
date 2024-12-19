const express = require('express');
const router = express.Router();
const { getEntryRequirements, getSingleEntryRequirements } = require('../controllers/entryRequirements');

/**
 * @swagger
 * /entryRequirements:
 *   get:
 *     tags:
 *       - Entry Requirements
 *     summary: Retrieve all entry requirements with associated border fees, countries, and visa types.
 *     responses:
 *       200:
 *         description: Successful response with an array of entry requirements.
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 cost: 30
 *                 exceedsMaxDays: false
 *                 borderFeeId: 1
 *                 visaTypeId: 1
 *                 country: "Mexico" 
 *                 borderFees: 50 
 *                 visaTypes: "Tourist Visa"
 *               - id: 2
 *                 cost: 30
 *                 exceedsMaxDays: true
 *                 borderFeeId: 2
 *                 visaTypeId: 2
 *                 country: "Mexico" 
 *                 borderFees: 50 
 *                 visaTypes: "Long-Term"
 *       404:
 *         description: Not Found. No entry requirements found.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/', getEntryRequirements);

/**
 * @swagger
 * /entryRequirements/{entryRequirementsId}:
 *   get:
 *     tags:
 *       - Entry Requirements
 *     summary: Retrieve all entry requirements with associated border fees, countries, and visa types.
 *     parameters:
 *       - name: entryRequirementsId
 *         in: path
 *         type: int
 *         description: The filter for Id of the entry requirements 
 *     responses:
 *       200:
 *         description: Successful response with an array of entry requirements.
 *         content:
 *           application/json:
 *             example:
 *                 id: 1
 *                 cost: 30
 *                 exceedsMaxDays: false
 *                 borderFeeId: 1
 *                 visaTypeId: 1
 *                 country: "Mexico" 
 *                 borderFees: 50 
 *                 visaTypes: "Tourist Visa"
 *       404:
 *         description: Not Found. No entry requirements found.
 *       500:
 *         description: Internal Server Error.
 */
router.route("/:entryRequirementsId(\\d+)").get(getSingleEntryRequirements)

module.exports = router;
