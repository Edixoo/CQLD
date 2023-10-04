const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/hello', (req, res) => {
    res.send('hello');
});

// User registration
router.post('/register', userController.register);

// User login
router.post('/login', userController.login);

// Get profile of logged-in user
// This should be protected by some authentication middleware to ensure the user is logged in
router.get('/profile', userController.getProfile);

// Update profile of logged-in user
// This should also be protected by the same authentication middleware
router.put('/profile', userController.updateProfile);

// Delete the profile of the logged-in user
// This should be protected by the authentication middleware too
router.delete('/profile', userController.deleteUser);

// List all users (for admin use)
// This should be protected by some admin-check middleware to ensure the requester has admin rights
router.get('/all', userController.listUsers);

module.exports = router;
