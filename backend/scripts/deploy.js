const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
  const MEMEToken = await hre.ethers.getContractFactory("MEMEToken");
  const memeToken = await MEMEToken.deploy(deployer.address);
  
  await memeToken.waitForDeployment();
  
  console.log("MEMEToken deployed to:", await memeToken.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });