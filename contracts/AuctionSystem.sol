// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./MusicNFT.sol";
import "./MyToken.sol";
// import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./ERC20/IERC20.sol";

contract AuctionSystem is MusicNFT{
    
    
    
   
    struct Auction{
        address nftAddress;
        uint256 nftId;
        address tokenAddress;
        address creator;
        uint256 startTime;
        uint256 duration;
        uint256 currentBidAmount;
        address currentBidOwner;
        uint256 bidCount;
        // mapping(uint256 => History) historyOffer;
        // History[] historyOffer;
    }
    Auction[] private auctions;

    mapping(address=>uint256[]) myNFTOnAuction;
    function listNFTOnAuction()
    public
    view
    returns(uint256[] memory myresult)
    {
        return(myNFTOnAuction[msg.sender]);
    }

    mapping(address => uint256[]) myNFTFromAuction;
    function listNFTFromAuction()
    public
    view
    returns(uint256[] memory myresult)
    {
        return(myNFTFromAuction[msg.sender]);
    }
    
    mapping(uint256 => History[]) historyOffer;
    struct History{
        uint256 offer;
        address offerers;
        uint256 time;
    }

    function AuctionProgression(
        uint256 _index
    )
    public
    view
    returns(
        address _creator,
        address _nftAddress,
        uint256 _nftId,
        address _tokenAddress,
        History[] memory _historyOffer,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _bidCount
    )
    {
        require(_index <= auctions.length,"AUCTION_NOT_FOUND");
        Auction memory auction = auctions[_index];
        _creator = auction.creator;
        _nftAddress = auction.nftAddress;
        _nftId = auction.nftId;
        _tokenAddress = auction.tokenAddress;
        _historyOffer = historyOffer[_index];
        _startTime = auction.startTime;
        _endTime = auction.startTime+auction.duration;
        _bidCount = auction.bidCount;
    }

    function startAuction(
        address _nftAddress,
        uint256 _nftId,
        address _tokenAddress,
        uint256 _startPrice,
        uint256 _startTime,
        uint256 _duration
    )
    public
    payable
    {
        require(idToNFT[_nftId].ifShared == false,"NOT_SALABLE");
        require(idToNFT[_nftId].owners[0] == msg.sender,"NOT_THE_OWNER");
        require(_startTime == 0 || _startTime >=block.timestamp,"START_TIME_IS_WRONG");
        if(_startTime == 0)
            _startTime = block.timestamp;

        Auction memory auction = Auction({
            creator: msg.sender,
            nftAddress: _nftAddress,
            nftId: _nftId,
            tokenAddress: _tokenAddress,
            startTime: _startTime,
            duration: _duration,
            currentBidAmount: _startPrice,
            currentBidOwner: msg.sender,
            bidCount: 0
            // historyOffer: _history
        });
        auctions.push(auction);
        myNFTOnAuction[msg.sender].push(_nftId);
        
        // IERC20 myIERC20 = IERC20(_tokenAddress);
        // transferFromERC20(myIERC20,payable(msg.sender),address(this),_startPrice);

        /*??????????????????msg.sender??????allowance*/
        ERC721 myERC721 = ERC721(_nftAddress);
        myERC721.transferFrom(payable(msg.sender), address(this), _nftId);
    }


        
    function test1(uint256 amount, address tokenAddr)
    public
    payable
    {
        IERC20 token = IERC20(tokenAddr);
        transferFromERC20(token,payable(msg.sender),address(this),amount);
        // token.approve(msg.sender,amount);
        // token.transferFrom(payable(msg.sender),payable(address(this)),amount);
        // payable(address(this)).transfer(amount);
    }
    
    function test2(uint256 amount, address tokenAddr)
    public
    payable
    {
        IERC20 token = IERC20(tokenAddr);
        transferFromERC20(token,payable(address(this)),msg.sender,amount);
        // token.approve(msg.sender,amount);
        // token.transferFrom(payable(msg.sender),payable(address(this)),amount);
        // payable(address(this)).transfer(amount);
    }
    
    
    function Bid(
        uint256 _index,
        uint256 _offer
    )
    public
    payable
    {
        Auction storage auction = auctions[_index];
        require(_offer > auction.currentBidAmount,"NOT_HIGH_ENOUGH");
        require(block.timestamp < auction.startTime+auction.duration,"AUCTION_END");

        /*??????????????????msg.sender??????allowance*/
        IERC20 token = IERC20(auction.tokenAddress);
        transferFromERC20(token,payable(msg.sender),address(this),_offer);
        // token.transferFrom(msg.sender,address(this),_offer);

        if(auction.bidCount!=0)
            transferFromERC20(token,payable(address(this)),payable(auction.currentBidOwner),auction.currentBidAmount);
            // require(token.transferFrom(address(this), auction.currentBidOwner, auction.currentBidAmount*10**2),"ERC20-ERROR");

        auction.bidCount++;
        auction.currentBidAmount = _offer;
        auction.currentBidOwner = msg.sender;

        History memory history = History({
            offer: _offer,
            offerers: msg.sender,
            time: block.timestamp
        });
        historyOffer[_index].push(history);
    }
    
    function auctionState(
        uint256 _index
    )
    public
    view
    returns(bool result)
    {
        result = block.timestamp>=auctions[_index].startTime+auctions[_index].duration? true : false;
    }
    
    function Claim(
        uint256 _index
    )
    public
    payable
    {
        require(auctionState(_index),"AUCTION_NOT_END");
        require(auctions[_index].currentBidOwner == msg.sender,"NOT_YOU");

        ERC721 myERC721 = ERC721(auctions[_index].nftAddress);
        myERC721.transferFrom(payable(address(this)), msg.sender, auctions[_index].nftId);
        
        IERC20 myERC20 = IERC20(auctions[_index].tokenAddress);
        // transferFromERC20(myERC20,payable(auctions[_index].currentBidOwner),auctions[_index].creator,auctions[_index].currentBidAmount);
        transferFromERC20(myERC20,payable(address(this)),auctions[_index].creator,auctions[_index].currentBidAmount);

        NFTOwnership memory temp = NFTOwnership({owner:msg.sender,wayOfOwn:2});
        OwnershipChange[auctions[_index].nftId].pop();
        OwnershipChange[auctions[_index].nftId].push(temp);
        myNFTFromAuction[msg.sender].push(auctions[_index].nftId);
    }
    

    function transferFromERC20(
        IERC20 _token,
        address _from,
        address _to,
        uint256 _amount
    )
    internal
    returns (bool)
    {
        (bool callSuccess, bytes memory callReturnValueEncoded) = address(_token).call(
            abi.encodeWithSignature("transferFrom(address,address,uint256)", _from, _to, _amount)
        );
        // `transferFrom` method may return (bool) or nothing.
        bool returnedSuccess = callReturnValueEncoded.length == 0 || abi.decode(callReturnValueEncoded, (bool));
        return callSuccess && returnedSuccess;
    }
}