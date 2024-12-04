// Set up canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Canvas dimensions (doubled to 800x800)
canvas.width = 800;
canvas.height = 800;

// Game settings
const tileSize = 20;
let snake = [{ x: 400, y: 400 }];
let direction = { x: 0, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;

// Generate random food position
function randomFoodPosition() {
  return {
    x: Math.floor(Math.random() * (canvas.width / tileSize)) * tileSize,
    y: Math.floor(Math.random() * (canvas.height / tileSize)) * tileSize,
  };
}

// Initialize food position
food = randomFoodPosition();

// Draw everything on the canvas
function drawGame() {
  // Clear canvas
  ctx.fillStyle = '#121212';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  snake.forEach(segment => {
    ctx.fillStyle = '#4CAF50'; // Snake color
    ctx.fillRect(segment.x, segment.y, tileSize, tileSize);
  });

  // Draw the food
  ctx.fillStyle = '#FF5722'; // Food color
  ctx.fillRect(food.x, food.y, tileSize, tileSize);

  // Update the score
  document.getElementById('score').innerText = `Score: ${score}`;
}

// Update the game state
function updateGame() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Wrap around edges
  head.x = (head.x + canvas.width) % canvas.width;
  head.y = (head.y + canvas.height) % canvas.height;

  // Check for collisions with the snake body
  if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    alert('Game Over!');
    resetGame();
    return;
  }

  snake.unshift(head);

  // Check if the snake eats the food
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = randomFoodPosition();
  } else {
    snake.pop();
  }
}

// Reset the game
function resetGame() {
  snake = [{ x: 400, y: 400 }]; // Start in the center
  direction = { x: 0, y: 0 };   // No movement initially
  food = randomFoodPosition();
  score = 0;
}

// Handle keyboard input for snake direction
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

// Main game loop
function gameLoop() {
  updateGame();
  drawGame();
  setTimeout(gameLoop, 100); // Adjust speed with timeout
}

// Start the game
resetGame();
gameLoop();
