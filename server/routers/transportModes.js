const { Router } = require("express");
const {
  getTransportModes,
} = require("../controllers/transportModes");
const router = Router();

/**
 * @swagger
 * /transportmodes:
 *   get:
 *     tags:
 *       - Transport Modes
 *     summary: Retrieve transport modes based on source and destination country IDs.
 *     parameters:
 *       - in: query
 *         name: sourceCountryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the source country.
 *       - in: query
 *         name: destinationCountryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the destination country.
 *     responses:
 *       200:
 *         description: Successful response with an array of transport modes.
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 source_country_id: 1
 *                 destination_country_id: 2
 *                 transport_mode_type_id: 1
 *                 avg_cost: 100
 *                 transport_mode_types: { description: "Aeroplane"}
 *               - id: 1
 *                 source_country_id: 1
 *                 destination_country_id: 2
 *                 transport_mode_type_id: 1
 *                 avg_cost: 10
 *                 transport_mode_types: { description: "Bus"}
 *       400:
 *         description: Bad Request. Both sourceCountryId and destinationCountryId are required.
 *       404:
 *         description: No transport modes found for the specified countries.
 *       500:
 *         description: Internal Server Error.
 */

router.get('/', getTransportModes);

module.exports = router;
