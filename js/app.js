let board = [];
let turn = "";
let winner = false;
let tie = false;

const boardEl = document.querySelector(".board");
const messageEl = document.querySelector("#message");
const squareEls = document.querySelectorAll(".sqr");

function init() {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  winner = false;
  tie = false;

  render();
}

init();

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  board.forEach((square, index) => {
    squareEls[index].textContent = square;
  });
}

function updateMessage() {
  if (winner === false && tie === false) {
    messageEl.textContent = `Player ${turn} turn`;
  } else if (winner === false && tie === true) {
    messageEl.innerText = "Draw!";
  } else if (winner === true && tie === false) {
    messageEl.innerText = `Player ${turn} Wins!`;
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const handleClick = (event) => {
  const squareIndex = event.target.id;

  if (board[squareIndex] === "X" || board[squareIndex] === "O") {
    return;
  } else if (winner === true) {
    return;
  }

  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
};

squareEls.forEach((square) => {
  square.addEventListener("click", handleClick);
});

function placePiece(index) {
  board[index] = turn;
}

function checkForWinner() {
  winningCombos.forEach((combo) => {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = true;
    }
  });
}

function checkForTie() {
  if (winner === true) {
    return;
  }
  if (board.includes("")) {
    tie = false;
  } else {
    tie = true;
  }
}

function switchPlayerTurn() {
  if (winner === true) {
    return;
  }

  if (turn === "X") {
    turn = "O";
  } else if (turn === "O") {
    turn = "X";
  }
}

const resetBtnEl = document.querySelector("#reset");

resetBtnEl.addEventListener("click", init);
