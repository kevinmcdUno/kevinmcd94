const { Router } = require("express");
const validation = require("../utils/validation");
const { body } = require("express-validator");
const {
    createTripCountry,
    getAllTripCountries,
    getTripCountryById,
    updateTripCountry,
    deleteTripCountry
} = require("../controllers/tripCountries");
const router = Router();
/**
 * @swagger
 * /tripCountries:
 *   post:
 *     tags: [
 *         "Trip Countries"
 *      ]
 *     summary: Create a new trip-country association
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tripId:
 *                 type: integer
 *               countryId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Successfully created trip-country association
 *       400:
 *         description: Bad request, check request body
 */
router.post(
  "/",
  [
      body('tripId').isInt(),
      body('countryId').isInt(),
  ],
  validation.validate,
  createTripCountry
);

/**
* @swagger
* /tripCountries:
*   get:
*     tags: [
*        "Trip Countries"
*      ]
*     summary: Retrieve all trip-country associations
*     responses:
*       200:
*         description: Successfully retrieved trip-country associations
*       500:
*         description: Internal server error
*/
router.get("/", getAllTripCountries);

/**
* @swagger
* /tripCountries/{tripCountryId}:
*   get:
*     tags: [
*        "Trip Countries"
*     ]
*     summary: Retrieve a trip-country association by ID
*     parameters:
*       - in: path
*         name: tripCountryId
*         required: true
*         schema:
*           type: integer
*     responses:
*       200:
*         description: Successfully retrieved trip-country association
*       404:
*         description: Trip-country association not found
*       500:
*         description: Internal server error
*/
router.get("/:tripCountryId(\\d+)", getTripCountryById);

/**
* @swagger
* /tripCountries/{tripCountryId}:
*   put:
*     tags: [
*        "Trip Countries"
*     ]
*     summary: Update a trip-country association
*     parameters:
*       - in: path
*         name: tripCountryId
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
*               tripId:
*                 type: integer
*               countryId:
*                 type: integer
*     responses:
*       200:
*         description: Successfully updated trip-country association
*       400:
*         description: Bad request, check request body
*       404:
*         description: Trip-country association not found
*       500:
*         description: Internal server error
*/
router.put(
  "/:tripCountryId(\\d+)",
  [
      body('tripId').isInt(),
      body('countryId').isInt(),
  ],
  validation.validate,
  updateTripCountry
);

/**
* @swagger
* /tripCountries/{tripCountryId}:
*   delete:
*     tags: [
*        "Trip Countries"
*     ]
*     summary: Delete a trip-country association by ID
*     parameters:
*       - in: path
*         name: tripCountryId
*         required: true
*         schema:
*           type: integer
*     responses:
*       204:
*         description: Successfully deleted trip-country association
*       404:
*         description: Trip-country association not found
*       500:
*         description: Internal server error
*/
router.delete("/:tripCountryId(\\d+)", deleteTripCountry);

module.exports = router;
