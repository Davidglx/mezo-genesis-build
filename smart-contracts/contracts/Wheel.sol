// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
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
    
    function spin(uint256 betAmount) 
        external 
        nonReentrant
        returns (uint256) {
        require(betAmount > 0, "Must bet some MUSD");
        require(betAmount <= getMUSDBalance().div(10), "Bet too high");
        
        require(musd.transferFrom(msg.sender, address(this), betAmount), "MUSD transfer failed");
        
        uint256 requestId = requestCounter;
        requestCounter = requestCounter.add(1);
        
        uint256 wheelNumber = getRandomNumber().mod(6);
        
        bool won = false;
        uint256 payout = 0;
        uint256 fees = betAmount.mul(houseFee).div(100);
        
        // Wheel outcomes:
        // 0 or 4: Break even (1x - fees)
        // 1 or 5: Big win (2x - fees)
        // 3: Half back (0.5x, no fees)
        // 2: Lose everything
        
        if (wheelNumber == 0 || wheelNumber == 4) {
            won = true;
            payout = betAmount.sub(fees);
        } else if (wheelNumber == 1 || wheelNumber == 5) {
            won = true;
            payout = betAmount.mul(2).sub(fees);
        } else if (wheelNumber == 3) {
            won = true;
            payout = betAmount.div(2);
        }
        // wheelNumber == 2: won stays false, payout stays 0
        
        statuses[requestId] = WheelStatus({
            stakedAmount: betAmount,
            fees: fees,
            randomWord: wheelNumber,
            player: msg.sender,
            didWin: won,
            fulfilled: true
        });
        
        emit WheelRequest(requestId, msg.sender);
        emit WheelResult(requestId, won, wheelNumber, payout);
        
        if (won && payout > 0) {
            require(musd.transfer(msg.sender, payout), "Payout failed");
        }
        
        return requestId;
    }
    
    function getStatus(uint256 requestId) 
        external 
        view 
        returns (WheelStatus memory) {
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
    
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "SafeMath: modulo by zero");
        return a % b;
    }
}