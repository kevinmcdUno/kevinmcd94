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
 *      - name: first_name
 *        in: query
 *        type: string
 *        description: The filter for user first name
 *      - name: second_name
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
 *                 value: '[{ "user_id": 1, "email": "kevin.mcdermott@unosquare.com", "first_name": "Kevin", "second_name": "McDermott", "password": "pa$$word", "nationality": "Irish" }, { "user_id": 2, "email": "kevin.mcdermott@unosquare.com", "first_name": "Kevy", "second_name": "McDermott", "password": "passw0rd", "nationality": "Irish" }]'
 *       204:
 *         description: No content
 */
router.route("/").get((req, res) => res.send('Hello World'))

/**
 * @swagger
 * /users/{user_id}:
 *   get:
 *     tags: [
 *       "Users"
 *     ]
 *     summary: Returns a user by user ID
 *     parameters:
 *      - name: first_name
 *        in: query
 *        type: string
 *        description: The filter for user first name
 *      - name: second_name
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
 *                 value: '[{ "user_id": 1, "email": "kevin.mcdermott@unosquare.com", "first_name": "Kevin", "second_name": "McDermott", "password": "pa$$word", "nationality": "Irish" }, { "user_id": 2, "email": "kevin.mcdermott@unosquare.com",  "first_name": "Kevy", "second_name": "McDermott", "password": "passw0rd", "nationality": "Irish" }]'
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
 *        email:
 *          type: string
 *          required: true
 *          description: The users email
 *        first_name:
 *          type: string
 *          required: true
 *          description: The users first name
 *        second_name:
 *          type: string
 *          required: true
 *          description: The users second name
 *        password:
 *          type: string
 *          required: true
 *          description: The users password
 *       nationality:
 *          type: string
 *          required: true
 *          description: The users nationality
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "user_id": 1, "email": "kevin.mcdermott@unosquare.com", "first_name": "Kevin", "second_name": "McDermott", "password": "pa$$word", "nationality": "Irish" }, { "user_id": 2, "email": "kevin.mcdermott@unosquare.com", "first_name": "Kevy", "second_name": "McDermott", "password": "passw0rd", "nationality": "Irish" }]'
 *       204:
 *         description: No content
 */

/**
 * @swagger
 * /users/{user_id}:
 *   put:
 *     tags: [
 *       "Users"
 *     ]
 *     summary: Updates a user by user ID
 *     parameters:
 *      - name: user_id
 *        in: path
 *        type: interger
 *        description: The ID of the requested user
 *     requestBody:
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              first_name:
 *                type: string
 *                required: true
 *                descriptions: The users first name
 *              second_name:
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
 *                 value: '[{ "user_id": 1, "email": "kevin.mcdermott@unosquare.com", "first_name": "Kevin", "second_name": "McDermott", "password": "pa$$word" }, { "user_id": 2, "email": "kevin.mcdermott@unosquare.com",  "first_name": "Kevy", "second_name": "McDermott", "password": "passw0rd" }]'
 *       204:
 *         description: No content
 */


module.exports = router;