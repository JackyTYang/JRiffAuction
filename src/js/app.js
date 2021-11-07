const Web3 = require("web3");
const MyContract = require("../../build/contracts/AuctionSystem.json");

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
//
//
//   const MyContract = require('../../build/contracts/AuctionSystem.json');
// // const $ = require("jquery");
const id = MyContract.eth.net.getId();
const deployedNetwork = MyContract.network[id];
// const address = '0xeeAdEA87FD9DC9ab877884944FfBACe0198e1830';
//

const contract = new MyContract(
    MyContract.abi,
    deployedNetwork.address
);

function a(){
  console.log(deployedNetwork.address);
}
a();

contract.methods.Claim();

function linkWallet() {
  if (ethereum) {
    web3Provider = ethereum;
    // 新版需要请求用户授权
    try {
      ethereum.enable();
    } catch (error) {
      alert("用户取消授权");
      return;
    }
  } else if (web3) {
    // MetaMask Legacy dapp browsers...
    web3Provider = web3.currentProvider;
    console.log("web3.currentProvider:");
    console.log(web3.currentProvider);
  } else {
    web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    console.log("https://http-testnet.hecochain.com");
  }
  web3js = new Web3(web3Provider);

  document.getElementById("btn-wallet").innerText = "重新连接";
}

function getAccount() {
  if (!web3js) {
    document.getElementById("input-account").value = "请先连接 wallet";
    return;
  }
  web3js.eth.getAccounts(function(error, result) {
    if (!error) {
      document.getElementById("input-account").value = result;
    } else {
      document.getElementById("input-account").value = "获取地址失败";
    }
  });
}


