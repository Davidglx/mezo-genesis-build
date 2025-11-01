//@ts-ignore
const hre = require("hardhat");

// Helper function to delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//@ts-ignore
async function main() {
  const [player] = await hre.ethers.getSigners();
  
  console.log("\n🎮 Testing MEZO-Genesis Games on Mezo Testnet\n");
  console.log("Player address:", player.address);
  
  const balance = await hre.ethers.provider.getBalance(player.address);
  console.log("Player BTC balance:", hre.ethers.formatEther(balance), "BTC\n");
  
  // Contract addresses - 
  const musdAddress = "0x118917a40FAF1CD7a13dB0Ef56C86De7973Ac503";
  const coinAddress = "0xcdecCF70Dcee1B96dc7d2d146644EF48921A8201";
  const diceAddress = "0xA3Bc22C7250A81DE7fd60D8Dc61ac7E6434126a7";
  const wheelAddress = "0x3ed7b683b255f7d866327ce31e4B17cEeAdE578f";
  
  // Get contracts
  const musd = await hre.ethers.getContractAt("IERC20", musdAddress);
  const Coin = await hre.ethers.getContractFactory("Coin");
  const coin = Coin.attach(coinAddress);
  const Dice = await hre.ethers.getContractFactory("Dice");
  const dice = Dice.attach(diceAddress);
  const Wheel = await hre.ethers.getContractFactory("Wheel");
  const wheel = Wheel.attach(wheelAddress);
  
  // Check MUSD balance
  const musdBalance = await musd.balanceOf(player.address);
  console.log("💰 Your MUSD balance:", hre.ethers.formatEther(musdBalance), "MUSD\n");
  
  // Check contract balances
  console.log("📊 Contract MUSD Balances:");
  console.log("   Coin: ", hre.ethers.formatEther(await coin.getMUSDBalance()), "MUSD");
  console.log("   Dice: ", hre.ethers.formatEther(await dice.getMUSDBalance()), "MUSD");
  console.log("   Wheel:", hre.ethers.formatEther(await wheel.getMUSDBalance()), "MUSD\n");
  
  const betAmount = hre.ethers.parseEther("1"); // 1 MUSD bet
  
  // Approve all contracts to spend MUSD
  console.log("📝 Approving contracts to spend MUSD...");
  const approveAmount = hre.ethers.parseEther("10"); // Approve 10 MUSD
  await musd.approve(coinAddress, approveAmount);
  await musd.approve(diceAddress, approveAmount);
  await musd.approve(wheelAddress, approveAmount);
  console.log("✅ All contracts approved!\n");
  
  await delay(2000); // Wait 2 seconds
  
  // Test Coin
  console.log("🪙 Playing Coin...");
  console.log("   Betting:", hre.ethers.formatEther(betAmount), "MUSD on HEADS");
  
  const coinCounterBefore = await coin.requestCounter();
  
  const flipTx = await coin.flip(0, betAmount); // 0 = HEADS
  await flipTx.wait();
  
  console.log("   Transaction:", `https://explorer.test.mezo.org/tx/${flipTx.hash}`);
  
  const flipRequestId = coinCounterBefore;
  const flipStatus = await coin.getStatus(flipRequestId);
  
  console.log("   Your choice: HEADS");
  console.log("   Result:", flipStatus.randomWord % 2n === 0n ? "TAILS" : "HEADS");
  console.log("   Random number:", flipStatus.randomWord.toString());
  console.log("   You", flipStatus.didWin ? "WON! 🎉" : "LOST 😢\n");
  
  await delay(3000); // Wait 3 seconds between games
  
  // Test Dice
  console.log("🎲 Playing Dice...");
  console.log("   Betting:", hre.ethers.formatEther(betAmount), "MUSD on GREATER_THAN_6");
  
  const diceCounterBefore = await dice.requestCounter();
  
  const rollTx = await dice.roll(0, betAmount); // 0 = GREATERTHAN6
  await rollTx.wait();
  
  console.log("   Transaction:", `https://explorer.test.mezo.org/tx/${rollTx.hash}`);
  
  const diceRequestId = diceCounterBefore;
  const diceStatus = await dice.getStatus(diceRequestId);
  
  console.log("   Roll 1:", diceStatus.randomWord1.toString());
  console.log("   Roll 2:", diceStatus.randomWord2.toString());
  console.log("   Total:", (diceStatus.randomWord1 + diceStatus.randomWord2).toString());
  console.log("   Your bet: GREATER_THAN_6");
  console.log("   You", diceStatus.didWin ? "WON! 🎉" : "LOST 😢\n");
  
  await delay(3000); // Wait 3 seconds between games
  
  // Test Wheel
  console.log("🎡 Playing Wheel...");
  console.log("   Betting:", hre.ethers.formatEther(betAmount), "MUSD");
  
  const wheelCounterBefore = await wheel.requestCounter();
  
  const spinTx = await wheel.spin(betAmount);
  await spinTx.wait();
  
  console.log("   Transaction:", `https://explorer.test.mezo.org/tx/${spinTx.hash}`);
  
  const wheelRequestId = wheelCounterBefore;
  const wheelStatus = await wheel.getStatus(wheelRequestId);
  
  const wheelNumber = wheelStatus.randomWord.toString();
  let wheelResult = "";
  if (wheelNumber === "0" || wheelNumber === "4") wheelResult = "Break Even (1x)";
  else if (wheelNumber === "1" || wheelNumber === "5") wheelResult = "Big Win! (2x)";
  else if (wheelNumber === "3") wheelResult = "Half Back (0.5x)";
  else wheelResult = "Lost";
  
  console.log("   Wheel landed on:", wheelNumber);
  console.log("   Result:", wheelResult);
  console.log("   Random number:", wheelStatus.randomWord.toString());
  console.log("   You", wheelStatus.didWin ? "WON! 🎉" : "LOST 😢\n");
  
  await delay(2000); // Wait before final summary
  
  // Final balances
  console.log("=".repeat(60));
  const finalMusdBalance = await musd.balanceOf(player.address);
  console.log("📊 Final MUSD balance:", hre.ethers.formatEther(finalMusdBalance), "MUSD");
  console.log("   Net change:", hre.ethers.formatEther(finalMusdBalance - musdBalance), "MUSD\n");
  
  console.log("📊 Final Contract Balances:");
  console.log("   Coin: ", hre.ethers.formatEther(await coin.getMUSDBalance()), "MUSD");
  console.log("   Dice: ", hre.ethers.formatEther(await dice.getMUSDBalance()), "MUSD");
  console.log("   Wheel:", hre.ethers.formatEther(await wheel.getMUSDBalance()), "MUSD");
  console.log("=".repeat(60));
  
  console.log("\n✅ All MUSD games tested successfully!\n");
}

main()
  //@ts-ignore
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    //@ts-ignore
    process.exit(1);
  });