const Word = require('../models/wordModel');  // Adjust the path as needed
const Theme = require('../models/themeModel');  // Adjust the path as needed
<<<<<<< Updated upstream

const bcrypt = require('bcrypt'); // Used for password comparison
const crypto = require('crypto');

=======
// const bcrypt = require('bcrypt'); // Used for password comparison
// const crypto = require('crypto');
// const{ decryptField} = require('../controllers/functionNeeded');
const BASE_ERROR = "BACK ERROR";
>>>>>>> Stashed changes

exports.listWords = async (req, res) => {
  try {
    const words = await Word.find().populate('theme');
    res.status(200).send(words);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};

exports.createWord = async (req, res) => {
  try {
    const word = new Word(req.body);

    const existingWord = await Word.findOne({ word: req.body.word });
    if (existingWord) {
      console.log("Word Existing")
    }
    else {
      await word.save();

    }
    res.status(201).send(word);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};

exports.makeWord = async (test) => {
  try {
    const word = new Word(test);
    const existingWord = await Word.findOne({ $or: [word] });
    if (existingWord) {
      console.log("Word Existing")
    }
    await word.save();
  } catch (error) {
  }
};

exports.getWordById = async (req, res) => {
<<<<<<< Updated upstream
=======
  // try {
  //   const word = await Word.findById(req.params.id).populate('theme');
  //   if (!word) {
  //     return res.status(404).send('Word not found');
  //   }

  //   const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');
  //   word.word = decryptField(word.word, secretKey);
  //   word.added_by = decryptField(word.added_by, secretKey);

  //   res.status(200).send(word);
  // } catch (error) {
  //   res.status(500).send(BASE_ERROR);
  // }

>>>>>>> Stashed changes
   try { 
    const word = await Word.findOne({ _id: req.params.id });

    if (!word) {
      return res.status(404).send('Word not found');
    }

    res.status(200).send(word);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
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
    res.status(500).send(BASE_ERROR);
  }
};

exports.getWordsByTheme = async (req, res) => {
  try {
    const themeName = req.body.theme;
    const theme_id = (await Theme.findOne({theme_name: themeName}))._id;

    if (!Word.find({ theme: theme_id })) {
      return res.status(500).send('Invalid theme ID');
    }
    const words = await Word.find({ theme: theme_id });

    res.status(200).send(words);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
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
    res.status(500).send(BASE_ERROR);
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
    res.status(500).send(BASE_ERROR);
  }
};

exports.addManyWords = async (req, res) => {
  try {
    const words = req.body;  
    const result = await Word.insertMany(words);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};
