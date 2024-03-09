const gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
]

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false;

const players = [
    {
        name: '',
        symbol: 'X',
    },
    {
        name: '',
        symbol: 'O',
    },
];

const playerConfigOverlay = document.getElementById("config-overlay");
const backdropElement = document.getElementById("backdrop");
const cancelConfigElement = document.getElementById("cancel-config-btn");
const formElement = document.querySelector("form");
const errorsOutputElement = document.getElementById("config-errors");

const editPlayer1Element = document.getElementById("edit-player1");
const editPlayer2Element = document.getElementById("edit-player2");

const startNewGameButton = document.getElementById("start-game-btn");
const showGameBoard = document.getElementById("active-game");
const activePlayerNameElement = document.getElementById("active-playername");
const gameFieldElements = document.querySelectorAll("#game-board li");

const gameOverElement = document.getElementById('game-over');

editPlayer1Element.addEventListener("click", configPlayer);
editPlayer2Element.addEventListener("click", configPlayer);

cancelConfigElement.addEventListener("click", closePlayerConfig);
backdropElement.addEventListener("click", closePlayerConfig);

formElement.addEventListener("submit", savePlayerConfig);

startNewGameButton.addEventListener("click", startNewGame);

for (const gameFieldElement of gameFieldElements) {
    gameFieldElement.addEventListener('click', selectGameField);
}

