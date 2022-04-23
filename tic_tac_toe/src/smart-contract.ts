/** ***********************
 * Smart contract exporting a public function `helloworld`
 *
 * N.B. The entry file of your AssemblyScript program should be named
 * `src/smart-contract.ts`, the command `yarn build` will produce an
 * `build/smart-contract.wasm` WASM binary!
 **/


/**
* Initialize a new tictactoe game
*/
import { Storage } from "massa-sc-std";
import { JSON } from "json-as";

export function initialize(_args: string): void {
    Storage.set_data("currentPlayer", "X");
    Storage.set_data("gameState", "n,n,n,n,n,n,n,n,n");
    Storage.set_data("gameWinner", "n");
}

@json
export class PlayArgs {
    index: u32 = 0;
}

export function play(_args: string): void {
    const args = JSON.parse<PlayArgs>(_args);
    let game_winner = Storage.get_data("gameWinner");
    if (game_winner == "n") {
        let player = Storage.get_data("currentPlayer");
        let game_state = Storage.get_data("gameState");
        let vec_game_state = game_state.split(",");
        assert(args.index >= 0);
        assert(args.index < 9);
        if (vec_game_state[args.index] == "n") {
            vec_game_state[args.index] = player;
            Storage.set_data("gameState", vec_game_state.join());
            if (player == "X") {
                Storage.set_data("currentPlayer", "O");
            }
            else {
                Storage.set_data("currentPlayer", "X");
            }
            _checkWin(player)
        }
    }
}

function _checkWin(player: string): void {
    const winningConditions = [
        // winning index on the row representing the game
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let game_state = Storage.get_data("gameState");
    let vec_game_state = game_state.split(",");

    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = vec_game_state[winCondition[0]];
        let b = vec_game_state[winCondition[1]];
        let c = vec_game_state[winCondition[2]];
        if (a == "n" || b == "n" || c == "n") {
            continue;
        }
        if (a == b && b == c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        Storage.set_data("gameWinner", player);
    }

    let roundDraw = !vec_game_state.includes("n");
    if (roundDraw) {
        Storage.set_data("gameWinner", "draw");
    }
}

