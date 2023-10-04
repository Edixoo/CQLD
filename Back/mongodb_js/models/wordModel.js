const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const {encryptField} = require('../controllers/functionNeeded');

require('dotenv').config();

const WordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    trim: true
  },
  theme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theme'
  },
  added_by: {
    type: String,
    required: true
  },
  approved: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

WordSchema.pre('save', function(next) {
  const word = this;
  const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');
  word.word = encryptField(word.word, secretKey);
  word.added_by = encryptField(word.added_by.toString(), secretKey); // Convert ObjectId to string before encryption
  next();
});

module.exports = mongoose.model('Word', WordSchema);
