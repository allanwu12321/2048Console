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

// asks user for input
function getMove() {
    rl.question('Enter your move (up, down, left, right): ', function(answer) {
        switch(answer) {
            case 'left':
                moveLeft();
                printBoard();
                break;
            case 'right':
                console.log('R');
                break;
            case 'up':
                console.log('U');
                break;
            case 'down':
                console.log('D');
                break;
        }
        rl.close();
    });
}

// this version of moveLeft will move all the tiles to the left, but will not handle merging yet
function moveLeft(){
    // for each row
    for(let rowIndex = 0; rowIndex < BOARD_SIZE; rowIndex++){
        let row = board[rowIndex];
        // starting from the second tile from the left, find the leftmost tile it can travel to
        for(let i = 1; i < row.length; i++){
            // if there is no tile at this spot in the row, move to the next tile
            if (row[i].tile === 0) {
                continue;
            }
            let moveToIndex = null;
            // find the leftmost tile that this tile can move to
            for(let j = i - 1; j >= 0; j--){
                if(row[j] === 0){
                    moveToIndex = j;
                } else {
                    break;
                }
            }
            // if there is an index to move to
            if (moveToIndex !== null) {
                // move the tile to the spot
                row[moveToIndex] = row[i];
                row[i] = 0;
            }
        }
    }
}

function printBoard(){
    // for each row in board, print the row
    board.forEach(function(row){
        console.log(row.join(" "));
    });
}

initialize();
printBoard();
getMove();