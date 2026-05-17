//Game constants and variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("../music/food.mp3");
const gameOverSound = new Audio("../music/gameover.mp3");
const moveSound = new Audio("../music/move.mp3");
const bgMusic = new Audio("../music/music.mp3");

// let board = document.getElementById("board");

let speed = 8;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 10, y: 10 };

//Game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}

function isCollide(snakeArr) {
    //collision with wall
    if (snakeArr[0].x === 0 || snakeArr[0].x === 18 || snakeArr[0].y <= 0 || snakeArr[0].y >= 18){
        return true;
    }
    //if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }   
    }
    return false;
}

function move(){
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
}

function gameEngine() {
    //part 1: updating snake array and food
    
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        // bgMusic.pause();
        inputDir = { x: 0, y: 0 }
        alert("Game over. Press any key to continue");
        snakeArr = [{ x: 13, y: 15 }];
        // bgMusic.play();
        score = 0;
    }

    //if food eaten, increase the length of snake, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > highScoreVal){
            highScoreVal = score;
            localStorage.setItem('highScore', JSON.stringify(highScoreVal));
            highScoreBox.innerHTML = `High Score: ${highScoreVal}`;
        }
        scoreBox.innerHTML= `Score: ${score}`;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    //moving the snake
    move();

    //part 2: display the snake and food
    //displaying the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add("head");
        } 
        else {
            snakeElement.classList.add("snake-body");
        }
        board.appendChild(snakeElement);
    });

    //displaying the food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}





//main logic starts here
let highScore = localStorage.getItem('highScore');
if(highScore === null){
    highScoreVal = 0;
    localStorage.setItem('highScore', JSON.stringify(highScoreVal));
}
else{
    highScoreVal = JSON.parse(highScore);
    highScoreBox.innerHTML= `High Score: ${highScoreVal}`;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
    // inputDir = { x: 0, y: 1 }; //start game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            if (inputDir.y != 1){
                inputDir.x = 0;
                inputDir.y = -1;
            }
            break;

        case "ArrowDown":
            if (inputDir.y != -1){
                inputDir.x = 0;
                inputDir.y = 1;
            }
            break;

        case "ArrowLeft":
            if(inputDir.x != 1){
                inputDir.x = -1;
                inputDir.y = 0;
            }
            break;

        case "ArrowRight":
            if(inputDir.x != -1){
                inputDir.x = 1;
                inputDir.y = 0;
            }
            break;

        default:
            break;
    }
    console.log(snakeArr.length);
    
});
