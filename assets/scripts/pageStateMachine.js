////////////////////////////////////////////////////////////////////////////////
// 
// pageStateMachine.js
//
// This file acts as a pseudo-state machine to centrally manage the various 
// pages in the SPA. Frameworks such as Angular and React.js manage this 
// for us. Central management of the pages keeps the rest of the code simpler
// and allows us to be DRY.
//
////////////////////////////////////////////////////////////////////////////////


'use strict'


// This object is exposed to the rest of the app so that the app can state
// it next desired state and pass that state to transitionToState below.
const pageStates = {

    "homePage": "homePage",
    "signUpPage": "signUpPage",
    "signInPage": "signInPage",
    "gameOptionsPage": "gameOptionsPage",
    "changePasswordPage": "changePasswordPage",
    "newGamePage": "newGamePage"
}

// Cache the DOM queries. These are not exposed to the rest of the app.
const homePageJQuerySelector = $('#home-page');
const signUpPageJQuerySelector = $('#sign-up-page-form');
const signInPageJQuerySelector = $('#sign-in-page-form');
const gameOptionsPageJQuerySelector = $('#game-options-page-form');
const changePasswordPageJQuerySelector = $('#change-password-page-form');
const newGamePage = $('#new-game-page');


// This maps pageStates to the actual cached jQuery queries for hiding
// partial pages.
const privatePageStatesMap = {

    "homePage": homePageJQuerySelector,
    "signUpPage": signUpPageJQuerySelector,
    "signInPage": signInPageJQuerySelector,
    "gameOptionsPage": gameOptionsPageJQuerySelector,
    "changePasswordPage": changePasswordPageJQuerySelector,
    "newGamePage": newGamePage   
}


// This method should be invoked when the app is started. It sets the
// initial state of the app to the home page.
const initializeStateMachine = () => {

    // Hide the main header since the SVG on the main page indicates that this is Tic Tac Toe.
    
    // We need to call this as if we are outside of this module 
    // because we have to pass a string representing our initial state.
    transitionToState(pageStates.homePage);
}


// Navigates to the next "page" in the SPA, as defined by nextState.
const transitionToState = (nextState) => {

    // The logic is simplest if we hide every subpage of the app
    // and then finally show the subpage deinged by nextState.
    for(let currentPageInfo in privatePageStatesMap) {

        privatePageStatesMap[currentPageInfo].hide();
    }

    privatePageStatesMap[nextState].show();
}


module.exports = {

    initializeStateMachine,
    pageStates,
    transitionToState
}