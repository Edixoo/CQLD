const mongoose = require('mongoose');
const faker = require('faker');
const User = require('./models/userModel');
const Theme = require('./models/themeModel');
const Word = require('./models/wordModel');
const Connection = require('./models/connectionModel');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const NUM_USERS = 100;
const NUM_THEMES = 100;
const NUM_WORDS = 100;
const NUM_CONNECTIONS = 100;

async function createUsers() {
  const users = Array.from({ length: NUM_USERS }).map(() => ({
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    role: faker.random.arrayElement(['admin', 'user']),
    created_at: faker.date.past(),
    last_login: faker.date.recent()
  }));

  await User.insertMany(users);
  console.log('Users populated');
}

async function createThemes() {
  const themes = Array.from({ length: NUM_THEMES }).map(() => ({
    theme_name: faker.random.word()
  }));

  await Theme.insertMany(themes);
  console.log('Themes populated');
}

async function createWords() {
  const themes = await Theme.find();
  const users = await User.find();

  const words = Array.from({ length: NUM_WORDS }).map(() => ({
    word: faker.lorem.word(),
    theme: faker.random.arrayElement(themes)._id,
    added_by: faker.random.arrayElement(users)._id,
    approved: faker.random.boolean(),
    created_at: faker.date.past()
  }));

  await Word.insertMany(words);
  console.log('Words populated');
}

async function createConnections() {
  const words = await Word.find();
  const users = await User.find();

  const connections = Array.from({ length: NUM_CONNECTIONS }).map(() => ({
    word1: faker.random.arrayElement(words)._id,
    word2: faker.random.arrayElement(words)._id,
    proposed_by: faker.random.arrayElement(users)._id,
    approved: faker.random.boolean(),
    approved_by: faker.random.arrayElement(users)._id,
    created_at: faker.date.past()
  }));

  await Connection.insertMany(connections);
  console.log('Connections populated');
}


async function generateData() {
  await createUsers();
  await createThemes();
  await createWords();
  await createConnections();

  mongoose.connection.close();
  console.log('Database population complete!');
}

generateData();
