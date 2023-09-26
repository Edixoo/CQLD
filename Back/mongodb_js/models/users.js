// Imports
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  surname: {
    type: String,
    required: [true, 'Surname is required'],
    trim: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /.+@.+\..+/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    },
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['admin', 'user'],
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  last_login: {
    type: Date,
    required: true,
    default: Date.now,
  }
});

// Encrypt user information other than password
const encryptField = (field, secretKey, iv) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
    return cipher.update(field, 'utf8', 'hex') + cipher.final('hex');
  };
  
  UserSchema.pre('save', function(next) {
    const user = this;
    // Replace 'encryptionkey' with the actual secret key of 32 bytes (256 bits)
    const secretKey = crypto.randomBytes(32); 
    // Initialization vector of 16 bytes (128 bits)
    const iv = crypto.randomBytes(16);
  
    user.name = encryptField(user.name, secretKey, iv);
    user.surname = encryptField(user.surname, secretKey, iv);
    user.username = encryptField(user.username, secretKey, iv);
    user.email = encryptField(user.email, secretKey, iv);
  
    next();
  });
  
  // Hash the password
  UserSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
  
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
  
  module.exports = mongoose.model('User', UserSchema);