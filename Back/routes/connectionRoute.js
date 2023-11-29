const express = require('express');
const connectionController = require('../controllers/connectionController');  

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Connection:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              word1:
 *                  type: string
 *              word2:
 *                  type: string
 *              theme:
 *                  type: string
 *              description:
 *                  type: string
 *              proposed_by:
 *                  type: string
 *              approved:
 *                  type: boolean
 *              approved_by:
 *                  type: string
 *              created_at:
 *                  type: date
 *          required:
 *              - word1
 *              - word2
 *              - theme
 *              - description
 *              - proposed_by
 *              - approved
 *              - approved_by
 *              - created_at
 *      ConnectionList:
 *          type: array
 *          items:
 *              $ref: '#/schemas/Connection'
 *
 */


/**
 * @swagger
 * tags:
 *  name: Connections
 *  description: The connections managing API
 */

/**
 * @swagger
 * /api/connections:
 *  get:
 *      summary: Returns the list of all the connections
 *      tags: [Connections]
 *      responses:
 *          200:
 *              description: The list of the connections
 *              content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ConnectionList'
 *          500:
 *              description: Internal error
 */
router.get('/', connectionController.listConnections);

/**
 * @swagger
 * /api/connections:
 *  post:
 *     summary: Create a new connection
 *     tags: [Connections]
 *     requestBody:
 *         required: true
 *     content:
 *        application/json:
 *         schema:
 *             $ref: '#/components/schemas/Connection'
 *     responses:
 *      200:
 *          description: The connection has been created
 *          content:
 *             application/json:
 *                schema:
 *                   $ref: '#/components/schemas/Connection'
 *      500:
 *         description: Internal error
 */ 
router.post('/', connectionController.createConnection);

/**
 * @swagger
 * /api/connections/theme/{id}:
 *  get:
 *     summary: Returns the list of all the connections by theme
 *     tags: [Connections]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *            required: true
 *            description: The theme id
 *     responses:
 *        200:
 *           description: The list of the connections by theme
 *           content:
 *             application/json:
 *               schema:
 *                $ref: '#/components/schemas/ConnectionList'
 *        500:
 *          description: Internal error
 */
router.get('/theme/:id', connectionController.getConnectionByTheme);

/**
 * @swagger
 * /api/connections/approved:
 *  get:
 *    summary: Returns the list of all the connections approved
 *    tags: [Connections]
 *    responses:
 *       200:
 *         description: The list of the connections approved    
 *         content:
 *              application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ConnectionList'
 *       500:
 *        description: Internal error
 */
router.get('/approved', connectionController.getConnectionByApproved);

/**
 * @swagger
 * /api/connections/int/{id}:
 *  get:
 *    summary: Returns the list of all the connections by id
 *    tags: [Connections]
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: integer
 *          required: true
 *          description: The connection id
 *    responses:
 *      200:
 *       description: The list of the connections by id
 *       content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/ConnectionList'
 *      500:
 *          description: Internal error
 */
router.get('/int/:id', connectionController.getConnectionByIdInt)

/**
 * @swagger
 * /api/connections/{id}:
 *  get:
 *   summary: Returns the list of all the connections by id
 *   tags: [Connections]
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: string
 *        required: true
 *        description: The connection id
 *   responses:
 *     200:
 *      description: The list of the connections by id
 *      content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConnectionList'
 *     500:
 *      description: Internal error
 */
router.get('/:id', connectionController.getConnectionById);

/**
 * @swagger
 * /api/connections/{id}:
 *  put:
 *    summary: Update the connection by the id
 *    tags: [Connections]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *          type: string
 *          required: true
 *          description: The connection id
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *         schema:
 *          $ref: '#/components/schemas/Connection'
 *    responses:
 *     200:
 *      description: The connection has been updated
 *     content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Connection'
 *     500:
 *      description: Internal error
 */
router.put('/:id', connectionController.updateConnection);

/**
 * @swagger
 * /api/connections/{id}:
 *  delete:
 *   summary: Remove the connection by id
 *   tags: [Connections]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *          type: string
 *          required: true
 *          description: The connection id
 *   responses:
 *      200:
 *          description: The connection has been removed
 *      500:
 *         description: Internal error
 */
router.delete('/:id', connectionController.deleteConnection);

/**
 * @swagger
 * /api/connections/many:
 *  post:
 *    summary: Add many connections
 *    tags: [Connections]
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *         schema:
 *          $ref: '#/components/schemas/ConnectionList'
 *    responses:
 *     200:
 *      description: The connections has been added
 *     content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/ConnectionList'
 *     500:
 *      description: Internal error
 */
router.get('/list/:word', connectionController.getConnexionContainWord);

module.exports = router;
