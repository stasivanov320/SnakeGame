const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let direction = "RIGHT";
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};
let score = 0;
let gameOver = false;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const key = event.key;
    if (key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    else if (key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function draw() {
    if (gameOver) {
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over! Press R to restart", 50, canvas.height / 2);
        return;
    }

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenează mâncarea
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Desenează șarpele
    ctx.fillStyle = "green";
    snake.forEach((segment, index) => {
        ctx.fillRect(segment.x, segment.y, box, box);
    });

    // Afișează scorul
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Scor: " + score, 10, 30);
}

function update() {
    if (gameOver) return;

    let newX = snake[0].x;
    let newY = snake[0].y;

    if (direction === "UP") newY -= box;
    if (direction === "DOWN") newY += box;
    if (direction === "LEFT") newX -= box;
    if (direction === "RIGHT") newX += box;

    if (newX === food.x && newY === food.y) {
        score += 10;
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }

    const newHead = { x: newX, y: newY };

    if (collision(newHead)) {
        gameOver = true;
    }

    snake.unshift(newHead);
}

function collision(head) {
    return (
        head.x < 0 ||
        head.x >= canvas.width ||
        head.y < 0 ||
        head.y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
}

document.addEventListener("keydown", (event) => {
    if (event.key === "r" || event.key === "R") {
        resetGame();
    }
});

function resetGame() {
    snake = [{ x: 10 * box, y: 10 * box }];
    direction = "RIGHT";
    score = 0;
    gameOver = false;
    food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };
    gameLoop();
}

function gameLoop() {
    update();
    draw();
    if (!gameOver) setTimeout(gameLoop, 100);
}

gameLoop();
