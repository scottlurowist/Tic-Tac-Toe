////////////////////////////////////////////////////////////////////////////////
// 
// apiPromiseHandlers.js
//
// This file handles all promises returned by jQuery ajax calls in api.js.
//
////////////////////////////////////////////////////////////////////////////////

'use strict'


const store = require('../store');


// Processes the success promise success result when a user creates an account.
const onSignUpSuccess = response => {

  $('#status-notification-message-area').text('You are now registered ' +
    response.user.email);

  $('#sign-up-page-form').hide();
  $('#sign-in-page-form').show();
};


// Processes the success promise failure result when a user attempts
// to create an account.
const onSignUpFailure = response => {

    $('#status-notification-message-area')
      .text('Registration failed. Please try again later.');
};


// Processes the success promise success result when a user creates an account.
const onSignInSuccess = response => {

  // Save the token among other things.
  store.user = response.user;

  $('#status-notification-message-area').text('Welcome ' + response.user.email);

  $('#sign-in-page-form').hide();
  $('#game-options-page-form').show();  
};


// Processes the success promise failure result when a user attempts
// to create an account.
const onSignInFailure = response => {

    $('#status-notification-message-area')
      .text('Signin failed. Please try again later.');
};


// Processes the success promise success result when a user changes their password.
const onChangePasswordSuccess = response => {

  $('#status-notification-message-area')
    .text('You have successfully changed your password ' +
       store.user.email);

  $('#change-password-page-form').hide();
  $('#game-options-page-form').show();    
};


// Processes the success promise failure result when a user attempts
// to change their password.
const onChangePasswordFailure = response => {

    $('#status-notification-message-area')
      .text('Password change failed. Please try again later.');
};


// Processes the success promise success result when a user creates a new game.
const onNewGameSuccess = response => {

  store.currentGame = response.game;

  $('#status-notification-message-area')
    .text('You have successfully created a new game ' + store.user.email);

  $('#game-options-page-form').hide(); 
  $('#new-game-page-form-div').show();   
};


// Processes the success promise failure result when a user attempts to 
// create a new game.
const onNewGameFailure = response => {

    $('#status-notification-message-area')
      .text('Your attempt to create a new game failed. Please try again later.');
};


// Processes the success promise success result when a user exits the application.
const onExitAppSuccess = response => {

  $('#status-notification-message-area')
    .text('You have exited the app ' + store.user.email);

  $('#sign-in-page-form').show();
  $('#sign-in-page-form').hide();
  $('#game-options-page-form').hide();    
};


// Processes the success promise failure result when a user attempts to
// exit the application.
const onExitAppFailure = response => {

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