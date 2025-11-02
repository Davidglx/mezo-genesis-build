<h1 align="center">
 Mezo-Genesis
 </h1>

<h3 align="center">Provably fair casino games powered by Mezo using MUSD</h3>
<p align="center">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="Typescript version" height="20" style="
       border-radius: 20px;
    ">
        <img src="https://img.shields.io/badge/Built_On-₿itcoin-red" alt="Built with Bitcoin" height="20">
    <img src="https://img.shields.io/badge/React-red?logo=react" alt="React" height="20">
     <img src="https://img.shields.io/badge/Built_On-Mezo-orange?style=for-the-badge" alt="Mezo" height="20">
    <img src="https://img.shields.io/badge/Powered_By-₿itcoin-orange?style=for-the-badge" alt="Bitcoin" height="20">
</p>

## 🎮 Overview

<h1 align="center">
    <br>
    <a href="">
        <img src="https://i.postimg.cc/N0VN0FZx/4.png" alt="mezo blockchain" width="384"  />
    </a>
    <br>
</h1>

MEZO-Genesis is a decentralized casino platform built on the Mezo, offering provably fair gaming experiences powered by MUSD stablecoin. Players can enjoy instant, transparent, and verifiable games with automatic payouts—all secured by Bitcoin's security model.

## 🤔 Problem

Traditional online casinos are plagued by:
- **Opaque fairness**: Players can't verify game outcomes
- **Delayed payouts**: Withdrawals take 3-7 days with manual approvals
- **Custody risk**: Players must trust casinos with their funds
- **Arbitrary restrictions**: Geographic bans and sudden account freezes
- **Hidden fees**: Unclear house edges and withdrawal charges


## ✅ Solution

MEZO-Genesis solves these problems by:

✅ **Provably Fair** - All game results are generated on-chain using verifiable randomness  
✅ **Instant Payouts** - Win or lose, results happen in seconds with automatic wallet deposits  
✅ **Low Fees** - Only 5% house fee + minimal gas costs (~$0.01 per game)  
✅ **Fully Transparent** - Every game is recorded on the blockchain and publicly verifiable  
✅ **Non-Custodial** - Players maintain full control of their funds via MetaMask  
✅ **Bitcoin-Secured** - Built on Mezo L2, inheriting Bitcoin's security guarantees  

### Key Features:

🪙 **Coin Flip** - Classic heads or tails with 2x payouts  
🎲 **Dice Roll** - Roll two dice, bet greater or less than 6  
🎡 **Wheel of Fortune** - Spin for multipliers from 0.5x to 2x  
💰 **MUSD Integration** - Borrow against BTC to play with stablecoin  
🔗 **MetaMask Compatible** - Easy wallet connection and management  
📊 **Transaction History** - View all your games on Mezo Explorer  

---

## 🏗️ Technology Stack

**Frontend:**
- Next + TypeScript - Modern UI framework
- Redux Toolkit - State management with persistence
- Styled Components - Dynamic, themeable styling
- ethers.js v6 - Blockchain interactions


**Smart Contracts:**
- Solidity ^0.8.20 - Contract language
- Hardhat - Development environment
- OpenZeppelin - Secure contract libraries
- ReentrancyGuard - Protection against exploits

**Blockchain:**
- Mezo Testnet - Bitcoin Layer 2
- MUSD Token - Stablecoin for betting
- On-chain Randomness - Using block data + nonce

---

## 🎯 Deployed Contracts (Mezo Testnet)

| Contract | Address | Purpose |
|----------|---------|---------|
| **Coin** | `0xcdecCF70Dcee1B96dc7d2d146644EF48921A8201` | Coin flip game |
| **Dice** | `0xA3Bc22C7250A81DE7fd60D8Dc61ac7E6434126a7` | Dice roll game |
| **Wheel** | `0x3ed7b683b255f7d866327ce31e4B17cEeAdE578f` | Wheel spin game |
| **MUSD** | `0x118917a40FAF1CD7a13dB0Ef56C86De7973Ac503` | Stablecoin token |

---

## 🛠️ Project Structure
```
mezo-genesis/
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # WalletContext
│   │   ├── store/          # Redux store
│   │   ├── utils/          # Contract interactions
│   │   ├── pages/          # Game pages
│   │   └── abis/           # Contract ABIs
│   ├── public/             # Static assets
│   └── package.json
│
├── smart-contracts/
│   ├── contracts/          # Solidity contracts
│   │   ├── Coin.sol
│   │   ├── Dice.sol
│   │   └── Wheel.sol
│   ├── scripts/            # Deploy scripts
│   ├── test/               # Contract tests
│   └── hardhat.config.js
│
└── README.md
```

## 🔒 Security Features

- ✅ Audited OpenZeppelin contracts
- ✅ ReentrancyGuard on all game functions
- ✅ Owner-only administrative controls
- ✅ Bet limits to prevent contract drainage
- ✅ No custody of user funds
- ✅ All randomness generated on-chain

## 🔗 Links

- [Live link](https://mezo-genesis.netlify.app)
- [YouTube](https://www.youtube.com/watch?v=POU0h927QVU)
- [Figma Design](https://www.figma.com/design/7Ize9gMFJbCMEi8x6RYvN0/MezoGenesis-build?node-id=0-1&p=f&t=VS1Pxnqze6ihfz7Z-0)
- **Mezo Explorer:** [Coin](https://explorer.test.mezo.org/0xcdecCF70Dcee1B96dc7d2d146644EF48921A8201), [Dice](https://explorer.test.mezo.org/0xA3Bc22C7250A81DE7fd60D8Dc61ac7E6434126a7), [Wheel](https://explorer.test.mezo.org/0x3ed7b683b255f7d866327ce31e4B17cEeAdE578f)

---

## 🫡 Team.
- [David Johnson](https://github.com/DavidJohnson) - Software Engineer
- [Samuel Tosin](https://github.com/Samuellyworld) - Software Engineer 

## 📚 Resources

- [Mezo Documentation](https://docs.mezo.org)
- [MUSD Token Info](https://mezo.org/musd)
- [Hardhat Docs](https://hardhat.org/docs)
- [ethers.js Docs](https://docs.ethers.org)

## 🤝 Contributing

Contributions are welcome! Please open issues and pull requests for bug fixes, features, or improvements.
To contribute:
1. Fork the repository and check the installation instructions.
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


