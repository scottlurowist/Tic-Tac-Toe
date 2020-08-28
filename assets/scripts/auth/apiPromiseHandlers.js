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

  $('#sign-in-page-form').hide();
  $('#game-options-page-form').show();  
};


// Processes the success promise failure result when a user attempts to create an account.
const onSignInFailure = function(response) {

    $('#status-notification-message-area').text('Signin failed. Please try again later.');
};


// Processes the success promise success result when a user changes their password.
const onChangePasswordSuccess = function(response) {

  $('#status-notification-message-area')
    .text('You have successfully changed your password ' + store.user.email);

  $('#change-password-page-form').hide();
  $('#game-options-page-form').show();    
};


// Processes the success promise failure result when a user attempts to change their
// password.
const onChangePasswordFailure = function(response) {

    $('#status-notification-message-area')
      .text('Password change failed. Please try again later.');
};


// Processes the success promise success result when a user creates a new game.
const onNewGameSuccess = function(response) {

  store.currentGame = response.game;

  $('#status-notification-message-area')
    .text('You have successfully created a new game ' + store.user.email);

  $('#game-options-page-form').hide(); 
  $('#new-game-page-form-div').show();   
};


// Processes the success promise failure result when a user attempts to 
// create a new game.
const onNewGameFailure = function(response) {

    $('#status-notification-message-area')
      .text('Your attempt to create a new game failed. Please try again later.');
};


// Processes the success promise success result when a user exits the application.
const onExitAppSuccess = function(response) {

  $('#status-notification-message-area')
    .text('You have exited the app ' + store.user.email);

  $('#sign-in-page-form').show();
  $('#sign-in-page-form').hide();
  $('#game-options-page-form').hide();    
};


// Processes the success promise failure result when a user attempts to exits the application.
const onExitAppFailure = function(response) {

    $('#status-notification-message-area')
      .text('Exiting the app failed. Please try again later.');
};


module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onNewGameSuccess,
  onNewGameFailure,
  onExitAppSuccess,
  onExitAppFailure  
};