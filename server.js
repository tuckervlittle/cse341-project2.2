/* *************************
 * Require Statements
 * *************************/
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const connectDb = require('./db/database');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

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
  .use(bodyParser.json())

  // Session middleware (for login)
  .use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  }
  }))

  // Initialize Passport for authentication
  .use(passport.initialize())

  // Allow passport to use express-session
  .use(passport.session())
  
  // Set global headers
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
  }))

  // For main router
  .use('/', require('./routes'));

/* *************************
 * Passport GitHub Strategy
 * *************************/
// GitHub OAuth login
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
    function (accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(null, profile);
      // });
    }
  ));

// Save user data to session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Get user data from session
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

/* *************************
 * Routes
 * *************************/
// Home route
app.get('/', (req, res) => {
  res.send(req.session.user !== undefined ? `logged in as ${req.session.user.displayName}` : "Logged Out")
});

// OAuth callback route
app.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/api-docs' }),
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