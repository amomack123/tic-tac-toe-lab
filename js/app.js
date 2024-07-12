/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/



/*------------------------ Cached Element References ------------------------*/



/*-------------------------------- Functions --------------------------------*/



/*----------------------------- Event Listeners -----------------------------*/

let board;
let turn;
let winner;
let tie;

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const resetBtnEl = document.getElementById('reset');

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function init() {
  console.log('Initializing the game...');
  board = ['', '', '', '', '', '', '', '', ''];
  turn = 'X';
  winner = false;
  tie = false;
  updateBoard();
  updateMessage();
}

function updateBoard() {
    board.forEach((currVal, index) => {
    squareEls[index].textContent = currVal;
    });
}

function updateMessage() {
    if (winner) {
        messageEl.textContent = `${turn} wins!`;
    } 
    else if (tie) {
        messageEl.textContent = "It's a tie!";
    } 
    else {
        messageEl.textContent = `It's ${turn}'s turn`;
    }
}

function handleClick(evt) {
    const squareIndex = parseInt(evt.target.id);
    if (board[squareIndex] !== '' || winner) return;

    board[squareIndex] = turn
    evt.target.setAttribute('data-player', turn);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    updateBoard();
    updateMessage();
}

function checkForWinner() {
  winningCombos.forEach(combo => {
    if (board[combo[0]] &&
        board[combo[0]] === board[combo[1]] &&
        board[combo[1]] === board[combo[2]]) 
    {
      winner = true;
    }
  });
}

function checkForTie() {
  if (!winner && !board.includes('')) {
    tie = true;
  }
}

function switchPlayerTurn() {
  if (winner) return;
  turn = turn === 'X' ? 'O' : 'X';
}

squareEls.forEach(sqr => sqr.addEventListener('click', handleClick));
resetBtnEl.addEventListener('click', init);

init();


