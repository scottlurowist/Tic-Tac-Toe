////////////////////////////////////////////////////////////////////////////////
// 
// api.js
//
// This file handles all jQuery ajax calls to the web services.
//
////////////////////////////////////////////////////////////////////////////////


'use strict'


const config = require('./../config')
const store = require('./../store')


// Invokes the web service for the signup of a new account.
const signUp = function (data) {
    return $.ajax({
      url: config.apiUrl + '/sign-up',
      method: 'POST',
      data: data
    })
}


// Invokes the web service for the signin of a current user.
const signIn = function (data) {

    return $.ajax({
      url: config.apiUrl + '/sign-in',
      method: 'POST',
      data: data
    })
}


// Invokes the web service for changing the password for a current user
// who is curretnly active in the app. This requires a token to invoke.
const changePassword = function(data) {

  return $.ajax({
    url: config.apiUrl + '/change-password',
    headers: {
      'Authorization': 'Bearer ' + store.user.token
    },
    method: 'PATCH',
    data: data
  })
}


// Invokes the web service for creating a new game for a current user
// who is curretnly active in the app. This requires a token to invoke.
const newGame = () => {
  return $.ajax({
    url: config.apiUrl + '/games',
    headers: {
      'Authorization': 'Bearer ' + store.user.token
    },
    method: 'POST'
  })
}


// Invokes the web service for updating an existing game for a current user
// who is currently active in the app. This requires a token to invoke.
const updateGame = (gameId, index, value, isOver) => {

  return $.ajax({
    url: config.apiUrl + `/games/${gameId}`,
    headers: {
      'Authorization': 'Bearer ' + store.user.token
    },
    type: 'PATCH',
    data: JSON.stringify({
      game: {
        cell: {
          index: index,
          value: value
        },
        over: isOver
      }
    }),
    contentType: 'application/json',
    dataType: 'json'
  })
};


// Invokes the web service for getting all of the games played for a user. 
// This requires a token to invoke.
const getGames = () => {

  return $.ajax({
    url: config.apiUrl + '/games/',
    headers: {
      'Authorization': 'Bearer ' + store.user.token
    },
    type: 'GET'
  })
};


// Invokes the web service for exiting this application for a current user
// who is curretnly active in the app. This requires a token to invoke so
// that it can be removed from service.
const exitApp = function (data) {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    headers: {
      'Authorization': 'Bearer ' + store.user.token
    },
    method: 'DELETE'
  })
}


module.exports = {
    
    signUp: signUp,
    signIn: signIn,
    changePassword: changePassword,
    newGame: newGame,
    updateGame: updateGame,
    getGames, getGames,
    exitApp: exitApp
}