declare let window: any;

import { Dispatch, AnyAction } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { setResult } from "../store/result/result.reducer";

// Contract ABIs - Import the ABI array directly
import coinContractABI from '../abis/Coin.json';
import diceContractABI from '../abis/Dice.json';
import wheelContractABI from '../abis/Wheel.json';

// MUSD Contract ABI (minimal)
const MUSD_ABI = [
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)"
];

// Contract addresses on Mezo Testnet
const coinContractAddress = "0xcdecCF70Dcee1B96dc7d2d146644EF48921A8201";
const diceContractAddress = "0xA3Bc22C7250A81DE7fd60D8Dc61ac7E6434126a7";
const wheelContractAddress = "0x3ed7b683b255f7d866327ce31e4B17cEeAdE578f";
const MUSD_ADDRESS = "0x118917a40FAF1CD7a13dB0Ef56C86De7973Ac503";

// Helper to get provider and signer
const getProviderAndSigner = async () => {
  if (!window.ethereum) {
    throw new Error("Please install MetaMask!");
  }
  
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return { provider, signer };
};

// Helper to approve MUSD spending
const approveMusd = async (
  contractAddress: string,
  amount: string,
  signer: ethers.JsonRpcSigner
): Promise<boolean> => {
  try {
    const musdContract = new ethers.Contract(MUSD_ADDRESS, MUSD_ABI, signer);
    const amountWei = ethers.parseEther(amount);
    
    // Check current allowance
    const currentAllowance = await musdContract.allowance(
      await signer.getAddress(),
      contractAddress
    );
    
    // If allowance is sufficient, no need to approve again
    if (currentAllowance >= amountWei) {
      console.log("✅ Sufficient MUSD allowance already exists");
      return true;
    }
    
    // Approve MUSD spending
    console.log("🔄 Approving MUSD spending...");
    const approveTx = await musdContract.approve(contractAddress, amountWei);
    await approveTx.wait();
    console.log("✅ MUSD approved successfully");
    return true;
  } catch (error) {
    console.error("❌ Error approving MUSD:", error);
    return false;
  }
};

// ========== COIN FLIP ==========

export const flip = async (
  choice: number,
  stake: number,
  address: string
) => {
  try {
    console.log("🪙 Starting coin flip...", { choice, stake, address });
    const { signer } = await getProviderAndSigner();
    const stakeStr = stake.toString();
    
    // Approve MUSD
    const approved = await approveMusd(coinContractAddress, stakeStr, signer);
    if (!approved) {
      return { status: "MUSD approval failed" };
    }
    
    // Create contract instance - Extract ABI properly
    const abi = coinContractABI.abi || coinContractABI;
    const coinContract = new ethers.Contract(
      coinContractAddress,
      abi,
      signer
    );
    
    // Call flip function with MUSD amount
    const betAmount = ethers.parseEther(stakeStr);
    console.log("🎲 Calling flip function...", { choice, betAmount: betAmount.toString() });
    const tx = await coinContract.flip(choice, betAmount);
    console.log("⏳ Waiting for transaction confirmation...");
    await tx.wait();
    console.log("✅ Transaction confirmed!", tx.hash);
    
    return {
      status: "successful",
      hash: tx.hash
    };
  } catch (error: any) {
    console.error("❌ Error in flip:", error);
    return {
      status: error.message || "Transaction failed",
    };
  }
};

export const getRequestId = async (choice: number) => {
  try {
    const { provider } = await getProviderAndSigner();
    const abi = coinContractABI.abi || coinContractABI;
    const coinContract = new ethers.Contract(
      coinContractAddress,
      abi,
      provider
    );
    
    const counter = await coinContract.requestCounter();
    const requestId = Number(counter) - 1;
    console.log("📝 Request ID:", requestId);
    return requestId;
  } catch (error) {
    console.error("❌ Error getting request ID:", error);
    return 0;
  }
};

export const getResult = async (id: number, dispatch: Dispatch<AnyAction>) => {
  try {
    console.log("🔍 Getting coin flip result for ID:", id);
    const { provider } = await getProviderAndSigner();
    const abi = coinContractABI.abi || coinContractABI;
    const coinContract = new ethers.Contract(
      coinContractAddress,
      abi,
      provider
    );
    
    const status = await coinContract.getStatus(id);
    
    // The actual coin result (what the coin landed on)
    const coinResult = status.randomWord % 2n === 0n ? 'tails' : 'heads';
    
    console.log('🎲 Coin Flip Result:', {
      requestId: id,
      randomWord: status.randomWord.toString(),
      result: coinResult,
      yourChoice: status.choice === 0 ? 'heads' : 'tails',
      didWin: status.didWin,
      stakedAmount: ethers.formatEther(status.stakedAmount),
      fees: ethers.formatEther(status.fees)
    });
    
    // Dispatch the simple string result
    dispatch(setResult(coinResult));
    return coinResult;
  } catch (error) {
    console.error("❌ Error getting result:", error);
    return null;
  }
};

// ========== DICE ==========

export const roll = async (
  choice: number,
  stake: number,
  address: string
) => {
  try {
    console.log("🎲 Starting dice roll...", { choice, stake, address });
    const { signer } = await getProviderAndSigner();
    const stakeStr = stake.toString();
    
    // Approve MUSD
    const approved = await approveMusd(diceContractAddress, stakeStr, signer);
    if (!approved) {
      return { status: "MUSD approval failed" };
    }
    
    // Create contract instance
    const abi = diceContractABI.abi || diceContractABI;
    const diceContract = new ethers.Contract(
      diceContractAddress,
      abi,
      signer
    );
    
    // Call roll function with MUSD amount
    const betAmount = ethers.parseEther(stakeStr);
    console.log("🎲 Calling roll function...", { choice, betAmount: betAmount.toString() });
    const tx = await diceContract.roll(choice, betAmount);
    console.log("⏳ Waiting for transaction confirmation...");
    await tx.wait();
    console.log("✅ Transaction confirmed!", tx.hash);
    
    return {
      status: "successful",
      hash: tx.hash
    };
  } catch (error: any) {
    console.error("❌ Error in roll:", error);
    return {
      status: error.message || "Transaction failed",
    };
  }
};

export const getDiceRequestId = async (choice: number) => {
  try {
    const { provider } = await getProviderAndSigner();
    const abi = diceContractABI.abi || diceContractABI;
    const diceContract = new ethers.Contract(
      diceContractAddress,
      abi,
      provider
    );
    
    const counter = await diceContract.requestCounter();
    const requestId = Number(counter) - 1;
    console.log("📝 Dice Request ID:", requestId);
    return requestId;
  } catch (error) {
    console.error("❌ Error getting dice request ID:", error);
    return 0;
  }
};

export const getDiceResult = async (id: number, dispatch: Dispatch<AnyAction>) => {
  try {
    console.log("🔍 Getting dice result for ID:", id);
    const { provider } = await getProviderAndSigner();
    const abi = diceContractABI.abi || diceContractABI;
    const diceContract = new ethers.Contract(
      diceContractAddress,
      abi,
      provider
    );
    
    const status = await diceContract.getStatus(id);
    
    const roll1 = Number(status.randomWord1);
    const roll2 = Number(status.randomWord2);
    const total = roll1 + roll2;
    
    console.log('🎲 Dice Roll Result:', {
      requestId: id,
      roll1,
      roll2,
      total,
      yourChoice: status.choice === 0 ? 'greater than 6' : 'less than 6',
      didWin: status.didWin,
      stakedAmount: ethers.formatEther(status.stakedAmount),
      fees: ethers.formatEther(status.fees)
    });
    
    // Return the total as a string
    const result = total.toString();
    dispatch(setResult(result));
    return result;
  } catch (error) {
    console.error("❌ Error getting dice result:", error);
    return null;
  }
};

// ========== WHEEL ==========

export const spinWheel = async (stake: number, address: string) => {
  try {
    console.log("🎡 Starting wheel spin...", { stake, address });
    const { signer } = await getProviderAndSigner();
    const stakeStr = stake.toString();
    
    // Approve MUSD
    const approved = await approveMusd(wheelContractAddress, stakeStr, signer);
    if (!approved) {
      return { status: "MUSD approval failed" };
    }
    
    // Create contract instance
    const abi = wheelContractABI.abi || wheelContractABI;
    const wheelContract = new ethers.Contract(
      wheelContractAddress,
      abi,
      signer
    );
    
    // Call spin function with MUSD amount
    const betAmount = ethers.parseEther(stakeStr);
    console.log("🎡 Calling spin function...", { betAmount: betAmount.toString() });
    const tx = await wheelContract.spin(betAmount);
    console.log("⏳ Waiting for transaction confirmation...");
    await tx.wait();
    console.log("✅ Transaction confirmed!", tx.hash);
    
    return {
      status: "successful",
      hash: tx.hash
    };
  } catch (error: any) {
    console.error("❌ Error in spinWheel:", error);
    return {
      status: error.message || "Transaction failed",
    };
  }
};

export const getWheelRequestId = async () => {
  try {
    const { provider } = await getProviderAndSigner();
    const abi = wheelContractABI.abi || wheelContractABI;
    const wheelContract = new ethers.Contract(
      wheelContractAddress,
      abi,
      provider
    );
    
    const counter = await wheelContract.requestCounter();
    const requestId = Number(counter) - 1;
    console.log("📝 Wheel Request ID:", requestId);
    return requestId;
  } catch (error) {
    console.error("❌ Error getting wheel request ID:", error);
    return 0;
  }
};

export const getWheelResult = async (id: number, dispatch: Dispatch<AnyAction>) => {
  try {
    console.log("🔍 Getting wheel result for ID:", id);
    const { provider } = await getProviderAndSigner();
    const abi = wheelContractABI.abi || wheelContractABI;
    const wheelContract = new ethers.Contract(
      wheelContractAddress,
      abi,
      provider
    );
    
    const status = await wheelContract.getStatus(id);
    
    const wheelNumber = Number(status.randomWord);
    
    // Calculate multiplier based on wheel number
    let multiplier = 0;
    if (wheelNumber === 0 || wheelNumber === 4) multiplier = 1;
    else if (wheelNumber === 1 || wheelNumber === 5) multiplier = 2;
    else if (wheelNumber === 3) multiplier = 0.5;
    
    console.log('🎡 Wheel Spin Result:', {
      requestId: id,
      wheelNumber,
      multiplier,
      didWin: status.didWin,
      stakedAmount: ethers.formatEther(status.stakedAmount),
      fees: ethers.formatEther(status.fees)
    });
    
    // Return the multiplier as a string
    const result = multiplier.toString();
    dispatch(setResult(result));
    return result;
  } catch (error) {
    console.error("❌ Error getting wheel result:", error);
    return null;
  }
};