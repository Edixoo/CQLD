const express = require('express');
const themeController = require('../controllers/themeController');  

const router = express.Router();

router.get('/', themeController.listThemes);
router.post('/', themeController.createTheme);
router.get('/:id', themeController.getThemeById);
router.put('/:id', themeController.updateTheme);
router.delete('/:id', themeController.deleteTheme);

module.exports = router;
