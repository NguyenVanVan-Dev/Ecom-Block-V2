const express = require('express');
const app = express();
const db = require('./src/app/config');
const route = require('./src/Routes');
const cors = require('cors')
const morgan = require('morgan');
require('dotenv').config();

const port = process.env.POST || 2105;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// morgan debug log server 
app.use(morgan('combined'))

//Connect Database 
// db.connect("ecom-block-v2");
db.connect("ecommerce-blockchain");

// //routes 
route(app);
app.listen(port, () => {
  console.log(`Ecommerce Blockchain app listening on port ${port}`)
})