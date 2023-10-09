const Theme = require('../models/themeModel');  // Adjust the path as needed
const bcrypt = require('bcrypt'); // Used for password comparison
const crypto = require('crypto');
const{ decryptField} = require('../controllers/functionNeeded');


exports.listThemes = async (req, res) => {
  try {
    const themes = await Theme.find();
    const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');

    themes.forEach(theme => {
      theme.theme_name = decryptField(theme.theme_name, secretKey);
    });

    res.status(200).send(themes);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.createTheme = async (req, res) => {
  try {
    const theme = new Theme(req.body);
    await theme.save();
    res.status(201).send(theme);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getThemeById = async (req, res) => {
  try {
    const theme = await Theme.findById(req.params.id);
    if (!theme) {
      return res.status(404).send('Theme not found');
    }

    const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');
    theme.theme_name = decryptField(theme.theme_name, secretKey);

    res.status(200).send(theme);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updateTheme = async (req, res) => {
  try {
    const theme = await Theme.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!theme) {
      return res.status(404).send('Theme not found');
    }
    res.status(200).send(theme);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteTheme = async (req, res) => {
  try {
    const theme = await Theme.findByIdAndDelete(req.params.id);
    if (!theme) {
      return res.status(404).send('Theme not found');
    }
    res.status(200).send({ message: 'Theme deleted successfully!' });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.addManyThemes = async (req, res) => {
  try {
    const themes = req.body;  // Assume an array of themes is passed in the request body
    const result = await Theme.insertMany(themes);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
