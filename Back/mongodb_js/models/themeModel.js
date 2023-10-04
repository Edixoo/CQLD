const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const {encryptField} = require('../controllers/functionNeeded');

require('dotenv').config();

const ThemeSchema = new mongoose.Schema({
  theme_name: {
    type: String,
    required: [true, 'Theme name is required'],
    trim: true,
    unique: true
  }
});

ThemeSchema.pre('save', function(next) {
  const theme = this;
  const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');
  theme.theme_name = encryptField(theme.theme_name, secretKey);
  next();
});

module.exports = mongoose.model('Theme', ThemeSchema);
