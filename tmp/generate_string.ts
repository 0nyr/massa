import * as fs from 'fs';

var boardWidth = 10;
var boardHeight = boardWidth;

let string: string = "";
for(let i = 0; i < boardWidth*boardHeight; i++) {
    string += " ";
}

// save string to a file
fs.writeFileSync("string.txt", string);

