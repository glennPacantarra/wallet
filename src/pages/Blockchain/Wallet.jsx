import React, { useState } from "react";
import axios from "axios";
import "./Wallet.css"; // Assuming you have a CSS file for styling

function Wallet() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [mintAmount, setMintAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

const checkBalance = async () => {
  const res = await axios.get(`http://localhost:3001/balance/${address}`);
  setBalance(res.data.balance);
  console.log(`Balance of ${address}: ${res.data.balance}`);
};

  const mint = async () => {
    await axios.post("http://localhost:3001/mint", { user: address, amount: parseInt(mintAmount) });
    checkBalance();
  };

  const transfer = async () => {
    await axios.post("http://localhost:3001/transfer", { from: address, to: recipient, amount: parseInt(transferAmount) });
    checkBalance(); 
  };

  return (
    <div className="wallet-container" style={{ padding: 20 }}>
      <h1>Token Ledger</h1>

      <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Your address" />
      <button onClick={checkBalance}>Check Balance</button>
      <p>Balance: {balance}</p>

      <hr />

      <h2>Mint</h2>
      <input value={mintAmount} onChange={(e) => setMintAmount(e.target.value)} placeholder="Amount to mint" />
      <button onClick={mint}>Mint Tokens</button>

      <hr />

      <h2>Transfer</h2>
      <input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Recipient address" />
      <input value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} placeholder="Amount to transfer" />
      <button onClick={transfer}>Transfer Tokens</button>
    </div>
  );
}

export default Wallet;
