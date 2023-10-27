const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const {encryptField} = require('../controllers/functionNeeded');

require('dotenv').config();


const ConnectionSchema = new mongoose.Schema({
  word1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Word',
    required: true
  },
  word2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Word',
    required: true
  },
  proposed_by: {
    type: String,
    required: true
  },
  approved: {
    type: Boolean,
    default: false
  },
  approved_by: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Connection', ConnectionSchema);
