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
let players = {
    0: { order: null, input: '', colorB: '#3498db', colorC: '#3498db', inputArr: [] },
    1: { order: null, input: '', colorB: '#B80E65', colorC: '#B80E65', inputArr: [] }
};
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
    for (let key in players) {
        players[key].inputArr = [];
    }
}


function switchContent() {
    switch (currentPlayer) {
        case (0):
            playerZeroElem.textContent = `Player#1: ${players[0].input}`;
            playerOneElem.textContent = `Player#2: ${players[1].input}`;
            playerZeroElem.style.backgroundColor = players[0].colorB; // Blue for player 1
            playerOneElem.style.backgroundColor = 'transparent';
            break;
        case (1):
            playerZeroElem.textContent = `Player#1: ${players[0].input}`;
            playerOneElem.textContent = `Player#2: ${players[1].input}`;
            playerZeroElem.style.backgroundColor = 'transparent'; // Blue for player 1
            playerOneElem.style.backgroundColor = players[1].colorB;
            break;
        default:
            console.log('Unexpected player');
            break;
    }
}


function playerOrder() {
    if (!gameFlag) {
        console.log(currentPlayer);
        switch (currentPlayer) {
            case (0):
                players[0].input = 'x';
                players[1].input = 'o';
                switchContent()
                break;
            case (1):
                players[0].input = 'o';
                players[1].input = 'x';
                switchContent()
                break;
        }
    }
}


function switchPlayer() {
    if (!gameFlag) {
        turnCounter += 1;
        switch (currentPlayer) {
            case (0):
                currentPlayer = 1;
                switchContent();
                break;
            case (1):
                currentPlayer = 0;
                switchContent();
                break;
        }
    }
}


function removeFirst() {
    if (players[currentPlayer].inputArr.length > 3) {
        boardElement.children[players[currentPlayer].inputArr[0]].textContent = '';
        boardElement.children[players[currentPlayer].inputArr[0]].classList.remove('expiring');
        playerZeroArr.shift();
    }
}


function checkWinCondition() {
    if (players[currentPlayer].inputArr.length === 3) {
        for (let i = 0; i < winConditions.length; i += 1) {
            if (players[currentPlayer].inputArr.every(elem => winConditions[i].includes(elem))) {
                players[currentPlayer].inputArr.forEach(elem => boardElement.children[elem].classList.add('win'));
                gameFlag = true;
                overlayElem.classList.remove('hidden');
                showWinner(players[currentPlayer].input);
                return console.log(`${currentPlayer} has won`);
            }
        }
    }
}


function showWinner(playerInput) {
    winnerTextElem.textContent = `Player#${currentPlayer + 1} (${playerInput}) wins the game in ${turnCounter + 1} steps`;
    winnerElem.style.backgroundColor = players[currentPlayer].colorB;
    winnerElem.style.visibility = 'visible';
    winnerElem.style.width = 'calc(100% - 6px)';
}


Array.from(boardElement.children).forEach((cell, index) => {
    cell.addEventListener('click', () => {
        clickedCell = boardElement.children[index];
        if (!gameFlag && clickedCell.textContent == '') {
            clickedCell.textContent = players[currentPlayer].input;
            players[currentPlayer].inputArr.push(index);
            removeFirst()
            checkWinCondition()
            switchPlayer();
        }
        console.log(index, players[0].inputArr, players[1].inputArr);
    });
});


// function to start/reset game
function initGame() {
    gameFlag = false;
    turnCounter = 0;
    currentPlayer = Math.floor(Math.random() * 2);
    Array.from(boardElement.children).forEach(cell => cell.classList.remove('win'));
    overlayElem.classList.add('hidden');
    winnerElem.style.visibility = 'hidden';
    winnerElem.style.width = '0';
    clearBoard();
    playerOrder();
}

playGameBtnElem.addEventListener('click', initGame);
// initGame();