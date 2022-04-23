/** ****************************
 * Bytecode to send to the massa network that push the `helloworld`
 * smartcontract.
 *
 * N.B. The entry file of your Massa Smart Contract program should be named
 * `src/main.ts`, the command `yarn bundle` will produce an `build/main.wasm`
 * which is ready to be send on Massa network node!
 **/

import { generate_event, include_base64, create_sc } from "massa-sc-std";

function createContract(): string {
    const bytes = include_base64('./build/smart-contract.wasm');
    const sc_address = create_sc(bytes);
    return sc_address;
}
 
export function main(_args: string): i32 {
    const sc_address = createContract();
    generate_event("Created tictactoe smart-contract at:" + sc_address);
    return 0;
}
