const User = require('../models/userModel');
const bcrypt = require('bcrypt'); // Used for password comparison
const crypto = require('crypto');

// Register a new user
const decryptField = (combinedData, secretKey) => {
  // Extract IV and encrypted data
  const iv = Buffer.from(combinedData.slice(0, 32), 'hex');  // IV is 16 bytes, so 32 hex characters
  const encryptedData = combinedData.slice(32);

  const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);
  return decipher.update(encryptedData, 'hex', 'utf8') + decipher.final('utf8');
};

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

// Authenticate a user and return a token/session
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).send("Invalid username or password.");
    }
    // TODO: Generate and return a token/session here
    res.status(200).send({ message: "Login successful!" });
  } catch (error) {
    res.status(400).send(error.message);
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

