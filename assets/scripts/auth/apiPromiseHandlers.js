////////////////////////////////////////////////////////////////////////////////
// 
// ui.js
//
// This file handles all promises returned by jQuery ajax calls in api.js.
//
////////////////////////////////////////////////////////////////////////////////

'use strict'


const store = require('../store');


// Processes the success promise success result when a user creates an account.
const onSignUpSuccess = function(response) {

  $('#status-notification-message-area').text('You are now registered ' + response.user.email);
};

// Processes the success promise failure result when a user attempts to create an account.
const onSignUpFailure = function(response) {

    $('#status-notification-message-area').text('Registration failed. Please try again later.');
};


// Processes the success promise success result when a user creates an account.
const onSignInSuccess = function(response) {

  store.user = response.user;
  $('#status-notification-message-area').text('Welcome ' + response.user.email);
};

// Processes the success promise failure result when a user attempts to create an account.
const onSignInFailure = function(response) {

    $('#status-notification-message-area').text('Signin failed. Please try again later.');
  
};


module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure  
};