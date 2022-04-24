import React, { useEffect, useState } from "react";
import {
  ClientFactory,
  INodeStatus,
  IAccount,
  DefaultProviderUrls,
} from "@massalabs/massa-web3";

const baseAccount = {
  privateKey: "3WiwjjWoyFAprGVAxY1awVskeJjoaFAZj6AQzzz9JLSW4RHUc",
  publicKey: "8K682sWDPWgv44yEmHSp9hdTbdJERzamkNMP1SfPNB4SBWsx96",
  address: "2J3v9G2D9FAEjm3Khnj2W54ns9sZ6Zqgb4zkdHaP8zuTt5DY5c",
} as IAccount;

type TNodeStatus = INodeStatus | null;

const web3Client = ClientFactory.createDefaultClient(
  DefaultProviderUrls.LABNET,
  false,
  baseAccount
);

const sc_addr = "27BxJWdeGnSTURtJx6RgyEmP2taUKbdLMYh1m7dCj2a4VUxrBT"

// function NodeInfo() {
//   const [nodeStatus, setNodeStatus] = useState<TNodeStatus>(null);

//   const getNodeStatusAsync = async () => {
//     try {
//       const nodeStatus: INodeStatus = await web3Client
//         .publicApi()
//         .getNodeStatus();
//       setNodeStatus(nodeStatus);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     getNodeStatusAsync();
//   }, []);

//   const getNodeOverview = (nodeStatus?: TNodeStatus): JSX.Element => {
//     if (!nodeStatus) {
//       return <p>"Getting Massa's Node Status..."</p>;
//     }
//     return (
//       <ul>
//         <li>Massa Net Version: {nodeStatus?.version}</li>
//         <li>Massa Net Node Id: {nodeStatus?.node_id}</li>
//         <li>Massa Net Node Ip: {nodeStatus?.node_ip}</li>
//         <li>Massa Net Time: {nodeStatus?.current_time}</li>
//         <li>Massa Net Cycle: {nodeStatus?.current_cycle}</li>
//       </ul>
//     );
//   };

//   return getNodeOverview(nodeStatus);
// }

function Square(props: any) {
  return (
    <button className="square" onClick={props.onClick} id={`square_${props.squareIndex}`}>
      {props.value}
      {props.ascii}
    </button>
  );
}

class Board extends React.Component<any, any> {
  interval: NodeJS.Timer | undefined;

  constructor(props: any) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      player: [0, 0],
      board: [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.refresh(), 1000);
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }

  refresh() {
    web3Client.smartContracts().getDatastoreEntry(sc_addr, "player").then((res) => {
      if (res) {
        let playerData = JSON.parse(res.candidate);
        this.setState({
          player: playerData
        });
      }
    });
    web3Client.smartContracts().getDatastoreEntry(sc_addr, "board").then((res) => {
      if (res) {
        let boardMatrix = JSON.parse(res.candidate);
        let squares = Array(9).fill(null);
        this.setState({
          squares: squares,
          board: boardMatrix
        });
      }
    });

  }

  handleClick(i: number) {
    var call_params_str = `{"direction":${i}}`

    web3Client.smartContracts().callSmartContract(
      {
        /// storage fee for taking place in books
        fee: 0,
        /// The maximum amount of gas that the execution of the contract is allowed to cost.
        maxGas: 70000000,
        /// The price per unit of gas that the caller is willing to pay for the execution.
        gasPrice: 0,
        /// Extra coins that are spent from the caller's parallel balance and transferred to the target
        parallelCoins: 0,
        /// Extra coins that are spent from the caller's sequential balance and transferred to the target
        sequentialCoins: 0,
        /// Target smart contract address
        targetAddress: sc_addr,
        /// Target function name. No function is called if empty.
        functionName: "move",
        /// Parameter to pass to the target function
        parameter: call_params_str
      },
      baseAccount
    ).then(function (txid) {
      console.log("handleClick ", call_params_str, txid);
    });
  }





  reset() {
    web3Client.smartContracts().callSmartContract(
      {
        /// storage fee for taking place in books
        fee: 0,
        /// The maximum amount of gas that the execution of the contract is allowed to cost.
        maxGas: 70000000,
        /// The price per unit of gas that the caller is willing to pay for the execution.
        gasPrice: 0,
        /// Extra coins that are spent from the caller's parallel balance and transferred to the target
        parallelCoins: 0,
        /// Extra coins that are spent from the caller's sequential balance and transferred to the target
        sequentialCoins: 0,
        /// Target smart contract address
        targetAddress: sc_addr,
        /// Target function name. No function is called if empty.
        functionName: "initializeBoard",
        /// Parameter to pass to the target function
        parameter: ""
      },
      baseAccount
    ).then(function (txid) {
      console.log("handleClick ", "", txid);
    });
  }

  renderSquare(i: number) {
    let currentAscii = ""
    if (
      this.state.player[0] * this.state.board[0].length + this.state.player[1] == i
    ) {
      currentAscii = "@"
    }

    return (
      <Square
        value={this.state.squares[i]}
        // onClick={() => this.handleClick(i)}
        squareIndex={i}
        ascii={currentAscii}
      />
    );
  }

  MakeTableFirst(m: number, i: number) {
    let squares = [];
    for (let j = 0; j < m; j++) {
      {
        squares.push(this.renderSquare(i * m + j));
      }
    }
    return (<div>{
      squares.map(function (elem) {
        return elem;
      })
    }</div>)
  }

  MakeTableTotal(n: number, m: number) {
    let rows = [];
    for (let i = 0; i < n; i++) {
      rows.push(<div className="board-row">
        {this.MakeTableFirst(m, i)}
      </div>);
    }
    return (
      <div>
        {rows.map(function (elem) {
          return elem;
        })}
      </div>
    )
  }



  render() {
    console.log(`Player coord: ${this.state.player[0]}, ${this.state.player[1]}`)
    return (
      <div>
        {this.MakeTableTotal(this.state.board.length, this.state.board[0].length)}
        <div className="restart-button">
          <button onClick={() => this.reset()}>Restart Game</button>
          <button onClick={() => this.handleClick(2)}>Up</button>
          <button onClick={() => this.handleClick(1)}>Left</button>
          <button onClick={() => this.handleClick(3)}>Right</button>
          <button onClick={() => this.handleClick(4)}>Down</button>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        {/* <div className="node-info">
          <NodeInfo />
        </div> */}
      </div>
    );
  }
}

export default Game;


