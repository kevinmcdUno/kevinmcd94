const { Router } = require("express");
const router = Router();
const {
    getAllTransportModeTypes,
    getSingleTransportModeType, 
} = require("../controllers/transportModeTypes");

/**
 * @swagger
 * /transportModeTypes:
 *   get:
 *     tags: [
 *       "Transport Mode Types"
 *     ]
 *     summary: Returns an array of modes of transport with the transportModeTypeId, and description 
 *     parameters:
 *      - name: description
 *        in: query
 *        type: string
 *        description: The filter for the transport description
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 description: "Bus"
 *               - id: 2
 *                 description: "Train" 
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get('/', getAllTransportModeTypes);

/**
 * @swagger
 * /transportModeTypes/{transportModeTypeId}:
 *   get:
 *     tags: [
 *       "Transport Mode Types"
 *     ]
 *     summary: Returns details for a specific mode of transport 
 *     parameters:
 *      - name: transportModeTypeId
 *        in: path
 *        type: Int
 *        description: The filter for the transportModeTypeId
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *                 id: 1
 *                 description: "Bus"                   
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.route("/:transportModeTypesId(\\d+)").get(getSingleTransportModeType); 


module.exports = router;
