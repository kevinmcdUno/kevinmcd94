const { Router } = require("express");
const { body } = require("express-validator");
const {
  createTripTransport,
  getAllTripTransports,
  updateSingleTripTransport,
  deleteTripTransport,
} = require("../controllers/tripTransports");
const validation = require("../utils/validation");

const router = Router({ mergeParams: true });

/**
 * @swagger
 * /trips/{tripId}/transports:
 *   post:
 *     tags: ["Trip Transports"]
 *     summary: Create a new trip transport
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - transportModeTypeId
 *               - cost
 *             properties:
 *               transportModeTypeId:
 *                 type: integer
 *                 example: 1
 *               cost:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               cost: 100
 *               tripId: 1
 *               transportModeTypeId: 1
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.post(
  "/",
  [
    body("transportModeTypeId").isInt(),
    body("cost").isInt(),
  ],
  validation.validate,
  createTripTransport
);


/**
 * @swagger
 * /trips/{tripId}/transports:
 *   get:
 *     tags: ["Trip Transports"]
 *     summary: Get all transport modes for a trip
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved trip transports
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 cost: 100
 *                 tripId: 1
 *                 transportModeTypeId: 1
 *                 transportModeType: "Bus"
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getAllTripTransports);


/**
 * @swagger
 * /trips/{tripId}/transports/{tripTransportId}:
 *   put:
 *     tags: ["Trip Transports"]
 *     summary: Update a single trip transport
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: tripTransportId
 *         required: true
 *         description: The ID of the trip transport
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               transportModeTypeId:
 *                 type: integer
 *               cost:
 *                 type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *             - id: 1
 *               cost: 150
 *               tripId: 2
 *               transportModeTypeId: 3
 *       400:
 *         description: Bad request, check request body
 *       404:
 *         description: Trip-transport association not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/:tripTransportId(\\d+)",
  [
    body("transportModeTypeId").isInt(),
    body("cost").isInt(),
  ],
  validation.validate,
  updateSingleTripTransport
);

/**
 * @swagger
 * /trips/{tripId}/transports/{tripTransportId}:
 *   delete:
 *     tags: ["Trip Transports"]
 *     summary: Delete a trip transport by ID
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: integer
 *       - name: tripTransportId
 *         in: path
 *         type: integer
 *         description: The ID of the trip transport
 *     responses:
 *       204:
 *         description: Successfully deleted trip-country association
 *       404:
 *         description: Trip-transport association not found
 *       500:
 *         description: Internal server error
 */
router.route("/:tripTransportId(\\d+)").delete(deleteTripTransport);

module.exports = router;
