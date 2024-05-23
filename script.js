let snake;
let food;
let gridSize = 20;
let score = 0; // Add a score variable

function setup() {
  createCanvas(400, 400);
  frameRate(2); // Adjust frame rate for game speed
  snake = new Snake();
  food = createFood();
}

function draw() {
  background(51); // Change background color to a darker shade
  snake.update();
  snake.show();

  if (snake.eat(food)) {
    score++; // Increase score when snake eats food
    food = createFood();
  }

  // Display score
  fill(255);
  textSize(18);
  textAlign(RIGHT);
  text('Score: ' + score, width - 10, 20);

  if (snake.endGame()) {
    background(255, 0, 0);
    noLoop();
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(255);
    text('Game Over!', width / 2, height / 2);
  }

  noStroke();
  fill(255, 0, 0);
  ellipse(food.x + gridSize / 2, food.y + gridSize / 2, gridSize); // Change food to ellipse for visual enhancement
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.setDirection(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.setDirection(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    snake.setDirection(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    snake.setDirection(-1, 0);
  }
}

function createFood() {
  let cols = floor(width / gridSize);
  let rows = floor(height / gridSize);
  return createVector(floor(random(cols)) * gridSize, floor(random(rows)) * gridSize); // Adjust food position to align with grid
}

class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(floor(width / 2), floor(height / 2));
    this.xdir = 0;
    this.ydir = 0;
    this.length = 0;
  }

  setDirection(x, y) {
    this.xdir = x;
    this.ydir = y;
  }

  update() {
    let head = this.body[this.body.length - 1].copy();
    this.body.shift();
    head.x += this.xdir * gridSize;
    head.y += this.ydir * gridSize;
    this.body.push(head);
  }

  grow() {
    let head = this.body[this.body.length - 1].copy();
    head.x += this.xdir * gridSize;
    head.y += this.ydir * gridSize;
    this.length++;
    this.body.push(head);
  }

  eat(pos) {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if (x === pos.x && y === pos.y) {
      this.grow(); // Do not grow snake upon eating food
      return true;
    }
    return false;
  }

  endGame() {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if (x > width - 1 || x < 0 || y > height - 1 || y < 0) {
      return true;
    }
    for (let i = 0; i < this.body.length - 1; i++) {
      let part = this.body[i];
      if (part.x === x && part.y === y) {
        return true;
      }
    }
    return false;
  }

  show() {
    for (let i = 0; i < this.body.length; i++) {
      fill(0, 255, 0); // Change snake color to green
      noStroke();
      rect(this.body[i].x, this.body[i].y, gridSize, gridSize);
    }
  }
}
