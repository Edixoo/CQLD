const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../controllers/functionNeeded')
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
router.get('/profile', authenticateToken.authenticateToken,userController.getProfile);

// Update profile of logged-in user
// This should also be protected by the same authentication middleware
router.put('/profile', userController.updateProfile);

// Delete the profile of the logged-in user
// This should be protected by the authentication middleware too
router.delete('/profile', userController.deleteUser);

// List all users (for admin use)
// This should be protected by some admin-check middleware to ensure the requester has admin rights
router.get('/all', userController.listUsers);

router.post('/sendMail', userController.sendMail);
router.post('/sendMailWithOTP', userController.sendMailWithOTP);

router.post('/updatePassword', userController.updatePassword)
router.post('/getOTP', userController.getOTP);


module.exports = router;
