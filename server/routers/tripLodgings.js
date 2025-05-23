const { Router } = require("express");
const validation = require("../utils/validation");
const { body } = require("express-validator");
const {
  createTripLodging,
  getAllTripLodgings,
  updateSingleTripLodging,
  deleteTripLodging,
} = require("../controllers/tripLodgings");
const router = Router({ mergeParams: true });

/**
 * @swagger
 *   /trips/{tripId}/lodgings:
 *   post:
 *     tags: [
 *         "Trip Lodgings"
 *      ]
 *     summary: Create a new trip lodging
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
 *             properties:
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
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/",
  [
    body("lodgingTypeId").isInt(),
    body("cost").isInt(),
  ],
  validation.validate,
  createTripLodging
);

/**
 * @swagger
 * /trips/{tripId}/lodgings:
 *   get:
 *     tags: [
 *        "Trip Lodgings" 
 *     ]
 *     summary: Get all trip lodgings
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: integer
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
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 * 
 */
router.get("/", getAllTripLodgings);


/**
 * @swagger
 * /trips/{tripId}/lodgings/{tripLodgingId}:
 *   put:
 *     summary: Update a single trip lodging
 *     tags: [Trip Lodgings]
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         description: The ID of the trip
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
 *       400:
 *         description: Bad request, check request body
 *       404:
 *         description: Trip-lodging association not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/:tripLodgingId(\\d+)",
  [
    body("lodgingTypeId").isInt(),
    body("cost").isInt(),
  ],
  validation.validate,
  updateSingleTripLodging
);

/**
 * @swagger
 * /trips/{tripId}/lodgings/{tripLodgingsId}:
 *   delete:
 *     tags: [
 *        "Trip Lodgings" 
 *     ]
 *     summary: Delete a trip lodging by ID
 *     parameters:
 *       - name: tripId
 *         in: path
 *         type: integer
 *         description: The ID of the trip
 *       - name: tripLodgingsId
 *         in: path
 *         type: integer
 *         description: The ID of the trip lodging
 *     responses:
 *       204:
 *         description: Successfully deleted trip-country association
 *       404:
 *         description: Trip-lodging association not found
 *       500:
 *         description: Internal server error 
 */
router.route("/:tripLodgingId(\\d+)").delete(deleteTripLodging);

module.exports = router;
