/** ***********************
 * Smart contract exporting a public function `helloworld`
 *
 * N.B. The entry file of your AssemblyScript program should be named
 * `src/smart-contract.ts`, the command `yarn build` will produce an
 * `build/smart-contract.wasm` WASM binary!
 **/
import { Storage, generate_event, generate_event } from "massa-sc-std";
import { JSON } from "json-as";

export function testHelloWorld(_args: string): void {
    generate_event("Hello World from Massadventure :)");
}

function stringifyArray(array: Array<Array<string>>): string {
    let result = "";
    for (let i = 0; i < array.length; i++) {
        for(let j = 0; j < array[0].length; j++) {
            result += array[i][j];
        }
    }
    return result;
}

// tester: $ cargo run /home/onyr/Documents/code/massa/massadventure/build/smart-contract.wasm function="initializeLevel" param=""
export function initializeLevel(_args: string): void {
    // board initialization
    const boardWidth = 10;
    const boardHeight = boardWidth; 

    let board: Array<Array<string>> = [];

    for (let i = 0; i < boardWidth; i++) {
        board.push([]);
        for(let j = 0; j < boardHeight; j++) {
            //board[i][j] = " ";
            board[i].push(" ");
        }   
    }

    // save empty board
    Storage.set_data("board", JSON.stringify(board));
    //generate_event("board initialized: " + JSON.stringify(board));

    // save player coordinates
    Storage.set_data("player", JSON.stringify([0, 0]));

    generate_event(
        "Called initializeLevel from massadventure!" + "\n" + 
        `Board width: ${board[0].length} \n` +
        `Board height: ${board.length} \n` +
        "Board initialized: " + JSON.stringify(board) + "\n" +
        "Player coordinates: " + JSON.stringify([0, 0]) + "\n"
    );

}

export function getBoard(): string {
    return Storage.get_data("board");
}

@json
export class MoveArgs {
    // 0: STAY, 1: UP, 2: LEFT, 3: DOWN, 4: RIGHT
    direction: u32 = 0;
}


// tester: $ cargo run /home/onyr/Documents/code/massa/massadventure/build/smart-contract.wasm function="move" param="{ 'direction': 3 }"
// WARN: The spaces are important for the massa tester !!!
export function move(_args: string): void {
    const args = JSON.parse<MoveArgs>(_args);
    generate_event(
        `Called 'move' from massadventure!` + '\n' +
        `Direction: ${args.direction}` + '\n'
    );

    // get board
    let board: Array<Array<string>> = JSON.parse<Array<Array<string>>>(Storage.get_data("board"));
    generate_event(
        "Board obtained from store \n" +
        `Board width: ${board[0].length} \n` +
        `Board height: ${board.length} \n` +
        "Board: " + JSON.stringify(board) + "\n"
    );

    // get player coordinates
    let player: i32[] = JSON.parse<i32[]>(Storage.get_data("player"));
    assert(player[0] >= 0 && player[0] < board.length);
    assert(player[1] >= 0 && player[1] < board[0].length);

    // argument parsing
    assert(args.direction >= 0 && args.direction <= 4);

    // move player if possible
    if(args.direction == 0) {
        // stay
        generate_event("player stays");
    } else if(args.direction == 1) {
        // up
        if(player[1] > 0 && player[1] < board.length) {
            player[1] -= 1;
            generate_event("player moves up");
        } else {
            generate_event("player cannot move up");
        }
    } else if(args.direction == 2) {
        // left
        if(player[0] > 0 && player[0] < board[0].length) {
            player[0] -= 1;
            generate_event("player moves left");
        } else {
            generate_event("player cannot move left");
        }
    } else if(args.direction == 3) {
        // down
        if(player[1] >= 0 && player[1] < board.length - 1) {
            player[1] += 1;
            generate_event("player moves down");
        } else {
            generate_event("player cannot move down");
        }
    } else if(args.direction == 4) {
        // right
        if(player[0] >= 0 && player[0] < board[0].length - 1) {
            player[0] += 1;
            generate_event("player moves right");
        } else {
            generate_event("player cannot move right");
        }
    }

    generate_event(
        "Current player coordinates: " + 
        JSON.stringify(player)
    );
}