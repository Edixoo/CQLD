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

ConnectionSchema.pre('save', function(next) {
  const connection = this;
  const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');
  connection.proposed_by = encryptField(connection.proposed_by.toString(), secretKey);
  if (connection.approved_by) {
    connection.approved_by = encryptField(connection.approved_by.toString(), secretKey);
  }
  next();
});

module.exports = mongoose.model('Connection', ConnectionSchema);
