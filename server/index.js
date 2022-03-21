const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.POST || 2105;
const route = require('./src/Routes');
const cors = require('cors')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// morgan debug log server 
const morgan = require('morgan')
app.use(morgan('combined'))

//Connect Database 
const db = require('./src/app/config');
db.connect("ecom-block-v2");


// app.use('/', (req,res) => res.send("Hello World"))

// //routes 
route(app);
app.listen(port, () => {
  console.log(`Ecommerce Blockchain app listening on port ${port}`)
})