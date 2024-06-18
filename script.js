// selecting DOM elements
let boardElement = document.querySelector('.board');

//game Variables
let currentPlayer = undefined;
let playerZero = 0;
let playerOne = 1;
let playerZeroInput = '';
let playerOneInput = '';
let playerZeroArr = new Array;
let playerOneArr = new Array;
const winConditions = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6]
];


// function to clear board
function clearBoard() {
    for (child of boardElement.children) {
        child.textContent = '';
    }
}

// randomize for player order, will be needed it future
function playerOrder() {
    currentPlayer = Math.floor(Math.random() * 2);
    if (currentPlayer === playerZero) {
        console.log(`playerZero starts`)
        playerZeroInput = 'x';
        playerOneInput = 'o'; //○
    } else {
        console.log(`playerOne starts`);
        playerZeroInput = 'o';
        playerOneInput = 'x';
    }
}

// function to switch player turn
function switchPlayer() {
    if (currentPlayer != undefined) {
        if (currentPlayer === 0) {
            currentPlayer = 1;
        } else {
            currentPlayer = 0;
        }
    }
}

// function to remove 1st input in case player's input amount >3
function removeFirst() {
    if (playerZeroArr.length > 3) {
        boardElement.children[playerZeroArr[0]].textContent = ''
        playerZeroArr.shift();
    }
    if (playerOneArr.length > 3) {
        boardElement.children[playerOneArr[0]].textContent = ''
        playerOneArr.shift();
    }
}

// function to check wincondition
function checkWinCondition() {
    if (playerOneArr.length == 3 || playerZeroArr.length == 3) {
        if (currentPlayer === 0) {
            for (let i = 0; i < winConditions.length; i += 1) {
                if (playerZeroArr.every(elem => winConditions[i].includes(elem))) {
                    return console.log(`${currentPlayer} has won`)
                }
            }
        } else {
            for (let i = 0; i < winConditions.length; i += 1) {
                if (playerOneArr.every(elem => winConditions[i].includes(elem))) {
                    return console.log(`${currentPlayer} has won`)
                }
            }
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
                playerZeroArr.push(index);
                removeFirst()
                checkWinCondition()
                switchPlayer();
            } else {
                clickedCell.textContent = playerOneInput;
                playerOneArr.push(index);
                removeFirst()
                checkWinCondition()
                switchPlayer();
            }
        }
        console.log(index, playerZeroArr, playerOneArr);
    });
});


// function to start/reset game
function initGame() {
    clearBoard();
    playerOrder();
    playerZeroArr = new Array;
    playerOneArr = new Array;
}

