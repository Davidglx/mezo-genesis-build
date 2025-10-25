// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Wheel is ReentrancyGuard {
    using SafeMath for uint256;
    
    event WheelRequest(uint256 indexed requestId, address indexed player);
    event WheelResult(uint256 indexed requestId, bool didWin, uint256 wheelNumber, uint256 payout);
    
    struct WheelStatus {
        uint256 stakedAmount;
        uint256 fees;
        uint256 randomWord;
        address player;
        bool didWin;
        bool fulfilled;
    }
    
    mapping(uint256 => WheelStatus) public statuses;
    uint256 private requestCounter;
    uint256 private nonce;
    
    address public owner;
    uint256 public houseFee = 5;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        nonce = 0;
    }
    
    function getRandomNumber() private returns (uint256) {
        nonce++;
        return uint256(keccak256(abi.encodePacked(
            block.timestamp,
            block.prevrandao,
            msg.sender,
            nonce
        )));
    }
    
    function spin() 
        external 
        payable 
        nonReentrant
        returns (uint256) {
        require(msg.value > 0, "Must send BTC to play");
        require(msg.value <= address(this).balance / 10, "Bet too high");
        
        uint256 requestId = requestCounter++;
        uint256 wheelNumber = getRandomNumber().mod(6);
        
        bool won = false;
        uint256 payout = 0;
        uint256 fees = msg.value.mul(houseFee).div(100);
        
        if (wheelNumber == 0 || wheelNumber == 4) {
            won = true;
            payout = msg.value.sub(fees);
        } else if (wheelNumber == 1 || wheelNumber == 5) {
            won = true;
            payout = msg.value.mul(2).sub(fees);
        } else if (wheelNumber == 3) {
            won = true;
            payout = msg.value.div(2);
        }
        
        statuses[requestId] = WheelStatus({
            stakedAmount: msg.value,
            fees: fees,
            randomWord: wheelNumber,
            player: msg.sender,
            didWin: won,
            fulfilled: true
        });
        
        emit WheelRequest(requestId, msg.sender);
        emit WheelResult(requestId, won, wheelNumber, payout);
        
        if (won && payout > 0) {
            (bool success, ) = payable(msg.sender).call{value: payout}("");
            require(success, "Transfer failed");
        }
        
        return requestId;
    }
    
    function getStatus(uint256 requestId) 
        external 
        view 
        returns (WheelStatus memory) {
        return statuses[requestId];
    }
    
    function fundContract() external payable onlyOwner {}
    
    function withdraw(uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, "Insufficient balance");
        (bool success, ) = payable(owner).call{value: amount}("");
        require(success, "Withdrawal failed");
    }
    
    function setHouseFee(uint256 _fee) external onlyOwner {
        require(_fee <= 10, "Fee too high");
        houseFee = _fee;
    }
    
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    receive() external payable {}
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
    
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "SafeMath: modulo by zero");
        return a % b;
    }
}