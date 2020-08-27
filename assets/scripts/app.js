'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const authEvents = require('./auth/events');


$(() => {

  // We are making a single page app by storing all of our subviews in a single
  // index.html file. So we imagine that we have a pseudo-state machine and 
  // we must hide sections of the page depending upon which state we are.
  // The state machine is implemented in ???.
  $('#sign-up-page-form').hide();
  $('#sign-in-page-form').hide();

  // Handles the two buttons found on the home page to either create an account
  // or to sign into an existing account.
  $('#home-page-create-account-button').on('click', authEvents.onNavigateoToSignUpPage);
  $('#home-page-sign-in-button').on('click', authEvents.onNavigateToSignInPage);

  // This handles the button click on the create account page.
  $('#sign-up-page-form').on('submit', authEvents.onSignUp);

    // This handles the button click on the signin page.
  $('#sign-in-page-form').on('submit', authEvents.onSignIn);



})
