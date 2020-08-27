////////////////////////////////////////////////////////////////////////////////
// 
// events.js
//
// This file handles events raised in the app.js file which is the entry
// point for the application.
//
////////////////////////////////////////////////////////////////////////////////


const getFormFields = require('./../../../lib/get-form-fields');
const api = require('./api');
const ui = require('./apiPromiseHandlers');


// Hadn
const onNavigateoToSignUpPage = event => {

    // Our pseudo-state machine toggles views from the home page
    // to the create account page.
    $('#home-page').hide();
    $('#sign-up-page-form').show();
}


const onNavigateToSignInPage = event => {
 
    // Our pseudo-state machine toggles views from the home page
    // to the create account page.
    $('#home-page').hide();
    $('#sign-in-page-form').show();
}


const onSignUp = event => {

    event.preventDefault();

    const form = event.target;

    // send data in AJAX request to the API
    api.signUp(getFormFields(form))

      .then(ui.onSignUpSuccess)
      .catch(ui.onSignUpFailure);
}


const onSignIn = event => {

    event.preventDefault();

    const form = event.target;

    // send data in AJAX request to the API
    api.signIn(getFormFields(form))

      .then(ui.onSignInSuccess)
      .catch(ui.onSignInFailure);
}



module.exports = {
    onNavigateoToSignUpPage: onNavigateoToSignUpPage,
    onNavigateToSignInPage: onNavigateToSignInPage,
    onSignUp: onSignUp,
    onSignIn: onSignIn
}