const Web3 = require("web3");
const MyContract = require('../../build/contracts/AuctionSystem.json');
const $ = require("jquery");

const init = async () => {
  const web3 = new Web3('http://localhost:8545');
  // const id = web3.eth.net.getId();
  const deployedNetwork = MyContract.networks[5777];

  const contract = new web3.eth.Contract(
      MyContract.abi,
      deployedNetwork.address
  );

  const addresses = await web3.eth.getAccounts();
  // const _name = document.getElementById("NFTname").value;
  // const _data = document.getElementById("NFTdata").value;


  // console.log(deployedNetwork.address);
  const result = contract.methods.balanceOf('0xeA6AEcE71DA1043B0D5C71f0F0ca3111b2DE5f3E').call((err, result) => {
    console.log(result)
  });

}
init();

var button = document.getElementById("mint");
button.onclick(async function () {
  var address = document.getElementById("_accountAddress").value;
  var tokenId = document.getElementById("_nftId").value;
  var tokenUri = "default";
  await contract.methods.mint(address, tokenId, tokenUri).send({
    from: '0xB767AfB1F47ce46660B7E6cdeaB05E18C7229E32',
    to: deployedNetwork.address, gasLimit: 1000000
  });
})

// window.addEventListener('load', function() {
//   var web3Provided;
//   // Supports Metamask and Mist, and other wallets that provide 'web3'.
//   if (typeof web3 !== 'undefined') {
//     // Use the Mist/wallet provider.
//     // eslint-disable-next-line
//     web3Provided = new Web3(web3.currentProvider);
//   } else {
//     web3Provided = new Web3(new Web3.providers.HttpProvider(web3Location))
//   }
// });

// $(document).ready(function(){
//   $("#balanceOf").click(function(){
//     $("#_showMyNFT").text="Hello world!";
//   });
//   // jQuery methods go here...
//
// });

// var web3Provided;
// // Supports Metamask and Mist, and other wallets that provide 'web3'.
// if (typeof web3 !== 'undefined') {
//   // Use the Mist/wallet provider.
//   // eslint-disable-next-line
//   web3Provided = new Web3(web3.currentProvider);
// } else {
//   web3Provided = new Web3(new Web3.providers.HttpProvider(web3Location))
// }





// web3.eth.getTransactionCount(account1, (err, txCount) => {
//   // 创建交易对象
//   const txObject = {
//     nonce:    web3.utils.toHex(txCount),
//     gasLimit: web3.utils.toHex(8000000),
//     gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
//     to: deployedNetwork.address,
//     data: contract.methods.set("qikegu").encodeABI()
//   }
//   // 签署交易
//   const tx = new Tx(txObject, { chain: 'ropsten', hardfork: 'petersburg' })
//   tx.sign(privateKey1)
//   const serializedTx = tx.serialize()
//   const raw = '0x' + serializedTx.toString('hex')
//   // 广播交易
//   web3.eth.sendSignedTransaction(raw, (err, txHash) => {
//     console.log('txHash:', txHash)
//     // 可以去ropsten.etherscan.io查看交易详情
//   })
// })


/*Connect Metamask*/
async function connectWallet(){
  if (window.ethereum != null) {
    state.web3 = new Web3(window.ethereum)
    try {
      // Request account access if needed
      await window.ethereum.enable()
      // Acccounts now exposed
    } catch (error) {
      // User denied account access...
    }
  }
}


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

  // document.getElementById("btn-wallet").innerText = "重新连接";
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

// /*for show operation*/
// $(document).ready(function (){
//   $("#connectWallet").onclick(function (){
//     linkWallet();
//   })
//   $("#_showMyNFT").onclick(function (){
//     showBalanceOf();
//   })
// })
//
//
// function showBalanceOf(){
//   const result = contract.methods.balanceOf('0xB767AfB1F47ce46660B7E6cdeaB05E18C7229E32').call((err, result) => {
//     console.log(result)
//   });
//   let show = $("#_showMyNFT");
//   show.html("Hello");
//   console.log(result);
// }


/*for transcation operation*/
// Web3.eth.getTransactionCount(account1, (err, txCount) => {
//
//   // 创建交易对象
//   const txObject = {
//     nonce:    Web3.utils.toHex(txCount),
//     gasLimit: Web3.utils.toHex(800000),
//     gasPrice: Web3.utils.toHex(Web3.utils.toWei('10', 'gwei')),
//     to: address,
//     data: contract.methods.set("mint").encodeABI()
//   }
//
//   // 签署交易
//   const tx = new Tx(txObject, { chain: contract.defaultChain, hardfork: contract.defaultHardfork })
//   account = getAccount();
//   tx.sign(privateKey1)
//
//   const serializedTx = tx.serialize()
//   const raw = '0x' + serializedTx.toString('hex')
//
//   // 广播交易
//   web3.eth.sendSignedTransaction(raw, (err, txHash) => {
//     console.log('txHash:', txHash)
//     // 可以去ropsten.etherscan.io查看交易详情
//   })
//
// })

// function StartAuction() {
//   console.log("start Auction");
//   $("#startAuction").click(function() {
//     // $("#loader").show();
//     contracts.methods.startAuction.deployed().then(function(instance) {
//       return instance.setSimpleAuction($("#name").val(), {gas: 5000000});
//     }).then(function(result) {
//       console.log("start" + result);
//       return App.getInfo();
//     } ).catch(function(err) {
//       console.error(err);
//     });
//   });
//   /*
//     App.contracts.SimpleAuction.deployed().then(function(instance) {
//       return instance.setSimpleAuction();
//     }).then(function(result) {
//       console.log("start" + result);
//     }).catch(function(err) {
//       console.error(err);
//     });
//     */
// }





// window.onload = function (){
//   var btn1 = document.getElementById('balanceOf');
//   btn1.onclick = function (){
//     const result = contract.methods.balanceOf('0xB767AfB1F47ce46660B7E6cdeaB05E18C7229E32').call((err, result) => {
//       console.log(result)
//     });
//     var output = document.getElementById('_showMyNFT');
//     output.innerHTML = 'HelloWorld';
//   }
// }




// $ = require(jQuery);
// $(document).ready(function(){
//   $("#balanceOf").click(function(){
//     showBalanceOf();
//     $("#_showMyNFT").text="Hello world!";
//   });
//   // jQuery methods go here...
//
// });

// $(document).ready(function(){
//   $("#balanceOf").click(function(){
//     $("#_showMyNFT").hide();
//   });
// });
// }