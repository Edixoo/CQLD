const Theme = require('../models/themeModel');  // Adjust the path as needed
const bcrypt = require('bcrypt'); // Used for password comparison
const crypto = require('crypto');
const { stringify } = require('querystring');


exports.listThemes = async (req, res) => {
  try {
    const themes = await Theme.find();
    console.log("header" + stringify(req.headers));
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

exports.makeTheme = async (test) => {
  try {
    const theme = new Theme(test);
    await theme.save();

  } catch (error) {
    console.log(error.message)
  }
};

exports.getThemeById = async (req, res) => {
  try {
    const theme = await Theme.findById(req.params.id);
    if (!theme) {
      return res.status(404).send('Theme not found');
    }

    res.status(200).send(theme);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getlistThemeContain = async (req, res) => {
  try {
    const listTheme = await Theme.find({ theme_name: { $regex: new RegExp(req.params.word, 'i') } });
    if (!listTheme) {
      return res.status(404).send('Theme not found');
    }

    res.status(200).send(listTheme);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getThemeByName = async (req, res) => {
  try {
    const theme = await Theme.findOne({ theme_name: req.params.name });

    if (!theme) {
      return res.status(404).send('Theme not found');
    }

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

