const gameBoard = (() => {

    const gameboard = ['1','2','3','4','5','6','7','8','9'];
    const gameBoardDiv = document.querySelector('.game-board');

    const drawCell = (cell) => {

        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        gameBoardDiv.appendChild(cellElement);

    }

    const drawGameBoard = (arr) => {
        while (gameBoardDiv.childElementCount > 0) {
            gameBoardDiv.removeChild(gameBoardDiv.lastChild);
        }
        arr.forEach( cell => drawCell(cell));

    }

    return { drawGameBoard, gameboard };

})();

const new_game = gameBoard.drawGameBoard(gameBoard.gameboard)

const displayController = (() => {

    const drawSelection = () => {

        
        const gameCells = document.querySelectorAll('.game-board .cell');
        const currentGameboard = gameBoard.gameboard;
        
        gameCells.forEach( gameCell => gameCell.addEventListener('click', (e) => {

            // placeholder way of getting index of gameboard array and placing an X in its position. 
            const index = parseInt(e.target.textContent) - 1;
            currentGameboard[index] = 'X';

            console.log(currentGameboard);
            
            gameBoard.drawGameBoard(currentGameboard); // this returns a value and then the event listener stops listening for further clicks?

        }));

    }

    return { drawSelection };

})();

const new_display = displayController.drawSelection();