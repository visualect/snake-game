const board = document.getElementById('board');
const ctx = board.getContext('2d');

const COLS = 30;
const ROWS = 30;
const blockSize = 20;

board.width = COLS * blockSize;
board.height = ROWS * blockSize

drawGame()

function drawGame() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, board.width, board.height)
}

