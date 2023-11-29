const express = require('express');
const wordController = require('../controllers/wordController');  
// const {authenticateToken} = require('../controllers/functionNeeded');

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Word:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              name:
 *                  type: string
 *              theme:
 *                  type: string
 *              description:
 *                  type: string
 *              created_at:
 *                  type: date
 *          required:
 *              - name
 *              - theme
 *              - description
 *              - created_at
 *      WordList:
 *          type: array
 *          items:
 *              $ref: '#/schemas/Word'
 *
 */

/**
 * @swagger
 * tags:
 *  name: Words
 *  description: The words managing API
 */


/**
 * @swagger
 * /api/words/name/{name}:
 *  get:
 *     summary: Returns the list of all the words
 *     tags: [Words]
 *     parameters:
 *     - in: path
 *       name: name
 *       schema:
 *        type: string
 *        required: true
 *        description: The word name 
 *     responses:
 *         200:
 *            description: The list of the words
 *            content:
 *               application/json:
 *                 schema:
 *                  $ref: '#/components/schemas/Word'
 *         404:
 *           description: The word was not found
 *         500:
 *          description: Internal error
 */
router.get('/name/:name' ,wordController.getWordByName);

/**
 * @swagger
 * /api/words/getAll:
 *  get:
 *      summary: Returns the list of all the words
 *      tags: [Words]
 *      responses:
 *          200:
 *              description: The list of the words
 *              content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/WordList'
 *          500:
 *              description: Internal error
 */
router.get('/getAll', wordController.listWords);

/**
 * @swagger
 * /api/words/theme:
 *  get:
 *      summary: Returns the list of all the words by theme
 *      tags: [Words]
 *      requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *               theme:
 *                type: string
 *      responses:
 *          200:
 *              description: The list of the words by theme
 *              content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/WordList'
 *          404:
 *              description: The theme was not found
 *          500:
 *              description: Internal error
 */
router.get('/theme',wordController.getWordsByTheme);

/**
 * @swagger
 * /api/words:
 *  post:
 *     summary: Create a new word
 *     tags: [Words]
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *             schema:
 *              $ref: '#/components/schemas/Word'
 *     responses:
 *      200:
 *          description: The word has been created
 *          content:
 *             application/json:
 *                schema:
 *                   $ref: '#/components/schemas/Word'
 *      500:
 *         description: Internal error
 */
router.post('/', wordController.createWord);

/**
 * @swagger
 * /api/words/{id}:
 *  get:
 *      summary: Get the word by id
 *      tags: [Words]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: The word id
 *      responses:
 *          200:
 *              description: The word description by id
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Word'
 *          404:
 *              description: The word was not found
 *          500:
 *              description: Internal error
 */
router.get('/:id', wordController.getWordById);

/**
 * @swagger
 * /api/words/{id}:
 *  put:
 *      summary: Update the word by the id
 *      tags: [Words]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: The word id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Word'
 *      responses:
 *          200:
 *              description: The word was updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Word'
 *          404:
 *              description: The word was not found
 *          500:
 *              description: Internal error
 */
router.put('/:id', wordController.updateWord);

/**
 * @swagger
 * /api/words/{id}:
 *  delete:
 *      summary: Remove the word by id
 *      tags: [Words]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: The word id
 *      responses:
 *          200:
 *              description: The word was removed
 *          404:
 *              description: The word was not found
 *          500:
 *              description: Internal error
 */
router.delete('/:id', wordController.deleteWord);

module.exports = router;
