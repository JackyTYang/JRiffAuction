document.ready(function (){
    $("#connectWallet").onclick(function (){
        linkWallet();
    })
})

// const Web3 = require("web3");
// const MyContract = require("../../build/contracts/AuctionSystem.json");
// test = {
//
//     web3Provider: null,
//     contracts: {},
//
//     init: function() {
//         return test.initWeb3();
//     },
//
//     initWeb3: function() {
//         if (typeof web3 !== 'undefined') {
//             web3 = new Web3(web3.currentProvider);
//         } else {
//             // set the provider you want from Web3.providers
//             web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//         }
//         console.log("init web3");
//         return test.initContract();
//     },
//
//     initContract: function() {
//         const MyContract = require('../../build/contracts/AuctionSystem.json');
//         const address = '0x6Aeb6A13f63B50eb88967cdFf1e0846ceABCdd25';
//         const contract = new web3.eth.Contract(
//             MyContract.abi,
//             address
//         );
//
//     },
//
//     linkWallet: function() {
//         $("#connectWallet").click(function (){
//             test.init();
//             if (ethereum) {
//                 web3Provider = ethereum;
//                 // 新版需要请求用户授权
//                 try {
//                     ethereum.enable();
//                 } catch (error) {
//                     alert("用户取消授权");
//                     return;
//                 }
//             } else if (web3) {
//                 // MetaMask Legacy dapp browsers...
//                 web3Provider = web3.currentProvider;
//                 console.log("web3.currentProvider:");
//                 console.log(web3.currentProvider);
//             } else {
//                 web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
//                 console.log("https://http-testnet.hecochain.com");
//             }
//             web3js = new Web3(web3Provider);
//
//             document.getElementById("btn-wallet").innerText = "重新连接";
//         });
//
//     },
//
//     getAccount: function() {
//         if (!web3js) {
//             document.getElementById("input-account").value = "请先连接 wallet";
//             return;
//         }
//         web3js.eth.getAccounts(function(error, result) {
//             if (!error) {
//                 document.getElementById("input-account").value = result;
//             } else {
//                 document.getElementById("input-account").value = "获取地址失败";
//             }
//         });
//     },
//
//
//
// }