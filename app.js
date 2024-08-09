const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routerUser = require('./routes/user')

dotenv.config();

// create Database IBOS
mongoose.connect(process.env.MONGO_URI)
.catch(() => console.log('error Connection Failed'));



const app = express();

// using middleware
app.use(express.json())

app.use('/', routerUser);


//run server
const port = process.env.PORT || 8000;
app.listen(port, 'localhost', ()=> console.log('server run on port ' + port));