const colors = ["red", "blue", "green", "black"];
let sequence = [];
let playerSequence = [];
let level = 0; 
let playing = false;
let colorCounter = 0;

let colorsAmount = 4;
let duration_of_color = 500;

const gameBoard = document.getElementById("game-board");
const message = document.getElementById("message");
const colorPicker = document.getElementById("color-picker");
const startButton = document.getElementById("start-button");
const levelDisplay = document.getElementById("level-display");

colorPicker.addEventListener("click", handleColorSelection);
startButton.addEventListener("click", startGame);

function startGame() {
    if (!playing) {
        level = 0;
        playing = true;
        startButton.classList.add("hidden");
        colorPicker.classList.add("hidden");
        levelDisplay.textContent = `Уровень: ${level}`;
        nextLevel();
    }
}

function nextLevel() {
    level++;
    levelDisplay.textContent = `Уровень: ${level}`;
    playerSequence = [];
    message.textContent = "Повторите последовательность:";
    message.classList.remove("hidden");
    sequence = generateSequence();
    playSequence(sequence);
    colorCounter = 0;
}

function generateSequence() {
    const sequence = [];
    sequence.push(getRandomColor());
    for (let i = 1; i < colorsAmount; i++) {
        let color = ""
        while (true) {
            color = getRandomColor()
            if (sequence[sequence.length - 1] != color) {
                break;
            }
        }
        sequence.push(color);
    }
    return sequence;
}

function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function playSequence(sequence) {
    index = 0
    highlightSquare("white")
    const intervalId = setInterval(function() {
        if (index < sequence.length) {
            highlightSquare(sequence[index]);
            index++;
        } else {
          clearInterval(intervalId); 
        }
    }, duration_of_color);

    setTimeout(() => {
        highlightSquare("white");
        message.textContent = "Ваш ход!";
        colorPicker.classList.remove("hidden");
    }, (sequence.length + 1) * duration_of_color);
}

function highlightSquare(color) {
    gameBoard.style.backgroundColor = color;
}

function handleColorSelection(event) {
    if (event.target.tagName === "BUTTON") {
        const selectedColor = event.target.getAttribute("data-color");
        highlightSquare(selectedColor);
        current_user_index = playerSequence.length
        playerSequence.push(selectedColor);
        if (selectedColor != sequence[current_user_index]) {
            endGame(false);
        } else if (current_user_index == sequence.length - 1) {
            endGame(true)
        }
    }
}

function endGame(isWin) {
    playing = false;
    startButton.disabled = false;
    colorPicker.classList.add("hidden"); // Hide the color picker buttons

    if (isWin) {
        message.textContent = "Победа! Вы прошли игру!";
        startButton.classList.remove("hidden");
    } else {
        message.textContent = "Игра окончена. Попробуйте еще раз.";
        startButton.classList.remove("hidden");
    }
}
