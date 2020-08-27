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
 
    alert('Not yet implemented...')
}


const onSignUp = event => {

    event.preventDefault();

    const form = event.target;

    // send data in AJAX request to the API
    api.signUp(getFormFields(form))

      // handle successul response
      .then(ui.onSignUpSuccess)
      
      // handle failed response
      .catch(ui.onSignUpFailure);
}



module.exports = {
    onNavigateoToSignUpPage: onNavigateoToSignUpPage,
    onNavigateToSignInPage: onNavigateToSignInPage,
    onSignUp: onSignUp
}