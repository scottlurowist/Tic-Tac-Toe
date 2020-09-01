////////////////////////////////////////////////////////////////////////////////
// 
// gameScoringEngine.js
//
// This file keeps track of a Tic Tac Toe game. It keeps track of scoring,
// manages some UI state.
//
////////////////////////////////////////////////////////////////////////////////


'use strict'


let currentGame = null;
let currentPlayer = null;
let numberOfMoves = 0;
let currentEventTarget = null;
let currentCellNumberClicked = -1;
let isGameWon = false;

// cache IDs for the board cells in an array for operations that require
// styling every cell on the board with a forEach.
const boardIds = ['#gameboard-cell-0', '#gameboard-cell-1', '#gameboard-cell-2',
'#gameboard-cell-3', '#gameboard-cell-4', '#gameboard-cell-5',
'#gameboard-cell-6', '#gameboard-cell-7', '#gameboard-cell-8' ]


// This method should be invoked when the app is started or upon starting
// a new game. It sets the initial state of the app to the home page.
const initializeGameEngine = game => {

    currentGame = game;

    // By requirements, the game starts with player X.
    currentPlayer = "x";

    // Keep track of the number of moves.
    numberOfMoves = 0;

    currentEventTarget = null;
    currentCellNumberClicked = -1;
    isGameWon = false;    

    // Reset the game board from possible previous games. Clear the background
    // color to white and remove any X and O images.
    boardIds.forEach(boardCell => {

      $(boardCell).attr("style", "background: white;")
      $(boardCell + " img").remove();
    });

    $('#new-game-return-to-game-options').hide();
    $('#new-game-within-game-board-button').hide();    
};


// Switches the player from x to o, or o to x. 
const toggleCurrentPlayer = () => {

    currentPlayer = (currentPlayer === "x") ? "o" : "x";
};


// Animates a single, winning, gameboard cell.
//  
// index - the winning cell to animate, cells are 0-based.
// timeDelay - the amount of time in milliseconds to delay the start
// of the animation.
const animateWinningGameCell = (index, timeDelay) => {

  setTimeout(() => {
    document.querySelector(`#gameboard-cell-${index}`)
      .style.background = "yellow";
  }, timeDelay);  
}


// Checks a collection of 3 gamboard cells for a win.
//

const checkBoardForWin = (firstCellIndex, secondCellIndex, thirdCellIndex) => {

  if (
    currentGame.cells[firstCellIndex] === currentGame.cells[secondCellIndex] &&
    currentGame.cells[secondCellIndex] === currentGame.cells[thirdCellIndex] &&
    currentGame.cells[firstCellIndex] !== ''
  ) {
      // Animate the winning row, column, or diagonal. 
      animateWinningGameCell(firstCellIndex, 500);
      animateWinningGameCell(secondCellIndex, 1000);
      animateWinningGameCell(thirdCellIndex, 1500);

      // Update the status area.
      $("#status-notification-message-area")
        .text(`Player --- ${currentPlayer.toUpperCase()} --- wins in ${numberOfMoves} moves!`); 

      return true;
    }

    return false;
} 


// This method checks whether there is a win. In terms of combinatorics,
// there are 8 ways to win the game; 3 rows, 3 columns, and 2 diagonals.
// A player can also only win on or after the 5th move since X goes first,
// and must select 3 in-a-row while O selects two spaces. So do not check
// for a win unless we are on moves 5 through 9.
const checkForWin = () => {
  
  // For reasons just stated...
  if (numberOfMoves < 5) return false;

  let isThereAWin = false;  

  // Note that through naive game play, X can win on the last move
  // by selecting X in one of the corners, winning by having Xs in
  // either diagonal, and having X's in the top or bottom row, or
  // the left or right columns. That is why we don't have "else if"
  // statements; this lets us detect that edge case.
  //
  // Use the transitive property of equality to check for a win.
  // First check the top row.
  if (checkBoardForWin(0, 1, 2)) {

    isThereAWin = true;    
  }
  
  // Check the middle row.
  if (checkBoardForWin(3, 4, 5)) {
     
    isThereAWin = true;       
  }
  
  // Check the bottom row.
  if (checkBoardForWin(6, 7, 8)) {

    isThereAWin = true;    
  }
  
  // Check the left column.
  if (checkBoardForWin(0, 3, 6)) {

    isThereAWin = true;      
  }
  
  // Check the middle column.
  if (checkBoardForWin(1, 4, 7)) {
        
    isThereAWin = true;            
  }
  
  // Check the right column.
  if (checkBoardForWin(2, 5, 8)) {

    isThereAWin = true;                    
  } 

  // Check the top left to bottom right diagonol.
  if (checkBoardForWin(0, 4, 8)) {

    isThereAWin = true;                     
  }  
  
  // Check the bottom left to top right diagonol.
  if (checkBoardForWin(6, 4, 2)) {

    isThereAWin = true;                     
  }

  // The game is over so show our nav buttons.
  if (isThereAWin) {
    $('#new-game-return-to-game-options').show();
    $('#new-game-within-game-board-button').show();  
  }

  return isThereAWin;
};


const checkForTie = () => {

    // We can only tie on the last move of the game if and only if
    // nobody has won by the 8th move. 
    if (numberOfMoves === 9) {
        $("#status-notification-message-area")
        .text(`Players X and O are tied.`);  

        boardIds.forEach(boardCell => {

          $(boardCell).attr("style", "background: red;");
        });
        
        $('#new-game-return-to-game-options').show();
        $('#new-game-within-game-board-button').show();  
        
        return true;
    }

    return false;
};


const isThereAWinOrTie = () => {

    // Return false if there is not a win or there is not a tie.
    // Only return true for a win or a tie.
    return checkForWin() || checkForTie() ? true : false;
};


// Processes the current user selection to make sure that the user hasn't
// selected a game cell already played. It also checks whether the user 
// has won or tied so that the web service may be properly informed.
const processCurrentMove = event => {

    // Each board cell's ID terminates with the cell #. Simply
    // extract it from the ID so that the game engine knows what
    // was selected.
    currentCellNumberClicked = event.target.id[event.target.id.length - 1];

    // Did the user select a cell that has already been played?
    if ((event.target.className === "x-image") ||
        (event.target.className === "o-image")) {
      $('#status-notification-message-area')
      .text('You cannot select a cell already played. Try again.');

      return;
    }

    if (currentGame.cells[currentCellNumberClicked] === "x"||
        currentGame.cells[currentCellNumberClicked] === "o") {

          $('#status-notification-message-area')
          .text('You cannot select a cell already played. Try again.');
    
          return;
    }

    // Save the board cell clicked for processing in updateGameStatus.
    currentEventTarget = event.target;

    // Update the game board for scoring purposes.
    currentGame.cells[currentCellNumberClicked] = currentPlayer;

   // Update the move of the game.
   numberOfMoves++;

   isGameWon = isThereAWinOrTie();

    return {
      id: currentGame._id,
      index: parseInt(currentCellNumberClicked),
      value: currentPlayer,
      isGameComplete: isGameWon
    }
}


const updateGameStatus = (game, wasUpdateSuccessful) => {

  // If the web service update was not successful, then halt the game.
  // The game variable will not have been updated. Don't update the board.
  // Just write a message to the display.
  if (!wasUpdateSuccessful) {

    $("#status-notification-message-area")
      .text('The game update was not successful.');
  }

  currentGame = game;

   // When we load the images into the grid and hide the grid then reshow 
   // the grid, the images appear to unload. So we hide our X and Y images
   // and then clone them and then attach them to the clicked cell grid. 
   let imageName = '.x-image';

   if (currentPlayer === 'o') {
     imageName = '.o-image';     
   }

   // Clone one of our hidden X and O images and attach to the board cell.
   $(`#gameboard-images-cache ${imageName}`).clone()
                                            .appendTo($(currentEventTarget)); 

   // Now we need to show the hidden, cloned image.
   $(currentEventTarget).children("img")
                        .css("display", "inline");

   if (!isGameWon) {
     $("#status-notification-message-area")
      .text(`Player --- ${currentPlayer.toUpperCase()} --- to cell ${currentCellNumberClicked}.`);
   }

   // Switch player X to O, or O to X.
   toggleCurrentPlayer();
} 


module.exports = {

    initializeGameEngine,
    processCurrentMove,
    updateGameStatus
}