const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const {encryptField} = require('../controllers/functionNeeded');

require('dotenv').config();


const ConnectionSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
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
  theme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theme',
    required: true
  },
  description:{
    type: String,
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

ConnectionSchema.pre('save', async function (next) {
  if (!this.id) {
    // Si l'id n'est pas déjà défini
    const count = await mongoose.model('Connection').countDocuments();
    this.id = count; // Attribue la position comme id
  }
  next();
});

module.exports = mongoose.model('Connection', ConnectionSchema);
