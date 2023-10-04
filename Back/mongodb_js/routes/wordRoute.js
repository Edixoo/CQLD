const express = require('express');
const wordController = require('../controllers/wordController');  

const router = express.Router();

router.get('/', wordController.listWords);
router.post('/', wordController.createWord);
router.get('/:id', wordController.getWordById);
router.put('/:id', wordController.updateWord);
router.delete('/:id', wordController.deleteWord);

module.exports = router;
