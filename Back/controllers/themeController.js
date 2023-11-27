const Theme = require('../models/themeModel');  // Adjust the path as needed
const bcrypt = require('bcrypt'); // Used for password comparison
const crypto = require('crypto');
const { stringify } = require('querystring');
// const bcrypt = require('bcrypt'); // Used for password comparison
// const crypto = require('crypto');
// const{ decryptField, encryptField} = require('../controllers/functionNeeded');
// const { stringify } = require('querystring');
const BASE_ERROR = "BACK ERROR"


exports.listThemes = async (req, res) => {
  try {
    const themes = await Theme.find();
    res.status(200).send(themes);

  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};

exports.createTheme = async (req, res) => {
  try {
    const theme = new Theme(req.body);
    await theme.save();
    res.status(201).send(theme);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};

exports.makeTheme = async (test) => {
  try {
    const theme = new Theme(test);
    await theme.save();
    res.status(200).send(theme);

  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getThemeById = async (req, res) => {
  try {
    const theme = await Theme.findById(req.params.id);
    if (!theme) {
      return res.status(504).send('Theme not found');
    }

    res.status(200).send(theme);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};

exports.getlistThemeContain = async (req, res) => {
  try {

    const listTheme = await Theme.find({ theme_name: { $regex: new RegExp(req.params.word, 'i') } });
    if (!listTheme) {
      return res.status(504).send('Theme not found');
    }

    res.status(200).send(listTheme);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};

exports.getThemeByName = async (req, res) => {
  try {
    const theme = await Theme.findOne({ theme_name: req.params.name });

    if (!theme) {
      return res.status(504).send('Theme not found');
    }

    res.status(200).send(theme);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};

exports.updateTheme = async (req, res) => {
  try {
    const theme = await Theme.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!theme) {
      return res.status(504).send('Theme not found');
    }
    res.status(200).send(theme);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};

exports.deleteTheme = async (req, res) => {
  try {
    const theme = await Theme.findByIdAndDelete(req.params.id);
    if (!theme) {
      return res.status(504).send('Theme not found');
    }
    res.status(200).send({ message: 'Theme deleted successfully!' });
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};

exports.addManyThemes = async (req, res) => {
  try {
    const themes = req.body;  // Assume an array of themes is passed in the request body
    const result = await Theme.insertMany(themes);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};




