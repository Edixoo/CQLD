const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const themeRoutes = require('./routes/themeRoutes');
const wordRoutes = require('./routes/wordRoutes');
const connectionRoutes = require('./routes/connectionRoutes');

const app = express();

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
