'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const authEvents = require('./auth/events');


$(() => {

  // Handles the two buttons found on the home page to either create an account
  // or to sign into an existing account.
  $('#home-page-create-account-button').on('click', authEvents.onNavigateoToSignUpPage);
  $('#home-page-sign-in-button').on('click', authEvents.onNavigateToSignInPage);

})
