const boardDiv = document.getElementById('board');
const welcome = document.getElementById('welcome');
const gameBoard = document.getElementById('gameBoard');
const resultSection = document.getElementById('resultSection');
const resultText = document.getElementById('resultText');
const playerTurn = document.getElementById('playerTurn');

let board = [["", "", ""], ["", "", ""], ["", "", ""]];
let playerName = "";

// --- Start Game ---
document.getElementById('startBtn').addEventListener('click', () => {
  playerName = document.getElementById('username').value || "Player";
  welcome.classList.add('hidden');
  gameBoard.classList.remove('hidden');
  playerTurn.textContent = `${playerName}'s Turn (X)`;
  renderBoard();
});

// --- Render the board dynamically ---
function renderBoard() {
  boardDiv.innerHTML = "";
  board.forEach((row, i) => {
    row.forEach((cell, j) => {
      const div = document.createElement('div');
      div.className = 'cell';
      div.textContent = cell;

      // Add glowing colors for X and O
      if (cell === "X") {
        div.style.color = "#fe5d5dff";
        div.style.textShadow = "0 0 10px rgba(255, 107, 107, 0.8)";
      } else if (cell === "O") {
        div.style.color = "#2ed9ceff";
        div.style.textShadow = "0 0 10px rgba(78, 205, 196, 0.8)";
      }

      div.addEventListener('click', () => makeMove(i, j));
      boardDiv.appendChild(div);
    });
  });
}


// --- Handle Player Move ---
function makeMove(i, j) {
  if (board[i][j] !== "" || resultSection.classList.contains('active')) return;

  board[i][j] = "X";
  renderBoard();

  if (checkGameOver()) return;

  // AI Move
  fetch('/move', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ board })
  })
  .then(res => res.json())
  .then(data => {
    board[data.row][data.col] = "O";
    renderBoard();
    checkGameOver();
  });
}

// --- Check Game Over ---
function checkGameOver() {
  const winner = getWinner();
  if (winner || isFull()) {
    resultSection.classList.remove('hidden');
    if (winner === "X") resultText.textContent = `${playerName} Wins! 🎉`;
    else if (winner === "O") resultText.textContent = `AI Wins! 🤖`;
    else resultText.textContent = "It's a Draw!";
    disableBoard();
    return true;
  }
  return false;
}

// --- Disable further clicks ---
function disableBoard() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.style.pointerEvents = 'none');
}

// --- Winner Detection ---
function getWinner() {
  for (let i = 0; i < 3; i++) {
    if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) return board[i][0];
    if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) return board[0][i];
  }
  if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return board[0][0];
  if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return board[0][2];
  return null;
}

// --- Check Draw ---
function isFull() {
  return board.flat().every(c => c !== "");
}

// --- Play Again ---
document.getElementById('playAgain').addEventListener('click', () => {
  board = [["", "", ""], ["", "", ""], ["", "", ""]];
  resultSection.classList.add('hidden');
  renderBoard();
});
