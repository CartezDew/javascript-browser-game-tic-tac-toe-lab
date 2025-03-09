/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/



/*------------------------ Cached Element References ------------------------*/



/*-------------------------------- Functions --------------------------------*/



/*----------------------------- Event Listeners -----------------------------*/



//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.


const messageEl = document.querySelector("#message");
const resetButtonEl = document.querySelector("button");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => "Game ended in a Draw";
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn!`;

messageEl.innerText = currentPlayerTurn();

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

const handleCellPlayed = (clickedSquare, clickedSquareIndex) => {
  board[clickedSquareIndex] = currentPlayer; // Update Game Board state
  clickedSquare.innerText = currentPlayer; // Update UI
};

const handlePlayerChange = () => {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  messageEl.innerText = currentPlayerTurn();
};

const handleResultValidation = () => {
  let roundWon = false;

  for (let i = 0; i < winningCombos.length; i++) {
    const winCombo = winningCombos[i]; // [6, 7, 8]

    let a = board[winCombo[0]];
    let b = board[winCombo[1]];
    let c = board[winCombo[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    messageEl.innerText = winningMessage();
    gameActive = false;
    return;
  }

  let roundDraw = !board.includes(""); // false if there are empty strings
  if (roundDraw) {
    messageEl.innerText = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
};

const handleSquareClick = (e) => {
  const clickedSquare = e.target;
  const clickedSquareIndex = parseInt(clickedSquare.id);

  if (board[clickedSquareIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedSquare, clickedSquareIndex);
  handleResultValidation();
};

const squareEls = document.querySelectorAll(".sqr");

squareEls.forEach((squareEl) => {
  squareEl.addEventListener("click", handleSquareClick);
});

resetButtonEl.addEventListener("click", () => {
  gameActive = true;
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  messageEl.innerText = currentPlayerTurn();
  document.querySelectorAll(".sqr").forEach((sqr) => (sqr.innerText = ""));
});