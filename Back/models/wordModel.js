const mongoose = require('mongoose');
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

module.exports = mongoose.model('Word', WordSchema);
