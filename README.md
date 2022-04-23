# MASSA

As explained by the MASSA doc: "Massa is a truly decentralized blockchain controlled by thousands of people. With the breakthrough multithreaded technology, we’re set for mass adoption."

### Useful links

[MASSA doc, latest](https://massa.readthedocs.io/en/latest/index.html)

##### hackaton

[doc hackaton](https://massa.readthedocs.io/en/latest/hackathon.html)

[MASSA Web3 lib](https://github.com/massalabs/massa-web3)


## Install tools

First, install general tools for `node` dev:

1. Install `nvm` [(NVM | GitHub)](https://github.com/nvm-sh/nvm). Use `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash` to do so. Don't forget to open a new terminal after or run `source ~/.bashrc` to make the new command available.
2. Use `nvm install node` to install the latest version of `node`. Or use `nvm install --lts` to install the latest LTS of `node`.
3. `npm i yarn -g`: install `yarn` (package manager similar to `npm` but more recent). No need to install manually `npx` since it comes with `npm`.

Once the necessary tooling have been installed, install MASSA specific libs. We  instead of `npm`:

> If using this repository, just run `npm install` inside `hello_world/` subdirectory.

`npm install --save-dev @as-pect/cli massa-sc-std massa-sc-scripts` using `npm` (recommended).

`yarn add @as-pect/cli massa-sc-std massa-sc-scripts --dev` using `yarn`

## Deploy commands

`send_smart_contract 2J3v9G2D9FAEjm3Khnj2W54ns9sZ6Zqgb4zkdHaP8zuTt5DY5c /home/onyr/Documents/code/massa/tic_tac_toe_front/build/website.wasm 1000000 0 0 0`: deploy smart contract

`get_operations 6LKALebFTHjFCPngt4aBJgcUDTmPdgermh5b57S6PWpGhBVfq`: verify smart contract infos and check deployment.

`get_filtered_sc_output_event caller_address=2J3v9G2D9FAEjm3Khnj2W54ns9sZ6Zqgb4zkdHaP8zuTt5DY5c`: 

## Commands

`npx massa-sc-create tictactoe-sc`: inside an already initialized project, create a new MASSA hello world project.
