/* *************************
 * Require Statements
 * *************************/
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDb = require('./db/database');
const cors = require('cors');
const passport = require('./middleware/passport');
const session = require('express-session');

/* *************************
 * App Config
 * *************************/
const app = express();
const port = process.env.PORT || 3000;

/* *************************
 * Middleware
 * *************************/
app
  // Parse incoming JSON requests
  .use(express.json())
  .use(express.urlencoded({extended: true}))

  // Allow CORS for HTTP methods and allow credentials
  .use(cors())

  // Session middleware (for login)
  .use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }))

  // Initialize Passport for authentication
  .use(passport.initialize())

  // Allow passport to use express-session
  .use(passport.session())


  /* *************************
  * Routes
  * *************************/
// For main router
.use('/', require('./routes'));

// Home route
app.get('/', (req, res) => {
  res.send(req.session.user !== undefined ? `logged in as ${req.session.user.displayName}` : "Logged Out")
});

// OAuth callback route
app.get('/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api-docs',
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  });

/* *************************
 * Start server
 * *************************/
connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Connected to mongodb and server is running on http://localhost:${port}`);
  });
});