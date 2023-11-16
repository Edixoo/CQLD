const Word = require('../models/wordModel');  // Adjust the path as needed
const bcrypt = require('bcrypt'); // Used for password comparison
const crypto = require('crypto');
const{ decryptField} = require('../controllers/functionNeeded');


exports.listWords = async (req, res) => {
  try {
    const words = await Word.find().populate('theme');


    words.forEach(word => {
      word.word = decryptField(word.word, secretKey);
      word.added_by = decryptField(word.added_by, secretKey);
    });

    res.status(200).send(words);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.createWord = async (req, res) => {
  try {
    const word = new Word(req.body);
    await word.save();
    res.status(201).send(word);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.makeWord = async (test) => {
  try {
    const word = new Word(test);
    await word.save();
  } catch (error) {
  }
};

exports.getWordById = async (req, res) => {
  try {
    const word = await Word.findById(req.params.id).populate('theme');
    if (!word) {
      return res.status(404).send('Word not found');
    }

    const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');
    word.word = decryptField(word.word, secretKey);
    word.added_by = decryptField(word.added_by, secretKey);

    res.status(200).send(word);
  } catch (error) {
    res.status(400).send(error.message);
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
    const words = req.body;  // Assume an array of words is passed in the request body
    const result = await Word.insertMany(words);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
