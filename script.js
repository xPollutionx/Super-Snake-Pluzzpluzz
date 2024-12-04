const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 400;
canvas.height = 400;

const tileSize = 20;
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;

// Generate food
function randomFoodPosition() {
  return {
    x: Math.floor(Math.random() * (canvas.width / tileSize)) * tileSize,
    y: Math.floor(Math.random() * (canvas.height / tileSize)) * tileSize,
  };
}

food = randomFoodPosition();

// Draw game
function drawGame() {
  // Clear canvas
  ctx.fillStyle = '#121212';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  snake.forEach(segment => {
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(segment.x, segment.y, tileSize, tileSize);
  });

  // Draw food
  ctx.fillStyle = '#FF5722';
  ctx.fillRect(food.x, food.y, tileSize, tileSize);

  // Draw score
  document.getElementById('score').innerText = `Score: ${score}`;
}

// Update game
function updateGame() {
  const head = { ...snake[0], x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Wrap around edges
  head.x = (head.x + canvas.width) % canvas.width;
  head.y = (head.y + canvas.height) % canvas.height;

  // Check for collisions
  if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    alert('Game Over!');
    resetGame();
    return;
  }

  snake.unshift(head);

  // Check for food
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = randomFoodPosition();
  } else {
    snake.pop();
  }
}

function resetGame() {
  snake = [{ x: 200, y: 200 }];
  direction = { x: 0, y: 0 };
  food = randomFoodPosition();
  score = 0;
}

// Handle keyboard input
document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction.y === 0) direction = { x: 0, y: -tileSize };
      break;
    case 'ArrowDown':
      if (direction.y === 0) direction = { x: 0, y: tileSize };
      break;
    case 'ArrowLeft':
      if (direction.x === 0) direction = { x: -tileSize, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x === 0) direction = { x: tileSize, y: 0 };
      break;
  }
});

// Game loop
function gameLoop() {
  updateGame();
  drawGame();
  setTimeout(gameLoop, 100);
}

resetGame();
gameLoop();
