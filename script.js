// (A) Canvas
const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");

// (B) Contexto
const box = 32;

// (C) Tamanho da caixa
const width = 16;
const height = 16;

// (D) Snake
let snake = [{ x: 8 * box, y: 8 * box }];

// (E) Direção
let direction = "right";

// (F) Food
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
};

// (G)Função createBG:

function createBG() {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// (H)funcao criar cobrinha:

function createSnake() {
    for (let i = 0; i < snake.length; i++) {
        const gradient = context.createLinearGradient(
            snake[i].x,
            snake[i].y,
            snake[i].x,
            snake[i].y + box
        );
        gradient.addColorStop(0, 'rgba(42,109,18,1)');
        gradient.addColorStop(1, 'rgba(36,255,52,1)');
        
        context.fillStyle = gradient;
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// (I)comida:

function createFood() {
    // Gradientes
    const gradient = context.createRadialGradient(
        food.x + box / 2,
        food.y + box / 2,
        0,
        food.x + box / 2,
        food.y + box / 2,
        box / 2
    );
    gradient.addColorStop(0.45, "#fc4646");
    gradient.addColorStop(0.50, "#fc6c46");
    gradient.addColorStop(0.83, "#ffffff");

    context.fillStyle = gradient;

    context.fillRect(food.x, food.y, box, box);
}

// (G)update// controles:

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

// (H)começo de tudo(START):

function startGame() {
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 15 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 15 * box;

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        // A cobra comeu a comida
        food = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box,
        };
    } else {
        // A cobra não comeu a comida
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY,
    };

    snake.unshift(newHead);

    createBG();
    createSnake();
    createFood();
}

// (I) Event Listener do Rafael
document.addEventListener("keydown", update);

//velocidade(mais lento)

let game = setInterval(startGame, 200);