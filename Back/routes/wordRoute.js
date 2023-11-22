const express = require('express');
const wordController = require('../controllers/wordController');  
const {authenticateToken} = require('../controllers/functionNeeded');

const router = express.Router();

router.get('/name/:name' ,wordController.getWordByName);
router.get('/getAll', wordController.listWords);
router.get('/theme',wordController.getWordsByTheme);
router.post('/', wordController.createWord);
router.get('/:id', wordController.getWordById);
router.put('/:id', wordController.updateWord);
router.delete('/:id', wordController.deleteWord);

module.exports = router;
