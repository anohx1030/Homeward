const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sessionController = require('./session/sessionController');
const cookieController = require('./util/cookieController');
const chronJobController = require('./util/chronJobController');
const twilioController = require('./util/twilioController');
const client = require('twilio')('AC5d6dabce4797b65a544edc775b8858bb', 'c0a502a6ef22603ce2c3d5cc18dba45f');
const userController = require('./user/userController');

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://homeward:homeward1234@ds037827.mlab.com:37827/homeward');
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use(express.static(path.join(__dirname, './../node_modules/')));
app.use(express.static(path.join(__dirname, './../client/')));
app.use(bodyParser());

app.use(cookieParser());

// Unauthorized routes
app.get('/login', )
app.get('/register', )


// request from client to Register User
app.post('/register', userController.createUser, cookieController.setSSIDCookie, sessionController.startSessionRegister);
// app.post('/createuser', userController.createUser);

/*
* Authorizer route
*/
// request from client to Login
app.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSessionLogin);


/**
* Authorized routes
*/
// request from client to Logout
app.post('/logout', sessionController.isLoggedIn, cookieController.removeSSIDCookie, sessionController.stopSession);
app.post('/createquery', userController.createQuery)//, add twilio middleware here to text query list

// sessionController.isLoggedIn (middleware to check if the user is logged in)
// to be called before all "Authorized" routes get and post requests



/*
* 404 - Page Not Found handler
*/
app.get('/*', function(req,res) {
  res.statusCode = 404;
  // TODO: Change how we choose to send the user to the page
  // res.render(__dirname + '/../views/pageNotFound.ejs', {});
});

app.post('/createquery', userController.createQuery)//, add twilio middleware here to text query list

app.listen(PORT, () => {
  console.log('Listening on port 3000');
});

/*
* Start the chronjob
*/
// chronJobController.scheduleJob();
