// selecting DOM elements
let boardElement = document.querySelector('#board');
let playerZeroElem = document.querySelector('#playerZero');
let playerOneElem = document.querySelector('#playerOne');
let playGameBtnElem = document.querySelector('#playGame');
let overlayElem = document.querySelector('.overlay');
let winnerElem = document.querySelector('#winner');
let winnerTextElem = document.querySelector('#winnerText');

//game Variables
let currentPlayer = undefined;
let playerZero = 0;
let playerOne = 1;
let playerZeroInput = '';
let playerOneInput = '';
let playerZeroArr = new Array;
let playerOneArr = new Array;
let gameFlag = false;
let turnCounter = 0;
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
        playerZeroElem.textContent = `Player#1: ${playerZeroInput}`;
        playerOneElem.textContent = `Player#2: ${playerOneInput}`;
        playerZeroElem.style.backgroundColor = '#3498db'; // Blue for player 1
        playerOneElem.style.backgroundColor = 'transparent'; // Transparent for player 2
    } else {
        console.log(`playerOne starts`);
        playerZeroInput = 'o';
        playerOneInput = 'x';
        playerZeroElem.textContent = `Player#1: ${playerZeroInput}`;
        playerOneElem.textContent = `Player#2: ${playerOneInput}`;
        playerZeroElem.style.backgroundColor = 'transparent'; // Transparent for player 1
        playerOneElem.style.backgroundColor = '#B80E65'; // Blue for player 2
    }
}

// function to switch player turn
function switchPlayer() {
    if (!gameFlag) {
        turnCounter += 1;
        if (currentPlayer != undefined) {
            if (currentPlayer === 0) {
                currentPlayer = 1;
                playerZeroElem.style.backgroundColor = 'transparent'; // Transparent for player 1
                playerOneElem.style.backgroundColor = '#B80E65'; // Blue for player 2
                if (playerOneArr.length === 3) {
                    boardElement.children[playerOneArr[0]].classList.add('expiring');
                }
            } else {
                currentPlayer = 0;
                playerZeroElem.style.backgroundColor = '#3498db'; // Blue for player 1
                playerOneElem.style.backgroundColor = 'transparent'; // Transparent for player 2
                if (playerZeroArr.length === 3) {
                    boardElement.children[playerZeroArr[0]].classList.add('expiring');
                }
            }
        }
    }
}

// function to remove 1st input in case player's input amount >3
function removeFirst() {
    if (playerZeroArr.length > 3) {
        boardElement.children[playerZeroArr[0]].textContent = '';
        boardElement.children[playerZeroArr[0]].classList.remove('expiring');
        playerZeroArr.shift();
    }
    if (playerOneArr.length > 3) {
        boardElement.children[playerOneArr[0]].textContent = '';
        boardElement.children[playerOneArr[0]].classList.remove('expiring');
        playerOneArr.shift();
    }

}

// function to check wincondition
function checkWinCondition() {
    if (playerOneArr.length == 3 || playerZeroArr.length == 3) {
        if (currentPlayer === 0) {
            for (let i = 0; i < winConditions.length; i += 1) {
                if (playerZeroArr.every(elem => winConditions[i].includes(elem))) {
                    playerZeroArr.forEach(elem => boardElement.children[elem].classList.add('win'));
                    gameFlag = true;
                    overlayElem.classList.remove('hidden');
                    showWinner(playerZeroInput);
                    return console.log(`${currentPlayer} has won`);
                }
            }
        } else {
            for (let i = 0; i < winConditions.length; i += 1) {
                if (playerOneArr.every(elem => winConditions[i].includes(elem))) {
                    playerOneArr.forEach(elem => boardElement.children[elem].classList.add('win'));
                    gameFlag = true;
                    overlayElem.classList.remove('hidden');
                    showWinner(playerOneInput);
                    return console.log(`${currentPlayer} has won`);
                }
            }
        }
    }
}

function showWinner(playerInput) {
    winnerTextElem.textContent = `Player#${currentPlayer + 1} (${playerInput}) wins the game in ${turnCounter + 1} steps`;
    if (currentPlayer === 0) {
        winnerElem.style.backgroundColor = '#3498db';
    } else {
        winnerElem.style.backgroundColor = '#B80E65';
    }
    winnerElem.style.backgroundColor =
        winnerElem.style.visibility = 'visible';
    winnerElem.style.width = 'calc(100% - 6px)';
}

// click event that inserts character
Array.from(boardElement.children).forEach((cell, index) => {
    cell.addEventListener('click', () => {
        clickedCell = boardElement.children[index];
        if (!gameFlag && clickedCell.textContent == '') {
            if (currentPlayer === 0) {
                clickedCell.textContent = playerZeroInput;
                playerZeroArr.push(index);
                removeFirst()
                checkWinCondition()
                switchPlayer();
            } else if (currentPlayer === 1) {
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
    gameFlag = false;
    turnCounter = 0;
    Array.from(boardElement.children).forEach(cell => cell.classList.remove('win'));
    overlayElem.classList.add('hidden');
    winnerElem.style.visibility = 'hidden';
    winnerElem.style.width = '0';
}

playGameBtnElem.addEventListener('click', initGame);
// initGame();