const { Router } = require("express");
const { body } = require("express-validator");
const validation = require("../utils/validation");
const { login } = require("../controllers/auth");

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: ["Auth"]
 *     summary: Login a user
 *     requestBody:
 *       content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               required: true
 *               description: The user's email
 *             password:
 *               type: string
 *               required: true
 *               description: The user's password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               message: "Login successful"
 *               user:
 *                 id: 1
 *                 email: "testemail@test.com"
 *                 forename: "John"
 *                 surname: "Doe"
 *                 nationalityId: 1
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Server error
 */
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  validation.validate,
  login
);

module.exports = router;
