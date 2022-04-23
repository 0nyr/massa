# Hello world

> This follows closely the example provided as of **Sat 22nd April 2022** at [MASSA doc](https://massa.readthedocs.io/en/latest/smart-contracts/getting-started.html).

> All dependencies should be installed as dev dependencies as no module will be exported on this project.

## Install and set-up

> Set up the project from scratch (not using `package.json` file.

`npm init`

`npm install --save-dev @as-pect/cli massa-sc-std massa-sc-scripts`

`npx asinit .`

`npx asp --init`

Compile our `helloworld.ts`: `npx massa-sc-scripts build-sc assembly/helloworld.ts`

> If using this repository, just run `npm install` inside `hello_world/` subdirectory.
