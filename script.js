const board = document.getElementById('board');
const status = document.getElementById('status');
let currentPlayer = 1; // Player 1 starts (Red)
let gameBoard = Array(6).fill().map(() => Array(7).fill(0)); // 6 rows, 7 columns

// Create the game board
function createBoard() {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener('click', handleCellClick);
      board.appendChild(cell);
    }
  }
}

// Handle cell click
function handleCellClick(event) {
  const col = event.target.dataset.col;
  const row = getLowestEmptyRow(col);
  if (row === -1) return; // Column is full

  gameBoard[row][col] = currentPlayer;
  event.target.classList.add(currentPlayer === 1 ? 'blue' : 'lavender');

  if (checkWin(row, col)) {
    status.textContent = `Player ${currentPlayer} Wins!`;
    board.removeEventListener('click', handleCellClick);
    return;
  }

  currentPlayer = currentPlayer === 1 ? 2 : 1;
  status.textContent = `Player ${currentPlayer}'s Turn (${currentPlayer === 1 ? 'blue' : 'lavender'})`;
}

// Get the lowest empty row in a column
function getLowestEmptyRow(col) {
  for (let row = 5; row >= 0; row--) {
    if (gameBoard[row][col] === 0) return row;
  }
  return -1; // Column is full
}

// Check for a win
function checkWin(row, col) {
  const directions = [
    [1, 0], // Vertical
    [0, 1], // Horizontal
    [1, 1], // Diagonal down-right
    [1, -1], // Diagonal down-left
  ];

  for (const [dx, dy] of directions) {
    let count = 1;
    // Check in the positive direction
    let x = row + dx;
    let y = col + dy;
    while (x >= 0 && x < 6 && y >= 0 && y < 7 && gameBoard[x][y] === currentPlayer) {
      count++;
      x += dx;
      y += dy;
    }
    // Check in the negative direction
    x = row - dx;
    y = col - dy;
    while (x >= 0 && x < 6 && y >= 0 && y < 7 && gameBoard[x][y] === currentPlayer) {
      count++;
      x -= dx;
      y -= dy;
    }
    if (count >= 4) return true;
  }
  return false;
}


createBoard();