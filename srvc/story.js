const path = require('path');
const _FILENAME = path.basename(__filename);

require('dotenv').config();
const { MY_ALCHEMY_API_KEY, MY_METAMASK_PRIVATE_KEY, ALCHEMY_API_BASE_URL, HW_CONTRACT_ADDRESS } = process.env;

const { ethers } = require("ethers");

// For Hardhat
const _blowWhistleContract = require("../artifacts/contracts/BlowWhistle.sol/BlowWhistle.json");

// If you want to see the ABI:
// console.log(JSON.stringify(_blowWhistleContract.abi));

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network = "maticmum", MY_ALCHEMY_API_KEY);

// Signer
const signer = new ethers.Wallet(MY_METAMASK_PRIVATE_KEY, alchemyProvider);

// Contract
const blowWhistleContract = new ethers.Contract(HW_CONTRACT_ADDRESS, _blowWhistleContract.abi, signer);

exports.newStory = async (req, res) => {
    /**
     * #swagger.tags = ['Story']
     */

    try {
        const _FUNCTIONNAME = 'newStory'
        console.log('hitting', _FILENAME, _FUNCTIONNAME);
        console.log('Body', req.body);
    
        console.log("Updating the story...");
        const tx = await blowWhistleContract.newStory(JSON.stringify(req.body));
        await tx.wait();
    
        res.status(200).json({
            message: 'GOOD'
        })
    } catch (error) {
        res.status(503).json({
            message: 'BAD',
            error
        })
    }
}