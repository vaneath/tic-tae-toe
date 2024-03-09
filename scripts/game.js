function resetGameData() {
    activePlayer = 0;
    currentRound = 1;
    gameIsOver = false;

    for (let gameFieldElement of gameFieldElements) {
        gameFieldElement.textContent = "";
        gameFieldElement.removeAttribute('class');
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameData[i][j] = 0;
        }
    }

    gameOverElement.firstElementChild.innerHTML = 'You won, <span id="winner-playername">PLAYER NAME</span>!';
    gameOverElement.style.display = 'none';
}

function startNewGame() {
    resetGameData();

    if (players[0].name === "" || players[1].name === "") {
        alert("Please input name for both players to start a game!");
        return;
    }
    if (players[0].name === players[1].name) {
        alert("Please input different name between player 1 and player 2!");
        return;
    }
    activePlayerNameElement.textContent = players[activePlayer].name;

    showGameBoard.style.display = "block";
}

function switchPlayer() {
    activePlayer = (activePlayer === 0) ? 1 : 0;

    activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
    if (gameIsOver) {
        return;
    }

    const selectedField = event.target;
    const selectedColumn = selectedField.dataset.col - 1;
    const selectedRow = selectedField.dataset.row - 1;

    if (gameData[selectedRow][selectedColumn] > 0) {
        alert("This field is already selected!");
        return;
    }

    selectedField.textContent = players[activePlayer].symbol;
    selectedField.classList.add("disabled");

    gameData[selectedRow][selectedColumn] = activePlayer + 1;
    console.log(gameData);

    const [winnerId, winningLine] = checkForGameOver();

    if (winnerId !== 0) {
        endGame(winnerId, winningLine);
    }

    // check the round
    currentRound++;

    switchPlayer();
}

function checkForGameOver() {

    for (let i = 0; i < 3; i++) {
        // Check every row
        if (
            (gameData[i][0] == gameData[i][1] && gameData[i][0] == gameData[i][2]) > 0
        ) {
            const winningLine = [
                gameFieldElements[i * 3],
                gameFieldElements[i * 3 + 1],
                gameFieldElements[i * 3 + 2],
            ];
            return [gameData[i][0], winningLine];
        }

        // Check every column
        if (
            (gameData[0][i] == gameData[1][i] && gameData[0][i] == gameData[2][i]) > 0
        ) {
            const winningLine = [
                gameFieldElements[i],
                gameFieldElements[i + 3],
                gameFieldElements[i + 6],
            ];
            return [gameData[0][i], winningLine];
        }
    }

    // Check top left to bottom right
    if (
        (gameData[0][0] == gameData[1][1] && gameData[0][0] == gameData[2][2]) > 0
    ) {
        const winningLine = [
            gameFieldElements[0],
            gameFieldElements[4],
            gameFieldElements[8],
        ];
        return [gameData[1][1], winningLine];
    }

    // Check top right to bottom left
    if (
        (gameData[0][2] == gameData[1][1] && gameData[0][2] == gameData[2][0]) > 0
    ) {
        const winningLine = [
            gameFieldElements[2],
            gameFieldElements[4],
            gameFieldElements[6],
        ];
        return [gameData[1][1], winningLine];
    }
    if (currentRound === 9) {
        return [-1, null];
    }
    return [0, null];
}

function endGame(winnerId, winningLine) {
    gameIsOver = true;
    gameOverElement.style.display = 'block';

    if (winnerId > 0) {
        const winnerName = players[winnerId - 1].name;
        gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;

        // highlight the winning line
        for (const field of winningLine) {
            field.classList.add("winner");
        }
    } else {
        gameOverElement.firstElementChild.textContent = 'It\' a draw!';
    }
    for (const gameFieldElement of gameFieldElements) {
        gameFieldElement.classList.add("disabled");
    }

    return;
}
