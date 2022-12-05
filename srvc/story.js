const path = require('path');
const _FILENAME = path.basename(__filename);

const axios = require('axios');
require('dotenv').config();
const { MY_ALCHEMY_API_KEY, MY_METAMASK_PRIVATE_KEY, ALCHEMY_API_BASE_URL, HW_CONTRACT_ADDRESS, POLYGON_MUMBAI } = process.env;
const { Alchemy, Network } = require("alchemy-sdk");

const { ethers, providers } = require("ethers");

const web3 = require('web3');

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

exports.getStories = async (req, res) => {


    try {
        const _FUNCTIONNAME = 'getStories'
        console.log('hitting', _FILENAME, _FUNCTIONNAME);
        const config = {
            apiKey: MY_ALCHEMY_API_KEY,
            network: Network.MATIC_MUMBAI,
        };
        const alchemy = new Alchemy(config);

        const data = await alchemy.core.getLogs({
            fromBlock: "0x0",
            address: HW_CONTRACT_ADDRESS,
        });

        // ethers.utils.

        // alchemyProvider.getLogs({})
        
        function hex2a(hexx) {
            let hex = hexx.toString();//force conversion
            let str = '';
            for (let i = 0; i < hex.length; i += 2)
                str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
            return str;
        }

        // const data = await axios.post(`${POLYGON_MUMBAI}`, {
        //     "jsonrpc": "2.0",
        //     "id": 0,
        //     "method": "alchemy_getAssetTransfers",
        //     "params": [
        //         {
        //             "fromBlock": "0x0",
        //             "fromAddress": HW_CONTRACT_ADDRESS,
        //         }
        //     ]
        // })

        // for (let index = 0; index < data.length; index++) {
        //     let element = data[index];
        //     element.data = web3.utils.hexToAscii(element.data) // hex2a(element.data)
            
        // }

        res.status(200).json({
            message: 'GOOD',
            data
        })


    } catch (error) {
        console.log(error);
        res.status(503).json({
            message: 'BAD',
            error: error
        })
    }
}