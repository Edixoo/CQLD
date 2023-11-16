const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const {encryptField} = require('../controllers/functionNeeded');

require('dotenv').config();

const ThemeSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  theme_name: {
    type: String,
    required: [true, 'Theme name is required'],
    trim: true,
    unique: true
  }
});

ThemeSchema.pre('save', async function (next) {
  if (!this.id) {
    // Si l'id n'est pas déjà défini
    const count = await mongoose.model('Theme').countDocuments().exec();
    this.id = count; // Attribue la position comme id
  }
  next();
});

module.exports = mongoose.model('Theme', ThemeSchema);
