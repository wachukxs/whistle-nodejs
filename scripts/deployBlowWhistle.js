async function main() {
    const BlowWhistle = await ethers.getContractFactory("BlowWhistle");

    // Start deployment, returning a promise that resolves to a contract object
    const blow_whistle = await BlowWhistle.deploy("Hey There!");
    console.log("Contract deployed to address:", blow_whistle.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });