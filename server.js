/* ********************
 * Require Statements
 * *******************/
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDb = require('./db/database');
const cors = require('cors');

/* ********************
 * App Config
 * *******************/
const app = express();
const port = process.env.PORT || 3000;

/* ********************
 * Middleware
 * *******************/
app
  // Parse incoming JSON requests
  .use(bodyParser.json())

  //Set global headers
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS',
    );
    next();
  })
  // Allow CORS for HTTP methods
  .use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    origin: '*'
  }));

/* ********************
 * Router
 * *******************/
app.use('/', require('./routes'));

/* *************************
 * Start server
 * *************************/
connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Connected to mongodb and server is running on http://localhost:${port}`);
  });
});