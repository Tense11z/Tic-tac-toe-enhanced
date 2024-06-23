// selecting DOM elements
const boardElement = document.querySelector('#board');
const playerZeroElem = document.querySelector('#playerZero');
const playerOneElem = document.querySelector('#playerOne');
const playGameBtnElem = document.querySelector('#playGame');
const overlayElem = document.querySelector('.overlay');
const winnerElem = document.querySelector('#winner');
const winnerTextElem = document.querySelector('#winnerText');

//game Variables
let currentPlayer = undefined;
let gameFlag = false;
let turnCounter = 0;
let players = {
    0: { input: '', colorB: '#3498db', colorC: '#3498db', inputArr: [] },
    1: { input: '', colorB: '#B80E65', colorC: '#B80E65', inputArr: [] }
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


// function to clear board and players' input arrays
function clearBoard() {
    for (child of boardElement.children) {
        child.textContent = '';
    }
    for (let key in players) {
        players[key].inputArr = [];
    }
}


// function to display player inputs and switch background colors
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


// function to define player inputs & order
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


// function to switch players' turn
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
        if (players[currentPlayer].inputArr.length === 3) {
            boardElement.children[players[currentPlayer].inputArr[0]].classList.add('expiring');
        }
    }
}


// function that resets div content which position == 0 in players' array
function removeFirst() {
    if (players[currentPlayer].inputArr.length > 3) {
        boardElement.children[players[currentPlayer].inputArr[0]].textContent = '';
        boardElement.children[players[currentPlayer].inputArr[0]].classList.remove('expiring');
        players[currentPlayer].inputArr.shift();
    }
}


// function to check win conditions
function checkWinCondition() {
    if (players[currentPlayer].inputArr.length === 3) {
        for (let i = 0; i < winConditions.length; i += 1) {
            if (players[currentPlayer].inputArr.every(elem => winConditions[i].includes(elem))) {
                players[currentPlayer].inputArr.forEach(elem => boardElement.children[elem].classList.add('win'));
                gameFlag = true;
                overlayElem.classList.remove('hidden');
                showWinner(players[currentPlayer].input);
            }
        }
    }
}


// function to display win message
function showWinner(playerInput) {
    winnerTextElem.textContent = `Player#${currentPlayer + 1} (${playerInput}) wins the game in ${turnCounter + 1} steps`;
    winnerElem.style.backgroundColor = players[currentPlayer].colorB;
    winnerElem.style.visibility = 'visible';
    winnerElem.style.width = 'calc(100% - 6px)';
}


// function to receive player input by clicking the div
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

// event listener for button to start game
playGameBtnElem.addEventListener('click', initGame);