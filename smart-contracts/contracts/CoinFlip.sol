// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Coin is ReentrancyGuard {
    using SafeMath for uint256;
    
    event CoinFlipRequest(uint256 indexed requestId, address indexed player);
    event CoinFlipResult(uint256 indexed requestId, bool didWin, CoinFlipSelection result);
    
    struct CoinFlipStatus {
        uint256 stakedAmount;
        uint256 fees;
        uint256 randomWord;
        address player;
        bool didWin;
        bool fulfilled;
        CoinFlipSelection choice;
    }
    
    enum CoinFlipSelection {
        HEADS,
        TAILS
    }
    
    mapping(uint256 => CoinFlipStatus) public statuses;
    uint256 public requestCounter;
    uint256 private nonce;
    
    address public owner;
    uint256 public houseFee = 5;
    IERC20 public musd;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }
    
    constructor(address _musdAddress) {
        owner = msg.sender;
        nonce = 0;
        requestCounter = 0;
        musd = IERC20(_musdAddress);
    }
    
    function getRandomNumber() private returns (uint256) {
        nonce++;
        return uint256(keccak256(abi.encodePacked(
            block.timestamp,
            block.prevrandao,
            block.number,
            msg.sender,
            nonce,
            requestCounter
        )));
    }
    
    function flip(CoinFlipSelection choice, uint256 betAmount) 
        external 
        nonReentrant
        returns (uint256) {
        require(betAmount > 0, "Must bet some MUSD");
        require(betAmount <= getMUSDBalance().div(10), "Bet too high");
        
        require(musd.transferFrom(msg.sender, address(this), betAmount), "MUSD transfer failed");
        
        uint256 requestId = requestCounter;
        requestCounter = requestCounter.add(1);
        
        uint256 randomWord = getRandomNumber();
        
        CoinFlipSelection result = CoinFlipSelection.HEADS;
        if (randomWord % 2 == 0) {
            result = CoinFlipSelection.TAILS;
        }
        
        bool won = (choice == result);
        uint256 fees = betAmount.mul(houseFee).div(100);
        
        statuses[requestId] = CoinFlipStatus({
            stakedAmount: betAmount,
            fees: fees,
            randomWord: randomWord,
            player: msg.sender,
            didWin: won,
            fulfilled: true,
            choice: choice
        });
        
        emit CoinFlipRequest(requestId, msg.sender);
        emit CoinFlipResult(requestId, won, result);
        
        if (won) {
            uint256 payout = betAmount.mul(2).sub(fees);
            require(musd.transfer(msg.sender, payout), "Payout failed");
        }
        
        return requestId;
    }
    
    function getStatus(uint256 requestId) 
        external 
        view 
        returns (CoinFlipStatus memory) {
        return statuses[requestId];
    }
    
    function fundContract(uint256 amount) external onlyOwner {
        require(musd.transferFrom(msg.sender, address(this), amount), "Funding failed");
    }
    
    function withdraw(uint256 amount) external onlyOwner {
        require(amount <= getMUSDBalance(), "Insufficient balance");
        require(musd.transfer(owner, amount), "Withdrawal failed");
    }
    
    function setHouseFee(uint256 _fee) external onlyOwner {
        require(_fee <= 10, "Fee too high");
        houseFee = _fee;
    }
    
    function getMUSDBalance() public view returns (uint256) {
        return musd.balanceOf(address(this));
    }
    
    function getMUSDAddress() external view returns (address) {
        return address(musd);
    }
}

library SafeMath {
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) return 0;
        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");
        return c;
    }
    
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "SafeMath: division by zero");
        return a / b;
    }
    
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        return a - b;
    }
    
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }
}