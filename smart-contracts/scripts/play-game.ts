//@ts-ignore
const hre = require("hardhat");
//@ts-ignore
async function main() {
  const [player] = await hre.ethers.getSigners();
  
  console.log("\n🎮 Testing Mezo genesis Games on Mezo Testnet\n");
  console.log("Player address:", player.address);
  
  const balance = await hre.ethers.provider.getBalance(player.address);
  console.log("Player balance:", hre.ethers.formatEther(balance), "BTC\n");
  
  // Your deployed contract addresses
  const coinFlipAddr = "0x7be5A01080F9593CF07E2C72f53B66F5E3C77fA1";
  const diceAddr = "0xdC5C38f154E3b196A46d4052073706EB670F2Ae6";
  const wheelAddr = "0xDAD35F89496987F4D585f20d98f694cea7FCf854";
  
  // Connect to contracts
  const CoinFlip = await hre.ethers.getContractFactory("CoinFlip");
  const coinFlip = CoinFlip.attach(coinFlipAddr);
  
  const Dice = await hre.ethers.getContractFactory("Dice");
  const dice = Dice.attach(diceAddr);
  
  const Wheel = await hre.ethers.getContractFactory("Wheel");
  const wheel = Wheel.attach(wheelAddr);
  
  // Check contract balances
  console.log("📊 Contract Balances:");
  console.log("   CoinFlip:", hre.ethers.formatEther(await coinFlip.getBalance()), "BTC");
  console.log("   Dice:    ", hre.ethers.formatEther(await dice.getBalance()), "BTC");
  console.log("   Wheel:   ", hre.ethers.formatEther(await wheel.getBalance()), "BTC\n");
  
  const betAmount = hre.ethers.parseEther("0.0000001"); // 0.00002 BTC bet
  
  // Test CoinFlip
  console.log("🪙 Playing CoinFlip...");
  console.log("   Betting:", hre.ethers.formatEther(betAmount), "BTC on HEADS");
  const flipTx = await coinFlip.flip(0, { value: betAmount });
  const flipReceipt = await flipTx.wait();
  
  const flipRequestId = parseInt(flipReceipt.logs[0].topics[1]);
  const flipStatus = await coinFlip.getStatus(flipRequestId);
  
  console.log("   Result:", flipStatus.randomWord % 2n === 0n ? "TAILS" : "HEADS");
  console.log("   You", flipStatus.didWin ? "WON! 🎉" : "LOST 😢");
  console.log("   Transaction:", `https://explorer.test.mezo.org/tx/${flipTx.hash}\n`);
  
  // Test Dice
  console.log("🎲 Playing Dice...");
  console.log("   Betting:", hre.ethers.formatEther(betAmount), "BTC on GREATER_THAN_6");
  const rollTx = await dice.roll(0, { value: betAmount });
  const rollReceipt = await rollTx.wait();
  
  const diceRequestId = parseInt(rollReceipt.logs[0].topics[1]);
  const diceStatus = await dice.getStatus(diceRequestId);
  
  console.log("   Roll 1:", diceStatus.randomWord1.toString());
  console.log("   Roll 2:", diceStatus.randomWord2.toString());
  console.log("   Total:", (diceStatus.randomWord1 + diceStatus.randomWord2).toString());
  console.log("   You", diceStatus.didWin ? "WON! 🎉" : "LOST 😢");
  console.log("   Transaction:", `https://explorer.test.mezo.org/tx/${rollTx.hash}\n`);
  
  // Test Wheel
  console.log("🎡 Playing Wheel...");
  console.log("   Betting:", hre.ethers.formatEther(betAmount), "BTC");
  const spinTx = await wheel.spin({ value: betAmount });
  const spinReceipt = await spinTx.wait();
  
  const wheelRequestId = parseInt(spinReceipt.logs[0].topics[1]);
  const wheelStatus = await wheel.getStatus(wheelRequestId);
  
  const wheelNumber = wheelStatus.randomWord.toString();
  let wheelResult = "";
  if (wheelNumber === "0" || wheelNumber === "4") wheelResult = "Break Even";
  else if (wheelNumber === "1" || wheelNumber === "5") wheelResult = "2x WIN!";
  else if (wheelNumber === "3") wheelResult = "Half Back";
  else wheelResult = "Lost";
  
  console.log("   Wheel landed on:", wheelNumber);
  console.log("   Result:", wheelResult);
  console.log("   You", wheelStatus.didWin ? "WON! 🎉" : "LOST 😢");
  console.log("   Transaction:", `https://explorer.test.mezo.org/tx/${spinTx.hash}\n`);
  
  const finalBalance = await hre.ethers.provider.getBalance(player.address);
  console.log("📊 Final player balance:", hre.ethers.formatEther(finalBalance), "BTC");
  console.log("   Net change:", hre.ethers.formatEther(finalBalance - balance), "BTC\n");
  
  console.log("✅ All games tested successfully!");
}

main()
//@ts-ignore
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    //@ts-ignore
    process.exit(1);
  });
