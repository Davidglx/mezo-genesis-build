// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Dice is ReentrancyGuard {
    using SafeMath for uint256;
    
    event DiceRequest(uint256 indexed requestId, address indexed player);
    event DiceResult(uint256 indexed requestId, bool didWin, uint256 roll1, uint256 roll2, uint256 total);
    
    struct DiceStatus {
        uint256 stakedAmount;
        uint256 fees;
        uint256 randomWord1;
        uint256 randomWord2;
        address player;
        bool didWin;
        bool fulfilled;
        DiceSelection choice;
    }
    
    enum DiceSelection {
        GREATERTHAN6,
        LESSTHAN6
    }
    
    mapping(uint256 => DiceStatus) public statuses;
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
    
    function roll(DiceSelection choice) 
        external 
        payable 
        nonReentrant
        returns (uint256) {
        require(msg.value > 0, "Must send BTC to play");
        require(msg.value <= address(this).balance / 10, "Bet too high");
        
        uint256 requestId = requestCounter++;
        
        uint256 random1 = getRandomNumber().mod(6).add(1);
        uint256 random2 = getRandomNumber().mod(6).add(1);
        uint256 total = random1.add(random2);
        
        bool won = false;
        if (choice == DiceSelection.GREATERTHAN6 && total > 6) {
            won = true;
        } else if (choice == DiceSelection.LESSTHAN6 && total < 6) {
            won = true;
        }
        
        uint256 fees = msg.value.mul(houseFee).div(100);
        
        statuses[requestId] = DiceStatus({
            stakedAmount: msg.value,
            fees: fees,
            randomWord1: random1,
            randomWord2: random2,
            player: msg.sender,
            didWin: won,
            fulfilled: true,
            choice: choice
        });
        
        emit DiceRequest(requestId, msg.sender);
        emit DiceResult(requestId, won, random1, random2, total);
        
        if (won) {
            uint256 payout = msg.value.mul(2).sub(fees);
            (bool success, ) = payable(msg.sender).call{value: payout}("");
            require(success, "Transfer failed");
        }
        
        return requestId;
    }
    
    function getStatus(uint256 requestId) 
        external 
        view 
        returns (DiceStatus memory) {
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