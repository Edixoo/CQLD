const mongoose = require('mongoose');
const faker = require('faker');
const User = require('./models/userModel');
const Theme = require('./models/themeModel');
const Word = require('./models/wordModel');
// const Connection = require('./models/connectionModel');
const{ decryptField} = require('./controllers/functionNeeded');
const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');

const userController = require('./controllers/userController');
const connectionController = require('./controllers/connectionController');  
const themeController = require('./controllers/themeController');  
const wordController = require('./controllers/wordController');  

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
    last_login: faker.date.recent(), 
    otp_number : '0'
  }));

  for(let user of users){
    await userController.createUser(user);
  }


}

async function createThemes() {
  const themes = Array.from({ length: NUM_THEMES }).map(() => ({
    theme_name: faker.random.word()
  }));

  for(let theme of themes){
    await themeController.makeTheme(theme);
  }
}

async function createWords() {

  const themes = await Theme.find();
  const users = await User.find();

  const words = Array.from({ length: NUM_WORDS }).map(() => ({
    word: faker.lorem.word(),
    theme: faker.random.arrayElement(themes).theme_name,
    added_by: faker.random.arrayElement(users)._id,
    theme: faker.random.arrayElement(themes)._id,
    added_by: decryptField(faker.random.arrayElement(users).name,secretKey),
    approved: faker.datatype.boolean(),
    created_at: faker.date.past()
  }));
  for(let word of words){
    await wordController.makeWord(word);
  }
  const the_words = await Word.find();
  
}

async function createConnections() {
  const words = await Word.find();
  const users = await User.find();
  const connections = Array.from({ length: NUM_CONNECTIONS }).map(() => ({
    word1: faker.random.arrayElement(words).word,
    word2: faker.random.arrayElement(words).word,
    proposed_by: decryptField(faker.random.arrayElement(users).name,secretKey),
    approved: faker.datatype.boolean(),
    approved_by: decryptField(faker.random.arrayElement(users).name,secretKey),
    created_at: faker.date.past()
  }));

  for(let connection of connections){
    await connectionController.makeConnection(connection);
  }
}


async function generateData() {
  await createUsers();
  await createThemes();
  await createWords();
  await createConnections();

  mongoose.connection.close();
}

generateData();
