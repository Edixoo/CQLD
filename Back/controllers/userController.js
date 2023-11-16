const User = require('../models/userModel');
const bcrypt = require('bcrypt'); // Used for password comparison
const crypto = require('crypto');
const{ decryptField} = require('../controllers/functionNeeded');
const jwt = require('jsonwebtoken');
const { stringify } = require('querystring');

// Register a new user


exports.register = async (req, res) => {
  try {
    const { name, surname, username, password, email, role } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).send("User with the given username or email already exists.");
    }
    const user = new User({ name, surname, username, password, email, role });
    await user.save();
    res.status(201).send({ message: "User registered successfully!", user_id: user._id });
  } catch (error) {
    res.status(400).send(error.message);
    console.log("toto");
  }
};

exports.createUser = async (test) => {
  try {
    const { name, surname, username, password, email, role } = test;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      console.log("user Existing")
    }
    const user = new User({ name, surname, username, password, email, role });
    await user.save();
  } catch (error) {
    console.log("toto");
  }
};

// Authenticate a user and return a token/session
exports.login = async (req, res) => {
  try {

    const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');
    // Encrypt the incoming username using the same method and key as when it was originally encrypted
    //const encryptedUsername = encryptField(req.body.username, secretKey);
    //console.log(encryptedUsername)
    // Retrieve the user by the encrypted username
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ message: 'Login failed: User not found.' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    console.log(isMatch)  
    if (!isMatch) {
      return res.status(401).json({ message: 'Login failed: Incorrect password.' });
    }

    // User authenticated, generate a JWT
    const token = jwt.sign(
      { userId: user._id, username: req.body.username, role: user.role}, // Use the plain username in the token payload
      secretKey,
      { expiresIn: '1h' } // Token expiry
    );

    // Respond with the JWT and potentially the username if needed
    res.json({ token, username: req.body.username }); // Do not send encryptedUsername to the client
  } catch (error) {
    res.status(500).json({ message: 'Server error during the login process.' });
  }
};

// Get profile of a user
exports.getProfile = async (req, res) => {
  try {
    // Assuming user's ID is available in req.userId (middleware might set this)
    const user = await User.findById(req.userId).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Fetch the secret key from the environment variable
    const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');

    // Decrypting the fields
    user.name = decryptField(user.name, secretKey);
    user.surname = decryptField(user.surname, secretKey);
    user.username = decryptField(user.username, secretKey);
    user.email = decryptField(user.email, secretKey);
    // Add other fields to decrypt as necessary

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Update a user's profile
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body; // Get updates from request
    const user = await User.findByIdAndUpdate(req.userId, updates, { new: true });
    if (!user) {
      return res.status(404).send("User not found.");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.userId);
    if (!user) {
      return res.status(404).send("User not found.");
    }
    res.status(200).send({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// List all users (for admin use)
exports.listUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Fetch all users excluding passwords

    // Fetch the secret key from the environment variable
    const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');

    // Decrypt the fields for each user
    users.forEach(user => {
      user.name = decryptField(user.name, secretKey);
      user.surname = decryptField(user.surname, secretKey);
      user.username = decryptField(user.username, secretKey);
      user.email = decryptField(user.email, secretKey);
      // Add other fields to decrypt as necessary
    });

    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.addManyUsers = async (req, res) => {
  try {
    const users = req.body;  // Assume an array of users is passed in the request body
    const result = await User.insertMany(users);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

