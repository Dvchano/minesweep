const gameBoard = document.getElementById("game-board");

// Set up board
const boardSize = 10;
const numMines = 10;
let board = new Array(boardSize).fill(null).map(() => new Array(boardSize).fill(null));
let mines = [];

function createBoard() {
  for (let i = 0; i < boardSize; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < boardSize; j++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${i}-${j}`);
      cell.addEventListener("click", () => revealCell(i, j));
      cell.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        markCell(i, j);
      });
      row.appendChild(cell);
    }
    gameBoard.appendChild(row);
  }
}

function placeMines() {
  while (mines.length < numMines) {
    const x = Math.floor(Math.random() * boardSize);
    const y = Math.floor(Math.random() * boardSize);
    if (!mines.some(mine => mine[0] === x && mine[1] === y)) {
      mines.push([x, y]);
      board[x][y] = "mine";
    }
  }
}

function revealCell(row, col) {
  const cell = document.getElementById(`${row}-${col}`);
  if (cell.classList.contains("clicked") || cell.classList.contains("flag")) {
    return;
  }

  if (board[row][col] === "mine") {
    revealMines();
    alert("Game Over");
    return;
  }

  let mineCount = 0;
  for (let i = Math.max(row - 1, 0); i <= Math.min(row + 1, boardSize - 1); i++) {
    for (let j = Math.max(col - 1, 0); j <= Math.min(col + 1, boardSize - 1); j++) {
      if (board[i][j] === "mine") {
        mineCount++;
      }
    }
  }

  if (mineCount > 0) {
    cell.classList.add("clicked");
    cell.textContent = mineCount;
  } else {
    cell.classList.add("clicked");
    for (let i = Math.max(row - 1, 0); i <= Math.min(row + 1, boardSize - 1); i++) {
      for (let j = Math.max(col - 1, 0); j <= Math.min(col + 1, boardSize -
