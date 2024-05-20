const { Router } = require("express");
const validation = require("../utils/validation");
const { body } = require("express-validator")
const { getAll, createUser, updateUser, deleteUser, getSingle } = require("../controllers/users")
const router = Router();


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
 *              pattern: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
 *              format: email
 *              required: true
 *              description: The users email
 *            forename:
 *              type: string
 *              required: true
 *              description: The users forename
 *            surname:
 *              type: string
 *              required: true
 *              description: The users surname
 *            password:
 *              type: string
 *              required: true
 *              minLength: 8
 *              maxLength: 15
 *              description: The users password
 *              pattern: "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$"
 *            nationalityId:
 *              type: integer
 *              required: true
 *              description: The users nationality
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             example:
 *                 id: 1 
 *                 email: "testemail@test.com"
 *                 forename: "Testforename"
 *                 surname: "testsurname"
 *                 password: "pa$$word" 
 *                 nationality: "Irish" 
 *       400:
 *         description: Bad Request
 */
router.route("/").post(
  [
    body("email")
      .isLength({ min: 3 })
      .withMessage("the email must have minimum length of 3")
      .isEmail()
      .withMessage("the email must be in a valid email format")
      .trim(),
    body("forename")
      .isString()
      .isLength({ min: 3 })
      .withMessage("the forname must have minimum length of 3")
      .trim(),
    body("surname")
      .isString()
      .isLength({ min: 3 })
      .withMessage("the surname must have minimum length of 3")
      .trim(),
    body("password")
      .isLength({ min: 8, max: 15 })
      .withMessage("the password should have min and max length between 8-15")
      .matches(/\d/)
      .withMessage("the password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("the password should have at least one special character"),
  ],
  validation.validate,
  createUser
);

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
 *      - name: forename
 *        in: query
 *        type: string
 *        description: The filter for user forename
 *      - name: surname
 *        in: query
 *        type: string
 *        description: The filter for user surname
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               - id: 1 
 *                 email: "testemail@test.com"
 *                 forename: "Testforename"
 *                 surname: "testsurname"
 *                 password: "pa$$word" 
 *                 nationality: "Irish" 
 *               - id: 2, 
 *                 email: "test@test.com"  
 *                 forename: "test2fore" 
 *                 surname: "testSur" 
 *                 password: "passw0rd"
 *                 nationality: "Irish"
 *       204:
 *         description: No content
 */
router.route("/").get(getAll);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags: [
 *       "Users"
 *     ]
 *     summary: Returns a user by user ID
 *     parameters:
 *      - name: userId
 *        in: path
 *        type: int
 *        description: The filter for userId
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               - id: 1 
 *                 email: "testemail@test.com"
 *                 forename: "Testforename"
 *                 surname: "testsurname"
 *                 password: "pa$$word" 
 *                 nationality: "Irish" 
 *       404:
 *         description: Not Found
 */
router.route("/:userId(\\d+)").get(getSingle)

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
 *              email:
 *                type: string
 *                pattern: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
 *                format: email
 *                required: true
 *                descriptions: The users email
 *              forename:
 *                type: string
 *                required: true
 *                descriptions: The users forename
 *              surname:
 *                type: string
 *                required: true
 *                descriptions: The users surname
 *              password:
 *                type: string
 *                required: true
 *                minLength: 8
 *                maxLength: 15
 *                description: The users password
 *                pattern: "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$"
 *              nationalityId:
 *                type: integer
 *                required: true
 *                description: The users nationality
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               - id: 1 
 *                 email: "testemail@test.com"
 *                 forename: "Testforename"
 *                 surname: "testsurname"
 *                 password: "pa$$word" 
 *                 nationality: "Irish" 
 *       204:
 *         description: No content
 */
router.route("/:userId(\\d+)").put(
  [
    body("email")
      .isLength({ min: 3 })
      .withMessage("the email must have minimum length of 3")
      .isEmail()
      .withMessage("the email must be in a valid email format")
      .trim(),
    body("forename")
      .isString()
      .isLength({ min: 3 })
      .withMessage("the first_name must have minimum length of 3")
      .trim(),
    body("surname")
      .isString()
      .isLength({ min: 3 })
      .withMessage("the second_name must have minimum length of 3")
      .trim(),
    body("password")
      .isLength({ min: 8, max: 15 })
      .withMessage("the password should have min and max length between 8-15")
      .matches(/\d/)
      .withMessage("the password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("the password should have at least one special character"),
  ],
  validation.validate,
updateUser);

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     tags: [
 *       "Users"
 *     ]
 *     summary: Updates a user by user ID
 *     parameters:
 *      - name: userId
 *        in: path
 *        type: interger
 *        description: The ID of the requested user
 *     responses:
 *       204:
 *         description: No content
 */
router.route("/:userId(\\d+)").delete(
deleteUser);

module.exports = router;
