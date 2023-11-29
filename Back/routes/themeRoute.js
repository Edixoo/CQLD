const express = require('express');
const themeController = require('../controllers/themeController');  
const {authenticateToken} = require('../controllers/functionNeeded');

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *     Theme:
 *         type: object
 *         properties:
 *            id:
 *               type: integer
 *            name:
 *              type: string
 *         required:
 *           - name
 *     ThemeList:
 *        type: array
 *        items:
 *          $ref: '#/schemas/Theme'
 */

/**
 * @swagger
 * tags:
 *  name: Themes
 *  description: The themes managing API
 */


/**
 * @swagger
 * /api/themes:
 *  get:
 *      summary: Returns the list of all the themes
 *      tags: [Themes]
 *      responses:
 *          200:
 *              description: The list of the themes
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ThemeList'
 *          500:
 *              description: Internal error
 */
router.get('/',themeController.listThemes);

router.get('/protected-endpoint', authenticateToken, (req, res) => {
    // This route is now protected, only accessible with a valid JWT
    res.json({ message: 'Access to protected data' });
});

/**
 * @swagger
 * /api/themes:
 *  post:
 *    summary: Create a new theme
 *    tags: [Themes]
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *           $ref: '#/components/schemas/Theme'
 *    responses:
 *     200:
 *       description: The theme has been created
 *       content:
 *        application/json:
 *         schema:
 *          $ref: '#/components/schemas/Theme'
 *     500:
 *       description: Internal error
 */ 
router.post('/', themeController.createTheme);


/**
 * @swagger
 * /api/themes/{id}:
 *  get:
 *      summary: Get the theme by id
 *      tags: [Themes]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: The theme id
 *      responses:
 *          200:
 *              description: The theme description by id
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Theme'
 *          404:
 *              description: The theme was not found
 *          500:
 *              description: Internal error
 */
router.get('/:id', themeController.getThemeById);


/**
 * @swagger
 * /api/themes/list/{word}:
 *  get:
 *      summary: Get the list of themes that contain the word
 *      tags: [Themes]
 *      parameters:
 *        - in: path
 *          name: word
 *          schema:
 *              type: string
 *          required: true
 *          description: The word
 *      responses:
 *          200:
 *              description: The list of themes that contain the word
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ThemeList'
 *          404:
 *              description: The theme was not found
 *          500:
 *              description: Internal error
 */
router.get('/list/:word', themeController.getlistThemeContain);


/**
 * @swagger
 * /api/themes/name/{name}:
 *  get:
 *      summary: Get the theme by name
 *      tags: [Themes]
 *      parameters:
 *        - in: path
 *          name: name
 *          schema:
 *              type: string
 *          required: true
 *          description: The theme name
 *      responses:
 *          200:
 *              description: The theme description by name
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Theme'
 *          404:
 *              description: The theme was not found
 *          500:
 *              description: Internal error
 */
router.get('/name/:name', themeController.getThemeByName);


/**
 * @swagger
 * /api/themes/{id}:
 *  put:
 *      summary: Update the theme by the id
 *      tags: [Themes]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: The theme id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Theme'
 *      responses:
 *          200:
 *              description: The theme was updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Theme'
 *          404:
 *              description: The theme was not found
 *          500:
 *              description: Internal error
 */
router.put('/:id', themeController.updateTheme);


/**
 * @swagger
 * /api/themes/{id}:
 *  delete:
 *      summary: Remove the theme by id
 *      tags: [Themes]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: The theme id
 *      responses:
 *          200:
 *              description: The theme was deleted
 *          404:
 *              description: The theme was not found
 *          500:
 *              description: Internal error
 */
router.delete('/:id', themeController.deleteTheme);

module.exports = router;
