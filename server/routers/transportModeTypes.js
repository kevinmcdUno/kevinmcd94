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
 *               - transportModeTypeId: 1
 *                 description: "Bus"
 *               - transportModeTypeId: 2
 *                 description: "Train" 
 *       404:
 *         description: Not Found
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
 *               - transportModeTypeId: 1
 *                 description: "Bus"                   
 *       404:
 *         description: Not Found 
 */
router.route("/:transportModeTypeId(\\d+)").get(getSingleTransportModeType); 

module.exports = router;
