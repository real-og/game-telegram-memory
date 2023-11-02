const colors = ["red", "blue", "green", "black"];
let sequence = [];
let playerSequence = [];
let level = 1; // Start at level 1
let playing = false;
let colorCounter = 0;

const gameBoard = document.getElementById("game-board");
const message = document.getElementById("message");
const colorPicker = document.getElementById("color-picker");
const startButton = document.getElementById("start-button");
const levelDisplay = document.getElementById("level-display");

gameBoard.addEventListener("click", handleSquareClick);
colorPicker.addEventListener("click", handleColorSelection);
startButton.addEventListener("click", startGame);

function startGame() {
    if (!playing) {
        playing = true;
        startButton.disabled = true;
        colorPicker.classList.add("hidden");
        level = 1; // Reset the level to 1 when starting a new game
        levelDisplay.textContent = `Уровень: ${level}`;
        nextLevel();
    }
}

function nextLevel() {
    playerSequence = [];
    message.textContent = "Повторите последовательность:";
    message.classList.remove("hidden");

    sequence = generateSequence();
    playSequence(0);
    colorCounter = 0; // Reset the color counter
}

function generateSequence() {
    const sequence = [];
    for (let i = 0; i < level; i++) {
        sequence.push(getRandomColor());
    }
    return sequence;
}

function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function playSequence(index) {
    if (index < sequence.length) {
        highlightSquare(sequence[index]);
        setTimeout(() => {
            clearSquare();
            if (index < sequence.length - 1) {
                playSequence(index + 1);
            } else {
                setTimeout(() => {
                    message.textContent = "Ваш ход!";
                    colorPicker.classList.remove("hidden");
                }, 1000);
            }
        }, 1000);
    }
}

function clearSquare() {
    const squares = gameBoard.getElementsByClassName("square");
    while (squares.length > 0) {
        squares[0].parentNode.removeChild(squares[0]);
    }
}

function highlightSquare(color) {
    const square = document.createElement("div");
    square.className = "square";
    square.style.backgroundColor = color;
    square.style.gridArea = "1 / 1 / span 2 / span 2"; // Ensure the square spans the entire cell
    gameBoard.appendChild(square);

    setTimeout(() => {
        square.style.backgroundColor = "transparent";
        gameBoard.removeChild(square);
    }, 500);
}

function handleSquareClick(event) {
    if (playing && event.target.classList.contains("square")) {
        const color = event.target.style.backgroundColor;
        if (color === sequence[colorCounter]) {
            playerSequence.push(color);
            colorCounter++;

            if (colorCounter === sequence.length) {
                if (arraysAreEqual(playerSequence, sequence)) {
                    level++;
                    levelDisplay.textContent = `Уровень: ${level}`;
                    colorPicker.classList.add("hidden");
                    setTimeout(nextLevel, 1000);
                } else {
                    endGame(false);
                }
            }
        } else {
            endGame(false);
        }
    }
}

function handleColorSelection(event) {
    if (event.target.tagName === "BUTTON") {
        const selectedColor = event.target.getAttribute("data-color");
        highlightSquare(selectedColor);
        playerSequence.push(selectedColor);

        if (playerSequence.length === sequence.length) {
            if (arraysAreEqual(playerSequence, sequence)) {
                level++;
                levelDisplay.textContent = `Уровень: ${level}`;
                colorPicker.classList.add("hidden");
                setTimeout(nextLevel, 1000);
            } else {
                endGame(false);
            }
        }
    }
}

function endGame(isWin) {
    playing = false;
    startButton.disabled = false;
    colorPicker.classList.add("hidden"); // Hide the color picker buttons

    if (isWin) {
        message.textContent = "Победа! Вы прошли игру!";
    } else {
        message.textContent = "Игра окончена. Попробуйте еще раз.";
    }

    sequence = [];
    playerSequence = [];
    level = 1; // Reset the level to 1 when the game ends
    levelDisplay.textContent = `Уровень: ${level}`;
    message.classList.remove("hidden");
}
