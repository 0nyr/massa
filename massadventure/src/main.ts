/** ****************************
 * Bytecode to send to the massa network that push the `helloworld`
 * smartcontract.
 *
 * N.B. The entry file of your Massa Smart Contract program should be named
 * `src/main.ts`, the command `yarn bundle` will produce an `build/main.wasm`
 * which is ready to be send on Massa network node!
 **/

import { generate_event, create_sc, include_base64, print, call, Context } from "massa-sc-std";

function createContract(): string {
    const bytes = include_base64('./build/smart-contract.wasm');
    const sc_address = create_sc(bytes);
    return sc_address;
}

export function main(_args: string): i32 {
    // contract params
    const sc_version = "0.1.0";

    // generate smart contract
    const sc_address = createContract();
    generate_event(
        "Created massadventure v" + sc_version + 
        " smart-contract at:" + sc_address
    );

    // call smart contract to initialize game
    //print(call(sc_address, "initializeLevel", "", 0));
    print(`${Context.get_call_stack()[0]}`)

    return 0;
}

