const { Router } = require("express");
const router = Router();
const {
    getAllLodgingTypes,
    getSingleLodgingType, // Updated the naming
} = require("../controllers/lodgingTypes");

/**
 * @swagger
 * /lodgingTypes:
 *   get:
 *     tags: [
 *       "Lodging Types"
 *     ]
 *     summary: Returns an array of lodgings with the lodgingTypeId, and description 
 *     parameters:
 *      - name: description
 *        in: query
 *        type: string
 *        description: The filter for the lodging description
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 description: "Hotel"
 *               - id: 2
 *                 description: "Airbnb" 
 *       404:
 *         description: Not Found
 */
router.get('/', getAllLodgingTypes);

/**
 * @swagger
 * /lodgingTypes/{lodgingTypeId}:
 *   get:
 *     tags: [
 *       "Lodging Types"
 *     ]
 *     summary: Returns details for a specific lodgingType
 *     parameters:
 *      - name: lodgingTypeId
 *        in: path
 *        type: integer
 *        description: The filter for the lodgingTypeId
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *                 id: 1
 *                 description: "Hotel"
 *       404:
 *         description: Not Found
 */
router.route("/:lodgingTypeId(\\d+)").get(getSingleLodgingType); // Updated naming


module.exports = router;
