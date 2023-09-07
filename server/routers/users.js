const { Router } = require("express");
const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [
 *       "Users"
 *     ]
 *     summary: Returns an array of users with the user ID, email, name, password & nationality 
 *     parameters:
 *      - name: email
 *        in: query
 *        type: string
 *        description: The filter for user email
 *      - name: firstName
 *        in: query
 *        type: string
 *        description: The filter for user first name
 *      - name: secondName
 *        in: query
 *        type: string
 *        description: The filter for user second name
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "userId": 1, "email": "kevin.mcdermott@unosquare.com", "firstName": "Kevin", "secondName": "McDermott", "password": "pa$$word", "nationality": "Irish" }, { "userId": 2, "email": "kevin.mcdermott@unosquare.com", "firstName": "Kevy", "secondName": "McDermott", "password": "passw0rd", "nationality": "Irish" }]'
 *       204:
 *         description: No content
 */
router.route("/").get((req, res) => res.send('Hello World'))

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags: [
 *       "Users"
 *     ]
 *     summary: Returns a user by user ID
 *     parameters:
 *      - name: firstName
 *        in: query
 *        type: string
 *        description: The filter for user first name
 *      - name: secondName
 *        in: query
 *        type: string
 *        description: The filter for user second name
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "userId": 1, "email": "kevin.mcdermott@unosquare.com", "firstName": "Kevin", "secondName": "McDermott", "password": "pa$$word", "nationality": "Irish" }, { "userId": 2, "email": "kevin.mcdermott@unosquare.com",  "firstName": "Kevy", "secondName": "McDermott", "password": "passw0rd", "nationality": "Irish" }]'
 *       204:
 *         description: No content
 */

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [
 *       "Users"
 *     ]
 *     summary: Creates a new user
 *     requestBody:
 *       content:
 *        application/json:
 *         schema:
 *           type: object   
 *           properties:
 *            email:
 *              type: string
 *              required: true
 *              description: The users email
 *            firstName:
 *              type: string
 *              required: true
 *              description: The users first name
 *            secondName:
 *              type: string
 *              required: true
 *              description: The users second name
 *            password:
 *              type: string
 *              required: true
 *              description: The users password
 *            nationality:
 *              type: string
 *              required: true
 *              description: The users nationality
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "userId": 1, "email": "kevin.mcdermott@unosquare.com", "firstName": "Kevin", "secondName": "McDermott", "password": "pa$$word", "nationality": "Irish" }, { "userId": 2, "email": "kevin.mcdermott@unosquare.com", "firstName": "Kevy", "secondName": "McDermott", "password": "passw0rd", "nationality": "Irish" }]'
 *       400:
 *         description: Bad Request
 */

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     tags: [
 *       "Users"
 *     ]
 *     summary: Updates a user by user ID
 *     parameters:
 *      - name: userId
 *        in: path
 *        type: interger
 *        description: The ID of the requested user
 *     requestBody:
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *                required: true
 *                descriptions: The users first name
 *              secondName:
 *                type: string
 *                required: true
 *                descriptions: The users second name
 *              password:
 *                type: string
 *                required: true
 *                descriptions: The users password
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "userId": 1, "email": "kevin.mcdermott@unosquare.com", "firstName": "Kevin", "secondName": "McDermott", "password": "pa$$word" }, { "userId": 2, "email": "kevin.mcdermott@unosquare.com",  "firstName": "Kevy", "secondName": "McDermott", "password": "passw0rd" }]'
 *       204:
 *         description: No content
 */


module.exports = router;