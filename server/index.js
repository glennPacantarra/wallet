const express = require("express");
const { ethers } = require("ethers");
require("dotenv").config();
const abiJson = require("./abi.json");

const cors = require ("cors");

const app = express();
app.use(express.json());
app.use(cors());

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(abiJson.address, abiJson.abi, wallet);

app.post("/mint", async (req, res) => {
  const { user, amount } = req.body;
  const tx = await contract.mint(user, amount);
  await tx.wait();
  res.json({ message: "Minted", txHash: tx.hash });
});

app.post("/transfer", async (req, res) => {
  const { from, to, amount } = req.body;
  const tx = await contract.transfer(from, to, amount);
  await tx.wait();
  res.json({ message: "Transferred", txHash: tx.hash });
});

app.get("/balance/:address", async (req, res) => {
  const balance = await contract.balanceOf(req.params.address);
  console.log("Balance:"+ balance.toString());
  res.json({ balance: balance.toString() });
});

app.get("/", async (req, res) => {
  res.json( "good Connection" );
});

app.listen(3001, () => console.log("Backend listening on port 3001"));
