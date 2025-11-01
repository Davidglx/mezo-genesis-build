/// npx hardhat console --network mezoTestnet

// Your new addresses
const musdAddress = "0x118917a40FAF1CD7a13dB0Ef56C86De7973Ac503";
const coinAddress = "0xcdecCF70Dcee1B96dc7d2d146644EF48921A8201";
const diceAddress = "0xA3Bc22C7250A81DE7fd60D8Dc61ac7E6434126a7";
const wheelAddress = "0x3ed7b683b255f7d866327ce31e4B17cEeAdE578f";

// Get contracts
const musd = await ethers.getContractAt("IERC20", musdAddress);
const coin = await ethers.getContractAt("Coin", coinAddress);
const dice = await ethers.getContractAt("Dice", diceAddress);
const wheel = await ethers.getContractAt("Wheel", wheelAddress);

console.log("💰 Checking your MUSD balance...");
const myBalance = await musd.balanceOf((await ethers.getSigners())[0].address);
console.log("   Balance:", ethers.formatEther(myBalance), "MUSD\n");

console.log("📝 Approving contracts...");
const approveAmount = ethers.parseEther("1000");
await musd.approve(coinAddress, approveAmount);
console.log("   ✅ Approved Coin");
await musd.approve(diceAddress, approveAmount);
console.log("   ✅ Approved Dice");
await musd.approve(wheelAddress, approveAmount);
console.log("   ✅ Approved Wheel\n");

console.log("💰 Funding contracts with 10 MUSD each...");
const fundAmount = ethers.parseEther("10");

const tx1 = await coin.fundContract(fundAmount);
await tx1.wait();
console.log("   ✅ Funded Coin");

const tx2 = await dice.fundContract(fundAmount);
await tx2.wait();
console.log("   ✅ Funded Dice");

const tx3 = await wheel.fundContract(fundAmount);
await tx3.wait();
console.log("   ✅ Funded Wheel\n");

console.log("📊 Verifying balances...");
console.log("   Coin: ", ethers.formatEther(await coin.getMUSDBalance()), "MUSD");
console.log("   Dice: ", ethers.formatEther(await dice.getMUSDBalance()), "MUSD");
console.log("   Wheel:", ethers.formatEther(await wheel.getMUSDBalance()), "MUSD");

console.log("\n🎉 All contracts funded and ready to play!");