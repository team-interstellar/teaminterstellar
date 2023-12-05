let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const boardElement = document.getElementById('board');
const resultScreen = document.getElementById('result');
const winnerMessage = document.getElementById('winner-message');
const drawMessage = document.getElementById('draw-message');

function handleCellClick(index) {
    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        renderBoard();
        checkGameStatus();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function renderBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        boardElement.appendChild(cellElement);
    });
}

function checkGameStatus() {
    if (checkWinner()) {
        gameActive = false;
        winnerMessage.textContent = `Player ${currentPlayer} wins!`;
        resultScreen.style.display = 'block';
    } else if (isBoardFull()) {
        gameActive = false;
        drawMessage.textContent = 'It\'s a draw!';
        resultScreen.style.display = 'block';
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winningCombinations.some(combination =>
        combination.every(index => board[index] === currentPlayer)
    );
}

function isBoardFull() {
    return board.every(cell => cell !== '');
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    resultScreen.style.display = 'none';
    renderBoard();
}

// Initial rendering of the board
renderBoard();