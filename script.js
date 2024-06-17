// selecting DOM elements
let boardElement = document.querySelector('.board');

//game Variables
let currentPlayer = undefined;
let playerZero = 0;
let playerOne = 1;
let playerZeroInput = '';
let playerOneInput = '';

// function to clear board
function clearBoard() {
    for (child of boardElement.children) {
        child.textContent = '';
    }
}

function playerOrder() {
    currentPlayer = Math.floor(Math.random() * 2);
    if (currentPlayer === playerZero) {
        console.log(`playerZero starts`)
        playerZeroInput = 'x';
        playerOneInput = 'o';
    } else {
        console.log(`playerOne starts`);
        playerZeroInput = 'o';
        playerOneInput = 'x';
    }
}

function switchPlayer() {
    if (currentPlayer != undefined) {
        if (currentPlayer === 0) {
            currentPlayer = 1;
        } else {
            currentPlayer = 0;
        }
    }
}

// click event that inserts character
Array.from(boardElement.children).forEach((cell, index) => {
    cell.addEventListener('click', () => {
        clickedCell = boardElement.children[index];
        if (clickedCell.textContent == '') {
            if (currentPlayer === 0) {
                clickedCell.textContent = playerZeroInput;
                switchPlayer();
            } else {
                clickedCell.textContent = playerOneInput;
                switchPlayer();
            }
        }
        console.log(index);
    });
});


// function to start/reset game
function initGame() {
    clearBoard();
    playerOrder();
}

