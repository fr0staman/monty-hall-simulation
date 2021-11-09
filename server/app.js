const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config({path: './config/config.env'});

const app = express();
const PORT = process.env.PORT || 9443

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/api', require('./router/router'));

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
  } catch (err) {
    console.log(err);
  }
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
  );
}
// Start project
start();

// Connect to database
connectDB();