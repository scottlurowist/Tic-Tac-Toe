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
const stateMachine = require('../pageStateMachine');


// This event simply navigates to the signup page.
const onNavigateToSignUpPage = event => {

    stateMachine.transitionToState(stateMachine.pageStates.signUpPage);
}


// This event simply navigates to the signin page.
const onNavigateToSignInPage = event => {
 
    stateMachine.transitionToState(stateMachine.pageStates.signInPage);
}


// This event is triggered when the user has requested to create an 
// account in this application. It will invoke the web service that
// creates a new user account.
const onSignUp = event => {

    event.preventDefault();

    api.signUp(getFormFields(event.target))
      .then(ui.onSignUpSuccess)
      .catch(ui.onSignUpFailure);
}


// This event is triggered when the user has requested to signin to
// this application. It will invoke the web service that
// signs the user into the application and returns a token used
// for invoking further web services.
const onSignIn = event => {

    event.preventDefault();

    api.signIn(getFormFields(event.target))
      .then(ui.onSignInSuccess)
      .catch(ui.onSignInFailure);
}


// This event is invoked when the user clicks the "Change Password"
// button on the "Game Options" page. It simply triggers a state
// change to the Change Password page.
const onChangePasswordShowForm = () => {

    stateMachine.transitionToState(stateMachine.pageStates.changePasswordPage);
}


// This event is triggered when the user has requested to change
// their password. It will invoke the web service that changes the
// user's password. If successful, the user will be taken back to 
// the Game Options page.
const onChangePassword = event => {
    
    event.preventDefault();

    api.changePassword(getFormFields(event.target))
      .then(ui.onChangePasswordSuccess)
      .catch(ui.onChangePasswordFailure);
  
    //stateMachine.transitionToState(stateMachine.pageStates.gameOptionsPage);
}


// This event is triggered when the user has requested to create
// a new game. It will invoke the web service that creates a new
// game. If successful, the user will be presented with a tic-tac-toe
// board and can immediately start playing.
const onNewGame = event => {

    event.preventDefault();
    
    api.newGame()
        .then(ui.onNewGameSuccess)
        .catch(ui.onNewGameFailure);
}


// This event is triggered when the user has either won,
// lost, or tied a game, and this will simply return the user to
// the Game Options page. From there the user may select what they
// would next like to do.
const onReturnToGameOptionsFromNewGame = () => {

    stateMachine.transitionToState(stateMachine.pageStates.gameOptionsPage);
};


// This event is triggered when the user has clicked the
// "Exit Tic-Tac-Toe" button in the Game Options page. This will exit the user
// from the application and return them to the home page for the app.
const onExitApp = event => {
    console.log('Entering onExit');
    event.preventDefault();

    api.exitApp()
      .then(ui.onExitAppSuccess)
      .catch(ui.onExitAppFailure);

    //stateMachine.transitionToState(stateMachine.pageStates.homePage);
}


module.exports = {
    onNavigateToSignUpPage: onNavigateToSignUpPage,
    onNavigateToSignInPage: onNavigateToSignInPage,
    onSignUp: onSignUp,
    onSignIn: onSignIn,
    onChangePasswordShowForm: onChangePasswordShowForm,
    onChangePassword: onChangePassword,
    onNewGame: onNewGame,
    onReturnToGameOptionsFromNewGame: onReturnToGameOptionsFromNewGame,
    onExitApp: onExitApp
}