const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes/index');

dotenv.config();
const app = express();


const host = process.env.DB_HOST || 'localhost';
const database = process.env.DB_DATABASE || 'ibosDB';
const port = process.env.PORT || 5000;
const url = `mongodb://${host}/${database}`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to Database: ${url}`))
  .catch(err => console.log('Error: Connection Failed', err));


app.use(express.json());
app.use('/', routes);

// Run server
app.listen(port, () => console.log(`Server Started on port ${port}`));
