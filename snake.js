const board = document.getElementById('board');
const ctx = board.getContext('2d');
const score = document.querySelector('.score__quantity')

const COLS = 35;
const ROWS = 35;
const blockSize = 25;

board.width = COLS * blockSize;
board.height = ROWS * blockSize;

game = setInterval(drawGame, 40)
document.addEventListener('keydown', moveSnake);


let velocityX = 1;
let velocityY = 0;
let snakeX = 2 * blockSize;
let snakeY = 2 * blockSize;
let foodX = Math.floor(Math.random() * COLS) * blockSize;
let foodY = Math.floor(Math.random() * ROWS) * blockSize;

const defaultBody = [[snakeX - blockSize, snakeY], [snakeX - blockSize * 2, snakeY], [snakeX - blockSize * 3, snakeY]]
let snakeBody = [...defaultBody];

function drawGame() {
  // board
  ctx.fillStyle = '#111111';
  ctx.fillRect(0, 0, board.width, board.height)


  // food 
  ctx.fillStyle = '#FF5252';
  ctx.fillRect(foodX, foodY, blockSize, blockSize);
  if (snakeX === foodX && snakeY === foodY) {
    score.textContent = ++score.textContent;
    snakeBody.push([foodX, foodY])
    placeFood();
  };
  // food overlapping each other
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  // if snakeBody isn't empty make first element of array a head of the snake
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  // snake
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  ctx.fillStyle = '#2C8943';
  ctx.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (const snakeBlock of snakeBody) {
    ctx.fillRect(snakeBlock[0], snakeBlock[1], blockSize, blockSize)
  }

  // game over scenarios
  if (snakeX > board.width || snakeX < 0 || snakeY > board.height || snakeY < 0) restartGame();

  for (const snakeBlock of snakeBody) {
    if (snakeX === snakeBlock[0] && snakeY === snakeBlock[1]) restartGame();
  }

  // restart
  document.addEventListener('keydown', event => {
    if (event.key === 'r') restartGame()
  })
}

function moveSnake(e) {
  if ((e.key === 'ArrowRight' || e.key === 'd') && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  } else if ((e.key === 'ArrowDown' || e.key === 's') && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
  } else if ((e.key === 'ArrowLeft' || e.key === 'a') && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  } else if ((e.key === 'ArrowUp' || e.key === 'w') && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * COLS) * blockSize;
  foodY = Math.floor(Math.random() * ROWS) * blockSize;
}

function restartGame() {
  clearInterval(game)
  velocityX = 1;
  velocityY = 0;
  snakeX = 2 * blockSize;
  snakeY = 2 * blockSize;
  snakeBody = [...defaultBody];
  placeFood();
  game = setInterval(drawGame, 40)
  score.textContent = 0;
}



