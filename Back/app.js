const express = require('express');
const cors = require('cors');
// const nodemailer = require('nodemailer');

const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoute');
const themeRoutes = require('./routes/themeRoute');
const wordRoutes = require('./routes/wordRoute');
const connectionRoutes = require('./routes/connectionRoute');
const healthRoutes = require('./routes/healthRoute')
const SwaggerJSdoc = require('swagger-jsdoc');
const SwaggerUI = require('swagger-ui-express');
require('dotenv').config();


const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.1.0',
    info: {
      title: 'CQLD API',
      version: '1.0.0'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000'
    }
  ],
  apis: ['./routes/*.js']
};

const swaggerDocs = SwaggerJSdoc(swaggerOptions);

const app = express();


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use(cors());
app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(swaggerDocs));
app.use('/health', healthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/themes', themeRoutes);
app.use('/api/words', wordRoutes);
app.use('/api/connections', connectionRoutes);




app.listen(process.env.PORT || 80, () => {
  
});
