const MyERC721 = artifacts.require("AuctionSystem");

module.exports = function(_deployer, network, accounts) {
  // Use deployer to state migration tasks.
  _deployer.deploy(MyERC721, {from:accounts[0]})
};
