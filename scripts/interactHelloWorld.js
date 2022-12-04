require('dotenv').config();
const { MY_ALCHEMY_API_KEY, MY_METAMASK_PRIVATE_KEY, ALCHEMY_API_BASE_URL, HW_CONTRACT_ADDRESS } = process.env;

// For Hardhat 
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

// If you want to see the ABI:
// console.log(JSON.stringify(contract.abi));

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network = "goerli", MY_ALCHEMY_API_KEY);

// Signer
const signer = new ethers.Wallet(MY_METAMASK_PRIVATE_KEY, alchemyProvider);

// Contract
const helloWorldContract = new ethers.Contract(HW_CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
    const message = await helloWorldContract.message();
    console.log("The message is: " + message);

    console.log("Updating the message...");
    const tx = await helloWorldContract.update("This is the new message.");
    await tx.wait();

    const newMessage = await helloWorldContract.message();
    console.log("The new message is: " + newMessage);
}
main();