// @ts-ignore
const hre = require("hardhat");

async function main() {
  console.log("🎮 Deploying Mezo Contracts to Mezo Blockchain...\n");
  console.log("=".repeat(60));
  
  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying with account:", deployer.address);
  
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "BTC");
  console.log("=".repeat(60) + "\n");
  
  // Deploy CoinFlip
  console.log("🪙 Deploying CoinFlip contract...");
  const CoinFlip = await hre.ethers.getContractFactory("CoinFlip");
  const coinFlip = await CoinFlip.deploy();
  await coinFlip.waitForDeployment();
  const coinFlipAddress = await coinFlip.getAddress();
  console.log("✅ CoinFlip deployed to:", coinFlipAddress);
  console.log("📝 Explorer:", `https://explorer.test.mezo.org/address/${coinFlipAddress}\n`);
  
  // Deploy Dice
  console.log("🎲 Deploying Dice contract...");
  const Dice = await hre.ethers.getContractFactory("Dice");
  const dice = await Dice.deploy();
  await dice.waitForDeployment();
  const diceAddress = await dice.getAddress();
  console.log("✅ Dice deployed to:", diceAddress);
  console.log("📝 Explorer:", `https://explorer.test.mezo.org/address/${diceAddress}\n`);
  
  // Deploy Wheel
  console.log("🎡 Deploying Wheel contract...");
  const Wheel = await hre.ethers.getContractFactory("Wheel");
  const wheel = await Wheel.deploy();
  await wheel.waitForDeployment();
  const wheelAddress = await wheel.getAddress();
  console.log("✅ Wheel deployed to:", wheelAddress);
  console.log("📝 Explorer:", `https://explorer.test.mezo.org/address/${wheelAddress}\n`);
  
  // Fund contracts
  const fundAmount = hre.ethers.parseEther("0.001");

  console.log("💰 Funding contracts with 0.001 BTC each...");

  const coinFlipFundTx = await coinFlip.fundContract({ value: fundAmount });
  await coinFlipFundTx.wait();
  console.log("✅ CoinFlip funded!");
  
  const diceFundTx = await dice.fundContract({ value: fundAmount });
  await diceFundTx.wait();
  console.log("✅ Dice funded!");
  
  const wheelFundTx = await wheel.fundContract({ value: fundAmount });
  await wheelFundTx.wait();
  console.log("✅ Wheel funded!\n");
  
  console.log("=".repeat(60));
  console.log("🎉 DEPLOYMENT COMPLETE!");
  console.log("=".repeat(60));
  console.log("\n📋 Contract Addresses:\n");
  console.log("   CoinFlip: ", coinFlipAddress);
  console.log("   Dice:     ", diceAddress);
  console.log("   Wheel:    ", wheelAddress);
  console.log("\n🔗 Save these addresses for your frontend!");
}

main()
//@ts-ignore
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    //@ts-ignore
    process.exit(1);
  });