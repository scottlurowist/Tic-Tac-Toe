////////////////////////////////////////////////////////////////////////////////
// 
// gameScoringEngine.js
//
// This file 
//
////////////////////////////////////////////////////////////////////////////////


'use strict'


let currentGame = null;
let currentPlayer = null;
let numberOfMoves = 0;


// This method should be invoked when the app is started. It sets the
// initial state of the app to the home page.
const initializeGameEngine = game => {

    currentGame = game;
    currentPlayer = "X";
    numberOfMoves = 0;

    // Reset the game board from possible previous games.
    $('#gameboard-cell-0').text('');
    $('#gameboard-cell-1').text('');
    $('#gameboard-cell-2').text('');
    $('#gameboard-cell-3').text('');  
    $('#gameboard-cell-4').text('');
    $('#gameboard-cell-5').text('');  
    $('#gameboard-cell-6').text('');
    $('#gameboard-cell-7').text('');                  
    $('#gameboard-cell-8').text('');  

    $('#new-game-return-to-game-options').prop("disabled", true);
    $('#new-game-within-game-board-button').prop("disabled", true);    
};


const toggleCurrentPlayer = () => {

    currentPlayer = (currentPlayer === "X") ? "O" : "X";
};


const checkForWin = () => {
  
  let isThereAWin = false;  
  // Use the transitive property of equality to check for a win.
  // First check the top row.
  if (
    currentGame.cells[0] === currentGame.cells[1] &&
    currentGame.cells[1] === currentGame.cells[2] &&
    currentGame.cells[0] !== ''
  ) {
    $("#status-notification-message-area")
        .text(`Player ${currentPlayer} wins!`);

    isThereAWin = true;    
  }
  // Check the middle row.
  else if (
    currentGame.cells[3] === currentGame.cells[4] &&
    currentGame.cells[4] === currentGame.cells[5] &&
    currentGame.cells[3] !== ''
  ) {
    $("#status-notification-message-area")
        .text(`Player ${currentPlayer} wins!`);
        
    isThereAWin = true;       
  }
  // Check the bottom row.
  else if (
    currentGame.cells[6] === currentGame.cells[7] &&
    currentGame.cells[7] === currentGame.cells[8] &&
    currentGame.cells[6] !== ''
  ) {
    $("#status-notification-message-area")
        .text(`Player ${currentPlayer} wins!`);
        
    isThereAWin = true;    
  }
  // Check the left column.
  else if (
    currentGame.cells[0] === currentGame.cells[3] &&
    currentGame.cells[3] === currentGame.cells[6] &&
    currentGame.cells[0] !== ''
  ) {
    $("#status-notification-message-area")
        .text(`Player ${currentPlayer} wins!`);
        
    isThereAWin = true;      
  }
  // Check the middle column.
  else if (
    currentGame.cells[1] === currentGame.cells[4] &&
    currentGame.cells[4] === currentGame.cells[7] &&
    currentGame.cells[1] !== ''
  ) {
    $("#status-notification-message-area")
        .text(`Player ${currentPlayer} wins!`);
        
    isThereAWin = true;            
  }
  // Check the right column.
  else if (
    currentGame.cells[2] === currentGame.cells[5] &&
    currentGame.cells[5] === currentGame.cells[8] &&
    currentGame.cells[2] !== ''
  ) {
    $("#status-notification-message-area")
        .text(`Player ${currentPlayer} wins!`);

    isThereAWin = true;                    
  } 
  // Check the top left to bottom right diagonol.
  else if (
    currentGame.cells[0] === currentGame.cells[4] &&
    currentGame.cells[4] === currentGame.cells[8] &&
    currentGame.cells[0] !== ''
  ) {
    $("#status-notification-message-area")
        .text(`Player ${currentPlayer} wins!`);
        
    isThereAWin = true;                     
  }  
  // Check the bottom left to top right diagonol.
  else if (
    currentGame.cells[6] === currentGame.cells[4] &&
    currentGame.cells[4] === currentGame.cells[2] &&
    currentGame.cells[6] !== ''
  ) {
    $("#status-notification-message-area")
        .text(`Player ${currentPlayer} wins!`);

    isThereAWin = true;                     
  }

  if (isThereAWin) {
      
    $('#new-game-return-to-game-options').prop("disabled", false);
    $('#new-game-within-game-board-button').prop("disabled", false);  
  }

  return isThereAWin;
};


const checkForTie = () => {

    if (numberOfMoves === 9) {
        $("#status-notification-message-area")
        .text(`Players X and O are tied.`);  
        
        $('#new-game-return-to-game-options').prop("disabled", false);
        $('#new-game-within-game-board-button').prop("disabled", false);            
    }
};


const scoreTheRound = () => {

    // Only check for ties if we don't have a win.
    if(!checkForWin()) {
        checkForTie();
    }
};


// Navigates to the next "page" in the SPA, as defined by nextState.
const processCurrentMove = event => {

    const cellNumberClicked = event.target.id[event.target.id.length - 1];

    $('#status-notification-message-area').text('');

    // Did the user select a cell that has already been played?
    if (currentGame.cells[cellNumberClicked] === "X" ||
        currentGame.cells[cellNumberClicked] === "O") {

        $('#status-notification-message-area')
        .text('You cannot select a cell already played. Try again.');

        return;
    }

    numberOfMoves++;

    if (currentPlayer === 'X') {
      $('#x-image').clone().appendTo($(event.target));      
    }
    else {
      $('#o-image').clone().appendTo($(event.target));  
    }

    $(event.target).children("img").css("display", "inline");

    $("#status-notification-message-area")
    .text(`Player ${currentPlayer} to cell ${cellNumberClicked}.`);

    currentGame.cells[cellNumberClicked] = currentPlayer;

    scoreTheRound();
    toggleCurrentPlayer();



    // Make call to web service here:
    // cellNumber and value...

}


module.exports = {

    initializeGameEngine,
    processCurrentMove
}