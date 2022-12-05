/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { MY_ALCHEMY_API_KEY, MY_METAMASK_PRIVATE_KEY, ALCHEMY_API_BASE_URL, POLYGON_MAINNET, POLYGON_MUMBAI } = process.env;

module.exports = {
  solidity: "0.8.17",
   defaultNetwork: "goerli",
   networks: {
      hardhat: {},
      goerli: {
         url: `${ALCHEMY_API_BASE_URL}${MY_ALCHEMY_API_KEY}`,
         accounts: [`0x${MY_METAMASK_PRIVATE_KEY}`]
      },
      mumbai: {
         url: `${POLYGON_MUMBAI}`,
         accounts: [`0x${MY_METAMASK_PRIVATE_KEY}`]
      }
   },
}