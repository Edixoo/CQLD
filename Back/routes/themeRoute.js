const express = require('express');
const themeController = require('../controllers/themeController');  
const {authenticateToken} = require('../controllers/functionNeeded');

const router = express.Router();
// This is supposed to get all themes
router.get('/',themeController.listThemes);
router.get('/protected-endpoint', authenticateToken, (req, res) => {
    // This route is now protected, only accessible with a valid JWT
    res.json({ message: 'Access to protected data' });
});
router.post('/', themeController.createTheme);
router.get('/:id', themeController.getThemeById);
router.get('/name/:name', themeController.getThemeByName);
router.put('/:id', themeController.updateTheme);
router.delete('/:id', themeController.deleteTheme);

module.exports = router;
