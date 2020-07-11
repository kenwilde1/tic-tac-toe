const gameBoard = (() => {

    const gameboard = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
    const gameBoardDiv = document.querySelector('.game-board');

    const drawCell = (cell) => {

        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        gameBoardDiv.appendChild(cellElement);

    }

    const drawGameBoard = (arr) => {
        //while (gameBoardDiv.childElementCount > 0) {
        //    gameBoardDiv.removeChild(gameBoardDiv.lastChild);
        //}
        arr.forEach( cell => drawCell(cell));

    }

    const updateGameBoard = (e, index, selection) => {

        e.textContent = selection;
        gameboard[index] = selection;      

        console.log(gameboard);

    }

    return { drawGameBoard, gameboard, updateGameBoard };

})();

const new_game = gameBoard.drawGameBoard(gameBoard.gameboard)

const Player = (name, selection) => {

    let score = 0;

    const setScore = (n) => {
        const getScore = document.querySelector('.playerOneScore');
        getScore.textContent = `Score: ${n}`;
    }

    const setName = (name) {
        
    }

    const getName = (name) => {
        name;
    }

    const getSelection = () => {
        selection;
    }

    return { setScore, getName, score, selection};
}


const displayController = (() => {



    const drawSelection = () => {

        const gameCells = Array.from(document.querySelectorAll('.game-board .cell'));

        for (i = 0; i < gameCells.length; i++) {
            gameCells[i].id = `${[i]}`;
        }



        gameCells.forEach( cell => cell.addEventListener('click', (e) => {
            const index = e.target.id;
            gameBoard.updateGameBoard(e.target, index, "X");
        }));
    }





    return { drawSelection };

})();

const new_display = displayController.drawSelection();