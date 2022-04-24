# LOGS

## Deployment

Deploy a smart contract to the MASSA blockchain, then check the transaction:

```shell
✔ command · send_smart_contract 2J3v9G2D9FAEjm3Khnj2W54ns9sZ6Zqgb4zkdHaP8zuTt5DY5c /home/onyr/Documents/code/massa/massadventure/build/main.wasm 100000000 0 0 0
Sent operation IDs:
AXcceC7TwEPk6CDFcdGVPaBdvvVMqWpYTvmGo9y1xPxnTT7Wb
? command › get_f
get_filtered_sc_output_event
✔ command · get_filtered_sc_output_event operation_id=AXcceC7TwEPk6CDFcdGVPaBdvvVMqWpYTvmGo9y1xPxnTT7Wb
✔ command · get_filtered_sc_output_event operation_id=AXcceC7TwEPk6CDFcdGVPaBdvvVMqWpYTvmGo9y1xPxnTT7Wb
Context: Slot: (period: 7769, thread: 21) at index: 2
On chain execution
Block id: 2cJp7u7z7F7dkKAbAWvKfCbDQAX2rfGZehuVRHVGerFsrYps6D
Origin operation id: AXcceC7TwEPk6CDFcdGVPaBdvvVMqWpYTvmGo9y1xPxnTT7Wb
Call stack: 2J3v9G2D9FAEjm3Khnj2W54ns9sZ6Zqgb4zkdHaP8zuTt5DY5c

Data: Created massadventure v0.1.0 smart-contract at:2VKFKazKJkNr1sH2etijbJ8AWJZrg1NfoaAMhcqgMjBw9Acggh
```

## Testing and calling functions

### Using the massa tester

Using the massa tester:

```shell
(base)  ❮ onyr ★  kenzae❯ ❮ massa-sc-tester❯❯ cargo run /home/onyr/Documents/code/massa/massadventure/build/smart-contract.wasm function="initializeLevel" param=""
   Compiling massa-sc-test v0.1.0 (/home/onyr/Documents/code/massa_hackaton/massa-sc-tester)
    Finished dev [unoptimized + debuginfo] target(s) in 8.80s
     Running `target/debug/massa-sc-test /home/onyr/Documents/code/massa/massadventure/build/smart-contract.wasm function=initializeLevel param=`
4
run /home/onyr/Documents/code/massa/massadventure/build/smart-contract.wasm
Event sent: Called initializeLevel from massadventure!Board initialized: [[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[]]Player coordinates: [0,0]
remaining points: 999999551311

```

Using the massa tester on more complex arguments:

```typescript
@json
export class MoveArgs {
    // 0: STAY, 1: UP, 2: LEFT, 3: DOWN, 4: RIGHT
    direction: u32 = 0;
}

export function move(_args: string): void {
    const args = JSON.parse<MoveArgs>(_args);
    generate_event(
        `Called 'move' from massadventure!` + '\n' +
        `Direction: ${args.direction}` + '\n'
    );
```

> WARN: The spaces are important for the massa tester !!!

```shell
(base)  ❮ onyr ★  kenzae❯ ❮ massa-sc-tester❯❯ cargo run /home/onyr/Documents/code/massa/massadventure/build/smart-contract.wasm function="move" param="{ 'direction': 3 }"
    Finished dev [unoptimized + debuginfo] target(s) in 0.08s
     Running `target/debug/massa-sc-test /home/onyr/Documents/code/massa/massadventure/build/smart-contract.wasm function=move 'param={ '\''direction'\'': 3 }'`
4
run /home/onyr/Documents/code/massa/massadventure/build/smart-contract.wasm
Event sent: Called 'move' from massadventure!
Direction: 3

remaining points: 999999980651

```


### Using the deployed contract

#### Calling simple function with no params

Use directly the **massa-client terminal:**

```shell
✔ command · call_smart_contract 2J3v9G2D9FAEjm3Khnj2W54ns9sZ6Zqgb4zkdHaP8zuTt5DY5c 2VKFKazKJkNr1sH2etijbJ8AWJZrg1NfoaAMhcqgMjBw9Acggh testHelloWorld "" 1000000 0 0 0
Sent operation IDs:
2JMduMgn5c2nvg1WhiAhEiNJZUxJHKnMYZRraYPK26DRCJUzNL
? command › get_f
get_filtered_sc_output_event
✔ command · get_filtered_sc_output_event operation_id=2JMduMgn5c2nvg1WhiAhEiNJZUxJHKnMYZRraYPK26DRCJUzNL
Context: Slot: (period: 7774, thread: 21) at index: 2
On chain execution
Block id: 2q4mbb5LN2AjYJa6T5Ggj9fCC7YpPcuZXRfvFwxoTPZFzdfQ7v
Origin operation id: 2JMduMgn5c2nvg1WhiAhEiNJZUxJHKnMYZRraYPK26DRCJUzNL
Call stack: 2J3v9G2D9FAEjm3Khnj2W54ns9sZ6Zqgb4zkdHaP8zuTt5DY5c,2VKFKazKJkNr1sH2etijbJ8AWJZrg1NfoaAMhcqgMjBw9Acggh

Data: Hello World from Massadventure :)

✔ command · call_smart_contract 2J3v9G2D9FAEjm3Khnj2W54ns9sZ6Zqgb4zkdHaP8zuTt5DY5c 2VKFKazKJkNr1sH2etijbJ8AWJZrg1NfoaAMhcqgMjBw9Acggh initializeLevel "" 1000000 0 0 0
Sent operation IDs:
2KWnBt5AuyJgzmSLQMCzUsbTZYLryT3xvCoKbcBTUEUbZpGk8w
✔ command · get_filtered_sc_output_event operation_id=2KWnBt5AuyJgzmSLQMCzUsbTZYLryT3xvCoKbcBTUEUbZpGk8w
✔ command · get_filtered_sc_output_event operation_id=2KWnBt5AuyJgzmSLQMCzUsbTZYLryT3xvCoKbcBTUEUbZpGk8w
✔ command · get_filtered_sc_output_event operation_id=2KWnBt5AuyJgzmSLQMCzUsbTZYLryT3xvCoKbcBTUEUbZpGk8w
Context: Slot: (period: 7778, thread: 21) at index: 2
On chain execution
Block id: qMqXRLtVk1B8iiMiuew3HsrHYLbcvDKivhp8xRrf6oeQHL6az
Origin operation id: 2KWnBt5AuyJgzmSLQMCzUsbTZYLryT3xvCoKbcBTUEUbZpGk8w
Call stack: 2J3v9G2D9FAEjm3Khnj2W54ns9sZ6Zqgb4zkdHaP8zuTt5DY5c,2VKFKazKJkNr1sH2etijbJ8AWJZrg1NfoaAMhcqgMjBw9Acggh

Data: Called initializeLevel from massadventure!
Board width: 10 
Board height: 10 
Board initialized: [[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "]]
Player coordinates: [0,0]

```


#### Calling functions WITH JSON params

> WARN: For smart contract calling WITH JSON params, DON'T USE massa client ! Because the parsing of the parameters is broken. Do the call directly inside the

**Bash terminal** - do the call on an already deployed smart contract:

```shell
(base)  ❮ onyr ★  kenzae❯ ❮ massa-client❯❯ ./massa-client call_smart_contract 2J3v9G2D9FAEjm3Khnj2W54ns9sZ6Zqgb4zkdHaP8zuTt5DY5c 2VKFKazKJkNr1sH2etijbJ8AWJZrg1NfoaAMhcqgMjBw9Acggh move "{'direction':3}" 1000000 0 0 0
Sent operation IDs:
2jyYCh7FVTL5UyPdz8NsfhuL59vSAmsJSbRerUQHj3yNyH3YU
```

**Massa client** - check the operation:

```shell
✔ command · get_filtered_sc_output_event operation_id=2jyYCh7FVTL5UyPdz8NsfhuL59vSAmsJSbRerUQHj3yNyH3YU
Context: Slot: (period: 7844, thread: 21) at index: 2
On chain execution
Block id: 2MnaVB4uFfHuM9jS1pWwZjhQ7WVeRNLHXQEewuFjugSqAE7bvz
Origin operation id: 2jyYCh7FVTL5UyPdz8NsfhuL59vSAmsJSbRerUQHj3yNyH3YU
Call stack: 2J3v9G2D9FAEjm3Khnj2W54ns9sZ6Zqgb4zkdHaP8zuTt5DY5c,2VKFKazKJkNr1sH2etijbJ8AWJZrg1NfoaAMhcqgMjBw9Acggh

Data: Called 'move' from massadventure!
Direction: 3


Context: Slot: (period: 7844, thread: 21) at index: 3
On chain execution
Block id: 2MnaVB4uFfHuM9jS1pWwZjhQ7WVeRNLHXQEewuFjugSqAE7bvz
Origin operation id: 2jyYCh7FVTL5UyPdz8NsfhuL59vSAmsJSbRerUQHj3yNyH3YU
Call stack: 2J3v9G2D9FAEjm3Khnj2W54ns9sZ6Zqgb4zkdHaP8zuTt5DY5c,2VKFKazKJkNr1sH2etijbJ8AWJZrg1NfoaAMhcqgMjBw9Acggh

Data: Board obtained from store 
Board width: 10 
Board height: 10 
Board: [[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "]]


Context: Slot: (period: 7844, thread: 21) at index: 4
On chain execution
Block id: 2MnaVB4uFfHuM9jS1pWwZjhQ7WVeRNLHXQEewuFjugSqAE7bvz
Origin operation id: 2jyYCh7FVTL5UyPdz8NsfhuL59vSAmsJSbRerUQHj3yNyH3YU
Call stack: 2J3v9G2D9FAEjm3Khnj2W54ns9sZ6Zqgb4zkdHaP8zuTt5DY5c,2VKFKazKJkNr1sH2etijbJ8AWJZrg1NfoaAMhcqgMjBw9Acggh

Data: player moves down

Context: Slot: (period: 7844, thread: 21) at index: 5
On chain execution
Block id: 2MnaVB4uFfHuM9jS1pWwZjhQ7WVeRNLHXQEewuFjugSqAE7bvz
Origin operation id: 2jyYCh7FVTL5UyPdz8NsfhuL59vSAmsJSbRerUQHj3yNyH3YU
Call stack: 2J3v9G2D9FAEjm3Khnj2W54ns9sZ6Zqgb4zkdHaP8zuTt5DY5c,2VKFKazKJkNr1sH2etijbJ8AWJZrg1NfoaAMhcqgMjBw9Acggh

Data: Current player coordinates: [0,1]

```







## Full deploy and test example

Massa terminal:

```shell
✔ command · send_smart_contract 2J3v9G2D9FAEjm3Khnj2W54ns9sZ6Zqgb4zkdHaP8zuTt5DY5c /home/onyr/Documents/code/massa/massadventure/build/main.wasm 100000000 0 0 0
Sent operation IDs:
VoTYAgdFSfH6BchMGkjbMqxWZybQ71HJx5nrcjZv2CZEyTL2S
? command › get_f
get_filtered_sc_output_event
✔ command · get_filtered_sc_output_event operation_id=VoTYAgdFSfH6BchMGkjbMqxWZybQ71HJx5nrcjZv2CZEyTL2S
Context: Slot: (period: 7965, thread: 21) at index: 2
On chain execution
Block id: 2obnTVtLWGXjzpwJLdeCPKGyu7CQbR9zkbN8ijmQYs6M98zgyQ
Origin operation id: VoTYAgdFSfH6BchMGkjbMqxWZybQ71HJx5nrcjZv2CZEyTL2S
Call stack: 2J3v9G2D9FAEjm3Khnj2W54ns9sZ6Zqgb4zkdHaP8zuTt5DY5c

Data: Created massadventure v0.1.0 smart-contract at:27BxJWdeGnSTURtJx6RgyEmP2taUKbdLMYh1m7dCj2a4VUxrBT

✔ command · call_smart_contract 2J3v9G2D9FAEjm3Khnj2W54ns9sZ6Zqgb4zkdHaP8zuTt5DY5c 27BxJWdeGnSTURtJx6RgyEmP2taUKbdLMYh1m7dCj2a4VUxrBT testHelloWorld "" 1000000 0 0 0
Sent operation IDs:
2fSs6axu91Bw8UPWMN2hmSQH6bjVZpgj57T56jPxN9p81VASFj
✔ command · get_filtered_sc_output_event operation_id=2fSs6axu91Bw8UPWMN2hmSQH6bjVZpgj57T56jPxN9p81VASFj
Context: Slot: (period: 7969, thread: 21) at index: 2
On chain execution
Block id: STVHoKQJrkrrwYUHTH27Cd5gE9MwENNY8HCtujDQR8eUQcsex
Origin operation id: 2fSs6axu91Bw8UPWMN2hmSQH6bjVZpgj57T56jPxN9p81VASFj
Call stack: 2J3v9G2D9FAEjm3Khnj2W54ns9sZ6Zqgb4zkdHaP8zuTt5DY5c,27BxJWdeGnSTURtJx6RgyEmP2taUKbdLMYh1m7dCj2a4VUxrBT

Data: Hello World from Massadventure :)

✔ command · call_smart_contract 2J3v9G2D9FAEjm3Khnj2W54ns9sZ6Zqgb4zkdHaP8zuTt5DY5c 27BxJWdeGnSTURtJx6RgyEmP2taUKbdLMYh1m7dCj2a4VUxrBT initializeLevel "" 1000000 0 0 0
Sent operation IDs:
hZKRD3uQdz5qeauNnohkrG2SZLHteody4cneKodSqDogFk7w5
✔ command · get_filtered_sc_output_event operation_id=hZKRD3uQdz5qeauNnohkrG2SZLHteody4cneKodSqDogFk7w5
Context: Slot: (period: 7973, thread: 21) at index: 2
On chain execution
Block id: 2jos5wZX37o9W4Uz5FHvtnTvFyr3ikY7AtiKUhm8bRUz1GGVKk
Origin operation id: hZKRD3uQdz5qeauNnohkrG2SZLHteody4cneKodSqDogFk7w5
Call stack: 2J3v9G2D9FAEjm3Khnj2W54ns9sZ6Zqgb4zkdHaP8zuTt5DY5c,27BxJWdeGnSTURtJx6RgyEmP2taUKbdLMYh1m7dCj2a4VUxrBT

Data: Called initializeLevel from massadventure!
Board width: 10 
Board height: 10 
Board initialized: [[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "," "]]
Player coordinates: [0,0]

```

Bash terminal for JSON param function call:

```shell

```
