////////////////////////////////////////////////////////////////////////////////
// 
// api.js
//
// This file handles all jQuery ajax calls to the web services.
//
////////////////////////////////////////////////////////////////////////////////

'use strict'


const config = require('./../config')
const store = require('../store')


const signUp = function (data) {
    return $.ajax({
      url: config.apiUrl + '/sign-up',
      method: 'POST',
      data: data
    })
}


const signIn = function (data) {
    return $.ajax({
      url: config.apiUrl + '/sign-in',
      method: 'POST',
      data: data
    })
}


const exitApp = function (data) {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + store.user.token
    },
    method: 'DELETE',
  })
}

module.exports = {
    
    signUp: signUp,
    signIn: signIn,
    exitApp: exitApp
}