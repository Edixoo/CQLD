const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoute');
const themeRoutes = require('./routes/themeRoute');
const wordRoutes = require('./routes/wordRoute');
const connectionRoutes = require('./routes/connectionRoute');
require('dotenv').config();


const app = express();

console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/themes', themeRoutes);
app.use('/api/words', wordRoutes);
app.use('/api/connections', connectionRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
