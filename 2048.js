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
                console.log('L');
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

function printBoard(){
    // for each row in board, print the row
    board.forEach(function(row){
        console.log(row.join(" "));
    });
}

initialize();
printBoard();
getMove();