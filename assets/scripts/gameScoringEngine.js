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


// This method checks whether there is a win. In terms of combinatorics,
// there are 8 ways to win the game; 3 rows, 3 columns, and 2 diagonals.
// A player can also only win on or after the 5th move since X goes first,
// and must select 3 in-a-row while O selects two spaces. So do not check
// for a win unless we are on moves 5 through 9.
const checkForWin = () => {
  
  // For reasons just stated...
  if (numberOfMoves < 5) return false;

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

    // We can only tie on the last move of the game if and only if
    // nobody has won by the 8th move. 
    if (numberOfMoves === 9) {
        $("#status-notification-message-area")
        .text(`Players X and O are tied.`);  
        
        $('#new-game-return-to-game-options').prop("disabled", false);
        $('#new-game-within-game-board-button').prop("disabled", false);  
        
        return true;
    }

    return false;
};


const isThereAWinOrTie = () => {

    // Return false if there is not a win or there is not a tie.
    // Only return true for a win or a tie.
    return checkForWin() || checkForTie() ? true : false;
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

    // Update the move of the game.
    numberOfMoves++;

    // When we load the images into the grid and hide the grid then reshow 
    // the grid, the images appear to unload. So we hide our X and Y images
    // and then clone them and then attach them to the clicked cell grid. 
    let imageName = '#x-image';

    if (currentPlayer === 'O') {
      imageName = '#o-image';     
    }

    $(imageName).clone().appendTo($(event.target)); 

    // Now we need to show the hidden, cloned image.
    $(event.target).children("img").css("display", "inline");

    $("#status-notification-message-area")
      .text(`Player ${currentPlayer} to cell ${cellNumberClicked}.`);

    // Update our game board with the latest move.  
    currentGame.cells[cellNumberClicked] = currentPlayer;

    // We need to to score the round before invoking the update game
    // web service because we need to inform the web service whether the 
    // game is completed.
    let isGameComplete = false;

    if (isThereAWinOrTie()) {
      isGameComplete = true;
    }

    //let foo = api;
    //authEvents.onUpdateGame(currentGame._id, parseInt(cellNumberClicked), currentPlayer, isGameComplete);

    // Switch player X to O, or O to X.
    toggleCurrentPlayer();
}


module.exports = {

    initializeGameEngine,
    processCurrentMove
}