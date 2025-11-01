// @ts-ignore
const hre = require("hardhat");

async function main() {
  console.log("🎮 Deploying MUSD-Powered Mezo genesis Contracts to Mezo...\n");
  console.log("=".repeat(60));
  
  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying with account:", deployer.address);
  
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "BTC");
  console.log("=".repeat(60) + "\n");
  
  // MUSD Testnet Address
  const MUSD_TESTNET = "0x118917a40FAF1CD7a13dB0Ef56C86De7973Ac503";
  console.log("💵 MUSD Token:", MUSD_TESTNET, "\n");
  
  // Deploy Coin
  console.log("🪙 Deploying Coin contract...");
  const Coin = await hre.ethers.getContractFactory("Coin");
  const coin = await Coin.deploy(MUSD_TESTNET);
  await coin.waitForDeployment();
  const coinAddress = await coin.getAddress();
  console.log("✅ Coin deployed to:", coinAddress);
  console.log("📝 Explorer:", `https://explorer.test.mezo.org/address/${coinAddress}\n`);
  
  // Deploy Dice
  console.log("🎲 Deploying Dice contract...");
  const Dice = await hre.ethers.getContractFactory("Dice");
  const dice = await Dice.deploy(MUSD_TESTNET);
  await dice.waitForDeployment();
  const diceAddress = await dice.getAddress();
  console.log("✅ Dice deployed to:", diceAddress);
  console.log("📝 Explorer:", `https://explorer.test.mezo.org/address/${diceAddress}\n`);
  
  // Deploy Wheel
  console.log("🎡 Deploying Wheel contract...");
  const Wheel = await hre.ethers.getContractFactory("Wheel");
  const wheel = await Wheel.deploy(MUSD_TESTNET);
  await wheel.waitForDeployment();
  const wheelAddress = await wheel.getAddress();
  console.log("✅ Wheel deployed to:", wheelAddress);
  console.log("📝 Explorer:", `https://explorer.test.mezo.org/address/${wheelAddress}\n`);
  
  console.log("=".repeat(60));
  console.log("🎉 DEPLOYMENT COMPLETE!");
  console.log("=".repeat(60));
  console.log("\n📋 Contract Addresses:\n");
  console.log("   Coin:  ", coinAddress);
  console.log("   Dice:  ", diceAddress);
  console.log("   Wheel: ", wheelAddress);
  console.log("\n🔗 Save these addresses for your frontend!");
  console.log("\n⚠️  NEXT STEPS:");
  console.log("   1. Add MUSD token to MetaMask");
  console.log("   2. Approve contracts to spend your MUSD");
  console.log("   3. Fund contracts with MUSD");
  console.log("   4. Test games!\n");
}

main()
  //@ts-ignore
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    //@ts-ignore
    process.exit(1);
  });