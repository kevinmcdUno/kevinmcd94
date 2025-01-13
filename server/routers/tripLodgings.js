const { Router } = require("express");
const validation = require("../utils/validation");
const { body } = require("express-validator");
const {
  createTripLodging,
  getAllTripLodgings,
  getSingleTripLodging,
  updateSingleTripLodging,
  deleteTripLodging,
} = require("../controllers/tripLodgings");
const router = Router();

/**
 * @swagger
 *   /tripLodgings:
 *   post:
 *     tags: [
 *         "Trip Lodgings"
 *      ]
 *     summary: Create a new trip lodging
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tripId:
 *                 type: integer
 *               lodgingTypeId:
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
 *               lodgingTypeId: 1
 *       400:
 *         description: Bad Request
 */
router.post(
  "/",
  [
    body("tripId").isInt(),
    body("lodgingTypeId").isInt(),
    body("cost").isInt(),
  ],
  validation.validate,
  createTripLodging
);

/**
 * @swagger
 * /tripLodgings:
 *   get:
 *     tags: [
 *        "Trip Lodgings" 
 *     ]
 *     summary: Get all trip lodgings
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 cost: 100
 *                 tripId: 1
 *                 lodgingTypeId: 1
 *               - id: 2
 *                 cost: 150
 *                 tripId: 1
 *                 lodgingTypeId: 2
 *       204:
 *         description: No content
 */
router.get("/", getAllTripLodgings);

/**
 * @swagger
 * /tripLodgings/{tripLodgingId}:
 *   get:
 *     tags: [
 *        "Trip Lodgings" 
 *     ]
 *     summary: Get a single trip lodging by ID
 *     parameters:
 *       - name: tripLodgingId
 *         in: path
 *         type: integer
 *         description: The ID of the trip lodging
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               cost: 100
 *               tripId: 1
 *               lodgingTypeId: 1
 *       404:
 *         description: Not Found
 */
router.route("/:tripLodgingId(\\d+)").get(getSingleTripLodging);

/**
 * @swagger
 * /tripLodgings/{tripLodgingId}:
 *   put:
 *     summary: Update a single trip lodging
 *     tags: [Trip Lodgings]
 *     parameters:
 *       - in: path
 *         name: tripLodgingId
 *         required: true
 *         description: The ID of the trip lodging
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
 *               lodgingTypeId:
 *                 type: integer
 *               cost:
 *                 type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               cost: 150
 *               tripId: 2
 *               lodgingTypeId: 3
 *       204:
 *         description: No content
 */
router.put(
  "/:tripLodgingId(\\d+)",
  [
    body("tripId").isInt(),
    body("lodgingTypeId").isInt(),
    body("cost").isInt(),
  ],
  validation.validate,
  updateSingleTripLodging
);

/**
 * @swagger
 * /tripLodgings/{tripLodgingId}:
 *   delete:
 *     tags: [
 *        "Trip Lodgings" 
 *     ]
 *     summary: Delete a trip lodging by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         description: The ID of the trip lodging
 *     responses:
 *       204:
 *         description: No content
 */
router.route("/:tripLodgingId(\\d+)").delete(deleteTripLodging);

module.exports = router;
