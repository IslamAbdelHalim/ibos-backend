const express = require('express');
const mongoose = require('mongoose');


// create Database IBOS
mongoose.connect('mongodb://localhost/ibosDB')
.catch(() => console.log('error Connection Failed'));



const app = express();

// using middleware
app.use(express.json())




//run server
app.listen(5000, '127.0.0.1');