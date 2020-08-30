'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const authEvents = require('./auth/events');
const stateMachine = require('./pageStateMachine');
const gameScoringEngine = require('./gameScoringEngine');


$(() => {

  // We are making a single page app by storing all of our subviews in a single
  // index.html file. So we imagine that we have a pseudo-state machine and 
  // we must hide sections of the page depending upon which state we are.
  stateMachine.initializeStateMachine();

  //$('#new-game-page').show();
  
  // Handles the two buttons found on the home page to either create an account
  // or to sign into an existing account.
  $('#home-page-create-account-button').on('click', authEvents.onNavigateToSignUpPage);
  $('#home-page-sign-in-button').on('click', authEvents.onNavigateToSignInPage);

  // This handles the button click on the create account page.
  $('#sign-up-page-form').on('submit', authEvents.onSignUp);

    // This handles the button click on the signin page.
  $('#sign-in-page-form').on('submit', authEvents.onSignIn);

  // This handles the button click on the game options page for changing the 
  // user's password.
  $('#change-password-button').on('click', authEvents.onChangePasswordShowForm);

  $('#change-password-page-form').on('submit', authEvents.onChangePassword);

  $('#new-game-return-to-game-options')
    .on('click', authEvents.onReturnToGameOptionsFromNewGame);

  // This handles the button click on the game options page for creating a 
  // new game.
  $('#new-game-button').on('click', authEvents.onNewGame);

  // This handles the button click on the game options page for exiting the 
  // application.
  $('#exit-tic-tac-toe-app-button').on('click', authEvents.onExitApp);

  // This handles when the user clicks a cell on the actual Tic-Tac-Toe board.
  // It scores the move.
  $('.col').on('click', event => {
    
    const currentMoveResults = gameScoringEngine.processCurrentMove(event);

    // I wanted to invoke this from the game engine, but doing so would result
    // in circular references with respect to CommonJS. 
    authEvents.onUpdateGame(currentMoveResults.id, currentMoveResults.index,
      currentMoveResults.value, currentMoveResults.isGameComplete);
  })

  // This handles when the user clicks the New Game button that exists
  // on the game board itself.
  $('#new-game-within-game-board-button').on('click', authEvents.onNewGame);
})
