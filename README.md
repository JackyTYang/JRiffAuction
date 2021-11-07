# MusicNFT Auction System
如何运行我的项目？

1.在Remix中挂载本地目录，分别编译MyToken以及AuctionSystem.sol文件，并部署。

2.将MyToken以及AuctionSystem智能合约地址添加进小狐狸钱包。

3.启动Ganache。

4.由于缺乏前端，需要先approve账户的代币以及NFT使用权给智能合约，便于后续操作。

5.进行Mint操作之后需要Initialilze操作，将NFT Sharable设置为False，因为我继承了之前写的一个NFT碎片化的合约，每个NFT都存在这个属性，加入设置为Ture，之后分割了之后便不能拍卖。

6.进行bid、claim等操作。



P.S web3js能够成功调用智能合约，但是未能和前端建立相关联系，前端页面也已制作完毕。

如需运行整个项目，进入项目文件后输入npm run dev，打开浏览器输入localhost:3000即可进入。



截图：

![2021-11-07](C:\Users\jacky\OneDrive\图片\屏幕快照\2021-11-07.png)

![2021-11-07 (2)](C:\Users\jacky\OneDrive\图片\屏幕快照\2021-11-07 (2).png)

![2021-11-07 (1)](C:\Users\jacky\OneDrive\图片\屏幕快照\2021-11-07 (1).png)
