const hre = require("hardhat");

async function main() {
  console.log(
    "running running running running running running running running running running running running running running running from my shit life at school"
  );

  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "running running running running running running running running running running running running running running running from my shit life at school"
  );
  console.log("Deploying contracts with the account:", deployer.address);

  const SendEther = await hre.ethers.getContractFactory("SendEther");
  const sendEther = await SendEther.deploy();

  await sendEther.deployed();

  const functionCall = await sendEther.returnHelloWorld();
  console.log(functionCall);
  console.log("Contract address: ", sendEther.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
