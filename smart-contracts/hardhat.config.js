require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    mezoTestnet: {
      url: "https://rpc.test.mezo.org",
      chainId: 31611,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    mezoMainnet: {
      url: "https://mainnet.mezo.public.validationcloud.io",
      chainId: 31612,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  }
};
