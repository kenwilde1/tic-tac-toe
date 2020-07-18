const gameBoard = (() => {

    const gameBoardDiv = document.querySelector('.game-board');

    const drawCell = (cell) => {

        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        gameBoardDiv.appendChild(cellElement);

    }

    const drawGameBoard = (gameboard) => {

        while (gameBoardDiv.childElementCount > 0) {
            gameBoardDiv.removeChild(gameBoardDiv.lastChild);
        }
        
        gameboard.forEach( cell => drawCell(cell));

    }

    const updateGameBoard = (e, index, selection, arr) => {

        e.textContent = selection;
        arr[index] = selection;
        
    }

    const endGame = (p, result) => {

        while (gameBoardDiv.childElementCount > 0) {
            gameBoardDiv.removeChild(gameBoardDiv.lastChild);
        }

        const endGameDiv = document.createElement('div');
        const endGameHeader = document.createElement('h2');

        if(result == "Win") {
            endGameHeader.textContent = `Game Over! ${p.name} won!`;
            p.setScore(1);
            game.updateScoreTally(p);
        }else if(result == "Draw") {
            endGameHeader.textContent = `Game Over! It's a Tie!`;
        }
        
        endGameDiv.appendChild(endGameHeader);

        const restartButton = document.createElement('button');
        restartButton.textContent = "Restart Game";

        endGameDiv.appendChild(restartButton);
        gameBoardDiv.appendChild(endGameDiv);

        restartButton.addEventListener('click', game.playGame);

    }

    return { drawGameBoard, updateGameBoard, endGame };

})();

const Player = (name, selection) => {

    let score = 0;
    this.selection = selection;

    const setName = (newName) => {
        name = newName || "Player";
    } 

    const setMarker = (marker) => {
        selection = marker;
    }

    const getScore = () => {
        return score;
    }

    const setScore = (n) => {
        score += n;
    }

    return { setScore, name, selection, getScore, setName, setMarker };
}

const displayController = (() => {

    let playerName = "Player 1";
    let playerSelection = "X";
    let playerOne = Player(playerName, playerSelection);

    let playerNameTwo = "Player 2";        
    let playerSelectionTwo = "O";    
    let playerTwo = Player(playerNameTwo, playerSelectionTwo);
    let currentPlayer = playerOne;

    const drawSelection = (arr) => {

        currentPlayer = playerOne;

        const gameCells = Array.from(document.querySelectorAll('.game-board .cell'));

        for (i = 0; i < gameCells.length; i++) {
            gameCells[i].id = `${[i]}`;
        }

        gameCells.forEach( cell => cell.addEventListener('click', (e) => {
            
            const index = e.target.id;
            if (e.target.textContent == " ") {
                gameBoard.updateGameBoard(e.target, index, currentPlayer.selection, arr);
                game.checkWin(arr, currentPlayer);
                changeCurrentPlayer();
            } else {
                alert('Spot already taken! Choose again!');
            }
            
        }));
    }

    const changeCurrentPlayer = () => {

        currentPlayer.name == playerOne.name ? currentPlayer = playerTwo : currentPlayer = playerOne;

    }

    return { drawSelection, currentPlayer, changeCurrentPlayer, playerOne, playerTwo };

})();

const game = (() => {

    const checkWin = (arr, player) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ];

        for (i = 0; i < winningCombinations.length; i++) {
            const combo = winningCombinations[i];
            
            if(arr[combo[0]] == player.selection && arr[combo[1]] == player.selection && arr[combo[2]] == player.selection) {
                gameBoard.endGame(player, "Win");
            }
        }
        if(!arr.includes(' ')) {
            gameBoard.endGame(player, "Draw");
        }

    }

    const updateScoreTally = (p) => {

        console.log(p);

        if (p.name == displayController.playerOne.name) {
            const getScoreFieldOne = document.querySelector('#PlayerOneScore');
            getScoreFieldOne.textContent = `Score: ${p.getScore()}`;
        }else {
            const getScoreFieldTwo = document.querySelector('#PlayerTwoScore');
            getScoreFieldTwo.textContent = `Score: ${p.getScore()}`;
        }
    }

    const playGame = () => {
        const gameboard = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
        gameBoard.drawGameBoard(gameboard);
        displayController.drawSelection(gameboard);
    }

    return { checkWin, playGame, updateScoreTally };

})();

game.playGame();
