const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const Contract = await hre.ethers.getContractFactory("SimpleWallet");
  const contract = await Contract.deploy();
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log("Deployed to:", contractAddress);

  const artifact = await hre.artifacts.readArtifact("SimpleWallet");
  fs.writeFileSync(
    "../server/abi.json",
    JSON.stringify(
      {
        address: contractAddress,
        abi: artifact.abi,
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
