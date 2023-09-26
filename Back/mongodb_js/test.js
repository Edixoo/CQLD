const mongoose = require('mongoose');
const User = require('./models/users'); // Import the User model
// If the user.js file is in another directory, adjust the path accordingly
console.log(User)
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/cqld?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
  console.log("Connected to the database");

  // Create a sample user
  const sampleUser = new User({
    name: 'John',
    surname: 'Doe',
    username: 'johndoe',
    password: 'securepassword',
    email: 'john.doe@example.com',
    role: 'admin',
    created_at: new Date(),
    last_login: new Date(),
  });

  try {
    await sampleUser.save();
    console.log('Sample user saved');
  } catch (error) {
    console.error('Error saving sample user:', error);
  }

  // Close the database connection when done.
  db.close();
});
