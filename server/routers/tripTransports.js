const { Router } = require("express");
const { body } = require("express-validator");
const {
  createTripTransport,
  getAllTripTransports,
  getSingleTripTransport,
  updateSingleTripTransport,
  deleteTripTransport,
} = require("../controllers/tripTransports");
const validation = require("../utils/validation");

const router = Router();

/**
 * @swagger
 * /tripTransports:
 *   post:
 *     tags: ["Trip Transports"]
 *     summary: Create a new trip transport
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tripId:
 *                 type: integer
 *               transportModeTypeId:
 *                 type: integer
 *               cost:
 *                 type: integer
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
 */
router.post(
  "/",
  [
    body("tripId").isInt(),
    body("transportModeTypeId").isInt(),
    body("cost").isInt(),
  ],
  validation.validate,
  createTripTransport
);

/**
 * @swagger
 * /tripTransports:
 *   get:
 *     tags: ["Trip Transports"]
 *     summary: Get all trip transports
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 cost: 100
 *                 tripId: 1
 *                 transportModeTypeId: 1
 *               - id: 2
 *                 cost: 150
 *                 tripId: 1
 *                 transportModeTypeId: 2
 *       204:
 *         description: No content
 */
router.get("/", getAllTripTransports);

/**
 * @swagger
 * /tripTransports/{tripTransportId}:
 *   get:
 *     tags: ["Trip Transports"]
 *     summary: Get a single trip transport by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         description: The ID of the trip transport
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               cost: 100
 *               tripId: 1
 *               transportModeTypeId: 1
 *       404:
 *         description: Not Found
 */
router.route("/:tripTransportId(\\d+)").get(getSingleTripTransport);

/**
 * @swagger
 * /tripTransports/{tripTransportId}:
 *   put:
 *     tags: ["Trip Transports"]
 *     summary: Update a single trip transport
 *     parameters:
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
 *               tripId:
 *                 type: integer
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
 *       204:
 *         description: No content
 */
router.put(
  "/:tripTransportId(\\d+)",
  [
    body("tripId").isInt(),
    body("transportModeTypeId").isInt(),
    body("cost").isInt(),
  ],
  validation.validate,
  updateSingleTripTransport
);

/**
 * @swagger
 * /tripTransports/{tripTransportId}:
 *   delete:
 *     tags: ["Trip Transports"]
 *     summary: Delete a trip transport by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         description: The ID of the trip transport
 *     responses:
 *       204:
 *         description: No content
 */
router.route("/:tripTransportId(\\d+)").delete(deleteTripTransport);

module.exports = router;
