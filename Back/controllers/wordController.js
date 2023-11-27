const Word = require('../models/wordModel');  // Adjust the path as needed
const Theme = require('../models/themeModel');  // Adjust the path as needed

const bcrypt = require('bcrypt'); // Used for password comparison
const crypto = require('crypto');


exports.listWords = async (req, res) => {
  try {
    const words = await Word.find().populate('theme');
    res.status(200).send(words);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.createWord = async (req, res) => {
  try {
    const word = new Word(req.body);

    const existingWord = await Word.findOne({ word: req.body.word });
    if (existingWord) {
      res.status(400).send(error.message);
    }
    else {
      await word.save();

    }
    res.status(201).send(word);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.makeWord = async (test) => {
  try {
    const word = new Word(test);
    const existingWord = await Word.findOne({ $or: [word] });
    if (existingWord) {
      res.status(400).send(error.message);
    }
    await word.save();
  } catch (error) {
  }
};

exports.getWordById = async (req, res) => {
   try { 
    const word = await Word.findOne({ _id: req.params.id });

    if (!word) {
      return res.status(404).send('Word not found');
    }

    res.status(200).send(word);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


exports.getWordByName = async (req, res) => {
  try {
    const word = await Word.findOne({ word: req.params.name });

    if (!word) {
      return res.status(404).send('Word not found');
    }

    res.status(200).send(word);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getWordsByTheme = async (req, res) => {
  try {
    const themeName = req.body.theme;
    const theme_id = (await Theme.findOne({theme_name: themeName}))._id;

    if (!Word.find({ theme: theme_id })) {
      return res.status(400).send('Invalid theme ID');
    }
    const words = await Word.find({ theme: theme_id });

    res.status(200).send(words);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateWord = async (req, res) => {
  try {
    const word = await Word.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!word) {
      return res.status(404).send('Word not found');
    }
    res.status(200).send(word);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteWord = async (req, res) => {
  try {
    const word = await Word.findByIdAndDelete(req.params.id);
    if (!word) {
      return res.status(404).send('Word not found');
    }
    res.status(200).send({ message: 'Word deleted successfully!' });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.addManyWords = async (req, res) => {
  try {
    const words = req.body;  
    const result = await Word.insertMany(words);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
