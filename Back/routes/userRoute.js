const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../controllers/functionNeeded')
const router = express.Router();

router.get('/hello', (req, res) => {
    res.send('hello');
});

/**
 * @swagger
 * components:
 *  schemas:
 *     User:
 *        type: object
 *        properties:
 *           email:
 *              type: string
 *           password:
 *              type: string
 *           name:
 *              type: string
 *           surname:
 *              type: string
 *           username:
 *              type: string
 *           role:
 *              type: string
 *           created_at:
 *              type: date
 *           last_login:
 *              type: date
 *           otp_number:
 *              type: string
 *        required:
 *         - email
 *         - password
 *         - name
 *         - surname
 *         - username
 *         - role
 *         - created_at
 *         - last_login
 *     UserList:
 *      type: array
 *      items:
 *          $ref: '#/schemas/User'
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The users managing API
 */

/**
 * @swagger
 * /api/users/register:
 *  post:
 *      summary: Register a new user
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: The user has been successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          500:
 *              description: Internal error
 */
router.post('/register', userController.register);


/**
 * @swagger
 * /api/users/login:
 *  post:
 *      summary: Login a user
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: The user has been successfully logged in
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          500:
 *              description: Internal error
 */
router.post('/login', userController.login);


/**
 * @swagger
 * /api/users/profile:
 *  get:
 *      summary: Get the profile of the logged-in user
 *      tags: [Users]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: The profile of the logged-in user
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          401:
 *              description: Unauthorized
 *          500:
 *              description: Internal error
 */
router.get('/profile', authenticateToken.authenticateToken,userController.getProfile);


/**
 * @swagger
 * /api/users/profile:
 *  put:
 *      summary: Update the profile of the logged-in user
 *      tags: [Users]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: The profile of the logged-in user has been updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          401:
 *              description: Unauthorized
 *          500:
 *              description: Internal error
 */
router.put('/profile', userController.updateProfile);


/**
 * @swagger
 * /api/users/profile:
 *  delete:
 *      summary: Delete the profile of the logged-in user
 *      tags: [Users]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: The profile of the logged-in user has been deleted
 *          401:
 *              description: Unauthorized
 *          500:
 *              description: Internal error
 */
router.delete('/profile', userController.deleteUser);

/**
 * @swagger
 * /api/users/all:
 *  get:
 *      summary: Returns the list of all the users
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: The list of the users
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserList'
 *          500:
 *              description: Internal error
 */
router.get('/all', userController.listUsers);


/** 
 * @swagger
 * /api/users/sendMail:
 *  post:
 *     summary: Send mail to user
 *     tags: [Users]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *          schema:
 *           type: object
 *           properties:
 *             email:
 *              type: string
 *             subject:
 *              type: string
 *             text:
 *              type: string
 *     responses:
 *      200:
 *         description: The mail has been sent
 *         content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                  message:
 *                      type: string
 *      500:
 *        description: Internal error
 */
router.post('/sendMail', userController.sendMail);

/**
 * @swagger
 * /api/users/sendMailWithOTP:
 *  post:
 *    summary: Send mail with OTP to user
 *    tags: [Users]
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *          schema:
 *              type: object
 *              properties:
 *                 email:
 *                  type: string
 *                 subject: 
 *                  type: string
 *                 text:
 *                  type: string
 *    responses:
 *      200:
 *       description: The mail has been sent
 *       content:
 *          application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                 type: string
 *      500:
 *          description: Internal error
 */
router.post('/sendMailWithOTP', userController.sendMailWithOTP);


/**
 * @swagger
 * /api/users/updatePassword:
 *  post:
 *    summary: Update password of user
 *    tags: [Users]
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *          schema:
 *              type: object
 *              properties:
 *                 email:
 *                  type: string
 *                 password:
 *                  type: string
 *                 otp_number:
 *                  type: string
 *    responses:
 *      200:
 *       description: The password has been updated
 *       content:
 *          application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                 type: string
 *      500:
 *          description: Internal error
 */
router.post('/updatePassword', userController.updatePassword)

/**
 * @swagger
 * /api/users/getOTP:
 *  post:
 *    summary: Get OTP of user
 *    tags: [Users]
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *          schema:
 *              type: object
 *              properties:
 *                 email:
 *                  type: string
 *    responses:
 *      200:
 *       description: The OTP has been sent
 *       content:
 *          application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                 type: string
 *      500:
 *          description: Internal error
 */
router.post('/getOTP', userController.getOTP);


module.exports = router;
