const readline = require("readline");
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const BOARD_SIZE = 4;

let board = [];
let score = 0;

// get the game into it's starting setting
function initialize(){
    // fill our board with 0s
    // for each number up to 4, create a new row
    for(let i = 0; i < BOARD_SIZE; i++){
        // for each row, fill it with 4 0s
        let row = [];
        for(let j = 0; j < BOARD_SIZE; j++){
            row.push(0);
        }
        board[i] = row;
    }
    // generate starting tiles
    generateRandomTile();
    generateRandomTile();
}

// generates a random tile with value 2 or 4 in any free cell
function generateRandomTile(){
    // iterate through the board, and keep track of any cells that are empty
    let emptyCells = [];
    for(let i = 0; i < BOARD_SIZE; i++){
        for(let j = 0; j < BOARD_SIZE; j++){
            // if the board is empty at this spot
            if(board[i][j] === 0){
                // add this coordinate to our emptyCells array
                let coordinate = { x: j, y: i }
                emptyCells.push(coordinate);
            }
        }
    }
    // if there are empty cells, then assign a random one 2 or 4
    if(emptyCells.length !== 0){
        // choose a random empty cell
        let randomCellIndex = Math.floor(Math.random() * emptyCells.length);
        let randomCell = emptyCells[randomCellIndex];
        // 90% chance of 2, 10% chance of 4
        if(Math.random() < .9){
            board[randomCell.y][randomCell.x] = 2;
        } else {
            board[randomCell.y][randomCell.x] = 4;
        }
    }
}

// asks user for input, and make the move that is inputted
function getMove() {
    printBoard();
    rl.question('Enter your move (up, down, left, right): ', function(answer) {
        // for each direction, check if it can move in that direction. If it can't end the function
        switch(answer) {
            case 'left':
                if(canMoveLeft()){
                    moveLeft();
                } else {
                    getMove();
                    return;
                }
                break;
            case 'right':
                if(canMoveRight()){
                    moveRight();
                } else {
                    getMove();
                    return;
                }
                break;
            case 'up':
                if(canMoveUp()){
                    moveUp();
                } else {
                    getMove();
                    return;
                }
                break;
            case 'down':
                if(canMoveDown()){
                    moveDown();
                } else {
                    getMove();
                    return;
                }
                break;
        }
        generateRandomTile();
        getMove();
    });
}

// this version of moveLeft will move to the left and handle merging, but runs into a problem
function moveLeft(){
    // for each row
    for(let rowIndex = 0; rowIndex < BOARD_SIZE; rowIndex++){
        let row = board[rowIndex];
        // create a temporary mergeList for the row
        let mergeList = [];
        // starting from the second tile from the left, find the leftmost tile it can travel to
        for(let i = 1; i < row.length; i++){
            // if there is no tile at this spot in the row, move to the next tile
            if (row[i].tile === 0) {
                continue;
            }
            let moveToIndex = null;
            // find the leftmost tile that this tile can move to
            for(let j = i - 1; j >= 0; j--){
                // if the tile is empty, or has the same value as row[i]
                if(row[j] === 0 || 
                    (row[j] === row[i] && !mergeList.includes(j)) ){
                    moveToIndex = j;
                } else {
                    break;
                }
            }
            // if there is an index to move to
            if (moveToIndex !== null) {
                // move the tile to the spot or merge it
                if(row[moveToIndex] === 0){
                    row[moveToIndex] = row[i];
                    row[i] = 0;
                } else {
                    // merge the tiles and add to mergeList
                    row[moveToIndex] = row[i] + row[moveToIndex];
                    row[i] = 0;
                    mergeList.push(moveToIndex);
                }
                
            }
        }
    }
}

// reverses the board contents
function reverse() {
    board.forEach(function (row) {
        row = row.reverse();
    });
}

// transposes the board contents
function transpose() {
    for(let i = 0; i < BOARD_SIZE; i++) {
        // We only want to swap up until the center
        for(let j = 0; j < i; j++){
            // swaps the corresponding values
            let temp = board[i][j];
            board[i][j] = board[j][i];
            board[j][i] = temp;
        }
    }
}

// moveRight will reuse moveLeft but reverse the board first
function moveRight(){
    reverse();
    moveLeft();
    reverse();
}

// moveUp requires a transposition instead of a reversal
function moveUp() {
    transpose();
    moveLeft();
    transpose();
}

// moveDown requires both a transposition and a reversal. However, reverse before transposing to return to original
function moveDown() {
    transpose();
    reverse();
    moveLeft();
    reverse();
    transpose();
}

// we need functions to check if we can move in a direction before moving
function canMoveLeft(){
    for(let row = 0; row < BOARD_SIZE; row++){
        for(let col = 1; col < board[row].length; col++){
            let current = board[row][col];
            let left = board[row][col - 1];
            if(current !== 0){
                if(left === 0 || left === current){
                    return true;
                }
                else {
                    continue;
                }
            }
        }
    }
    return false; 
}

function canMoveRight(){
    reverse();
    let canMove = canMoveLeft();
    reverse();
    return canMove;
}

function canMoveUp(){
    transpose();
    let canMove = canMoveLeft();
    transpose();
    return canMove;
}

function canMoveDown(){
    transpose()
    reverse();
    let canMove = canMoveLeft();
    reverse();
    transpose();
    return canMove;
}

function printBoard(){
    // comment console.clear out when testing
    // console.clear();
    // for each row in board, print the row
    board.forEach(function(row){
        console.log(row.join(" "));
    });
}

function main(){
    initialize();
    getMove();
}

main();

// If you need to test, comment main and test below

// initialize();
// board[0] = [4, 2, 4, 2];
// printBoard();
// getMove();