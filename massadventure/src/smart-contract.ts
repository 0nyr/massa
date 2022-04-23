/** ***********************
 * Smart contract exporting a public function `helloworld`
 *
 * N.B. The entry file of your AssemblyScript program should be named
 * `src/smart-contract.ts`, the command `yarn build` will produce an
 * `build/smart-contract.wasm` WASM binary!
 **/
import { Storage } from "massa-sc-std";
import { JSON } from "json-as";

export function initializeLevel(_args: string): void {
    // board initialization
    var boardWidth = 10;
    var boardHeight = boardWidth; 

    let board: Array<Array<string>> = [];

    for (let i = 0; i < boardWidth; i++) {
        for(let j = 0; j < boardHeight; j++) {
            board[i][j] = " ";
        }
    }

    // save empty board
    Storage.set_data("board", JSON.stringify(board));
    console.log("board initialized: " + JSON.stringify(board));

    // save player coordinates
    Storage.set_data("player", JSON.stringify([0, 0]));
}

@json
export class MoveArgs {
    // 0: STAY, 1: UP, 2: LEFT, 3: DOWN, 4: RIGHT
    direction: u32 = 0;
}

export function move(_args: string): void {
    const args = JSON.parse<MoveArgs>(_args);

    // get board
    let board: string[][] = JSON.parse<Array<Array<string>>>(Storage.get_data("board"));

    // get player coordinates
    let player: i32[] = JSON.parse<i32[]>(Storage.get_data("player"));
    assert(player[0] >= 0 && player[0] < board.length);
    assert(player[1] >= 0 && player[1] < board[0].length);

    // argument parsing
    assert(args.direction >= 0 && args.direction <= 4);

    // move player if possible
    if(args.direction == 0) {
        // stay
        console.log("player stays");
    } else if(args.direction == 1) {
        // up
        if(player[1] > 0 && player[1] < board.length) {
            player[1] -= 1;
            console.log("player moves up");
        } else {
            console.log("player cannot move up");
        }
    } else if(args.direction == 2) {
        // left
        if(player[0] > 0 && player[0] < board[0].length) {
            player[0] -= 1;
            console.log("player moves left");
        } else {
            console.log("player cannot move left");
        }
    } else if(args.direction == 3) {
        // down
        if(player[1] >= 0 && player[1] < board.length - 1) {
            player[1] += 1;
            console.log("player moves down");
        } else {
            console.log("player cannot move down");
        }
    } else if(args.direction == 4) {
        // right
        if(player[0] >= 0 && player[0] < board[0].length - 1) {
            player[0] += 1;
            console.log("player moves right");
        } else {
            console.log("player cannot move right");
        }
    }
}