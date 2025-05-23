const { Router } = require("express");
const validation = require("../utils/validation");
const { body } = require("express-validator");
const {
    createTripCountry,
    getAllTripCountries,
    updateTripCountry,
    deleteTripCountry
} = require("../controllers/tripCountries");

const router = Router({ mergeParams: true });

/**
 * @swagger
 * /trips/{tripId}/countries:
 *   post:
 *     tags: ["Trip Countries"]
 *     summary: Create a new trip-country association
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
 *               countryId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Successfully created trip-country association
 *       400:
 *         description: Bad request
 */
router.post(
  "/",
  [body("countryId").isInt()],
  validation.validate,
  createTripCountry
);

/**
 * @swagger
 * /trips/{tripId}/countries:
 *   get:
 *     tags: ["Trip Countries"]
 *     summary: Get all countries for a trip
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error.
 */
router.get("/", getAllTripCountries);


/**
* @swagger
* /trips/{tripId}/countries/{tripCountryId}:
*   put:
*     tags: [
*        "Trip Countries"
*     ]
*     summary: Update a trip-country association
*     parameters:
*       - in: path
*         name: tripId
*         required: true
*         schema:
*         type: integer
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
      body('countryId').isInt(),
  ],
  validation.validate,
  updateTripCountry
);

/**
* @swagger
* /trips/{tripId}/countries/{tripCountryId}:
*   delete:
*     tags: [
*        "Trip Countries"
*     ]
*     summary: Delete a trip-country association by ID
*     parameters:
*       - name: tripId
*         in: path        
*         type: integer
*         description: The ID of the trip
*       - name: tripCountryId
*         in: path
*         type: integer
*         description: The ID of the trip country 
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
