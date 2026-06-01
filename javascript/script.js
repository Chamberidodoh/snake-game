const GAME_WIDTH = 700;
const GAME_HEIGHT = 700;
const SPEED = 100;
const SPACE_SIZE = 50;
const BODY_PARTS = 3;
const SNAKE_COLOR = '#71E071';
const FOOD_COLOR = '#971717';
const BACKGROUND_COLOR = '#000000';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const restartButton = document.getElementById('restartButton');

let direction = 'down';
let score = 0;
let snake = [];
let food = {};
let gameInterval = null;
let isGameOver = false;

function resetGame() {
  direction = 'down';
  score = 0;
  snake = [];
  isGameOver = false;

  for (let i = 0; i < BODY_PARTS; i += 1) {
    snake.push({ x: 0, y: i * SPACE_SIZE });
  }

  placeFood();
  updateScore();
  draw();

  if (gameInterval) {
    clearInterval(gameInterval);
  }

  gameInterval = setInterval(nextTurn, SPEED);
}

function placeFood() {
  const maxColumns = GAME_WIDTH / SPACE_SIZE;
  const maxRows = GAME_HEIGHT / SPACE_SIZE;
  const x = Math.floor(Math.random() * maxColumns) * SPACE_SIZE;
  const y = Math.floor(Math.random() * maxRows) * SPACE_SIZE;

  const collision = snake.some(segment => segment.x === x && segment.y === y);
  if (collision) {
    placeFood();
    return;
  }

  food = { x, y };
}

function updateScore() {
  scoreEl.textContent = score;
}

function draw() {
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = FOOD_COLOR;
  ctx.fillRect(food.x, food.y, SPACE_SIZE, SPACE_SIZE);

  ctx.fillStyle = SNAKE_COLOR;
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, SPACE_SIZE, SPACE_SIZE);
  });

  if (isGameOver) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    ctx.fillStyle = '#ff4444';
    ctx.font = 'bold 64px Consolas, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GAME OVER', GAME_WIDTH / 2, GAME_HEIGHT / 2);
  }
}

function nextTurn() {
  if (isGameOver) {
    return;
  }

  const head = { ...snake[0] };

  if (direction === 'up') head.y -= SPACE_SIZE;
  if (direction === 'down') head.y += SPACE_SIZE;
  if (direction === 'left') head.x -= SPACE_SIZE;
  if (direction === 'right') head.x += SPACE_SIZE;

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 1;
    updateScore();
    placeFood();
  } else {
    snake.pop();
  }

  if (checkCollisions()) {
    endGame();
    return;
  }

  draw();
}

function checkCollisions() {
  const head = snake[0];
  if (head.x < 0 || head.x >= GAME_WIDTH || head.y < 0 || head.y >= GAME_HEIGHT) {
    return true;
  }

  for (let i = 1; i < snake.length; i += 1) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }

  return false;
}

function changeDirection(event) {
  const keys = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right'
  };

  const newDirection = keys[event.key];
  if (!newDirection) return;

  const opposites = {
    up: 'down',
    down: 'up',
    left: 'right',
    right: 'left'
  };

  if (newDirection === opposites[direction]) return;
  direction = newDirection;
}

function endGame() {
  isGameOver = true;
  clearInterval(gameInterval);
  draw();
}

window.addEventListener('keydown', changeDirection);
restartButton.addEventListener('click', resetGame);

resetGame();