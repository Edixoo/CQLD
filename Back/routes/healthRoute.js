const express = require('express');
const router = express.Router();

// Example in an Express.js route file
router.get('/', (req, res) => {
    res.status(200).send('API is running');
  });
  
module.exports = router;