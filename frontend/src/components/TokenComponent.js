import React, { useState } from 'react';
import { tokenService } from '../services/apiService';
import './TokenComponent.css';

function TokenComponent({ apiStatus }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  
  const [balanceAddress, setBalanceAddress] = useState('');
  const [balance, setBalance] = useState(null);
  
  const [transferTo, setTransferTo] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  
  const [mintTo, setMintTo] = useState('');
  const [mintAmount, setMintAmount] = useState('');
  
  const [burnAmount, setBurnAmount] = useState('');
  
  const [totalSupply, setTotalSupply] = useState(null);

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  const handleGetBalance = async () => {
    if (!balanceAddress.trim()) {
      showMessage('Please enter an address', 'error');
      return;
    }

    setLoading(true);
    const result = await tokenService.getBalance(balanceAddress);
    setLoading(false);

    if (result.success) {
      setBalance(result.balance);
      showMessage(`Balance: ${result.balance} STK`, 'success');
    } else {
      showMessage(result.error, 'error');
    }
  };

  const handleGetTotalSupply = async () => {
    setLoading(true);
    const result = await tokenService.getTotalSupply();
    setLoading(false);

    if (result.success) {
      setTotalSupply(result.totalSupply);
      showMessage(`Total Supply: ${result.totalSupply} STK`, 'success');
    } else {
      showMessage(result.error, 'error');
    }
  };

  const handleTransfer = async () => {
    if (!transferTo.trim() || !transferAmount) {
      showMessage('Please fill in all fields', 'error');
      return;
    }

    setLoading(true);
    const result = await tokenService.transfer(transferTo, transferAmount);
    setLoading(false);

    if (result.success) {
      showMessage(`Transferred ${transferAmount} STK successfully!`, 'success');
      setTransferTo('');
      setTransferAmount('');
    } else {
      showMessage(result.error, 'error');
    }
  };

  const handleMint = async () => {
    if (!mintTo.trim() || !mintAmount) {
      showMessage('Please fill in all fields', 'error');
      return;
    }

    setLoading(true);
    const result = await tokenService.mint(mintTo, mintAmount);
    setLoading(false);

    if (result.success) {
      showMessage(`Minted ${mintAmount} STK successfully!`, 'success');
      setMintTo('');
      setMintAmount('');
    } else {
      showMessage(result.error, 'error');
    }
  };

  const handleBurn = async () => {
    if (!burnAmount) {
      showMessage('Please enter amount to burn', 'error');
      return;
    }

    setLoading(true);
    const result = await tokenService.burn(burnAmount);
    setLoading(false);

    if (result.success) {
      showMessage(`Burned ${burnAmount} STK successfully!`, 'success');
      setBurnAmount('');
    } else {
      showMessage(result.error, 'error');
    }
  };

  return (
    <div className="token-component">
      <div className="card info-card">
        <h2>📊 SimpleToken Info</h2>
        <p>Network: <span className="badge">Sepolia Testnet</span></p>
        <p>Symbol: <span className="badge">STK</span></p>
        <p>Decimals: <span className="badge">18</span></p>
        {totalSupply !== null && (
          <p>Total Supply: <span className="badge">{totalSupply} STK</span></p>
        )}
      </div>

      {message && (
        <div className={`alert alert-${messageType}`}>
          {message}
        </div>
      )}

      <div className="operations-grid">
        {/* Get Balance */}
        <div className="card operation-card">
          <h3>💰 Get Balance</h3>
          <input
            type="text"
            placeholder="Enter address"
            value={balanceAddress}
            onChange={(e) => setBalanceAddress(e.target.value)}
            disabled={loading}
          />
          <button onClick={handleGetBalance} disabled={loading || apiStatus === 'offline'}>
            {loading ? 'Loading...' : 'Get Balance'}
          </button>
          {balance !== null && (
            <div className="result">
              <p>Balance: <strong>{balance} STK</strong></p>
            </div>
          )}
        </div>

        {/* Get Total Supply */}
        <div className="card operation-card">
          <h3>📈 Total Supply</h3>
          <button onClick={handleGetTotalSupply} disabled={loading || apiStatus === 'offline'}>
            {loading ? 'Loading...' : 'Get Total Supply'}
          </button>
          {totalSupply !== null && (
            <div className="result">
              <p>Supply: <strong>{totalSupply} STK</strong></p>
            </div>
          )}
        </div>

        {/* Transfer */}
        <div className="card operation-card">
          <h3>🔄 Transfer Tokens</h3>
          <input
            type="text"
            placeholder="Recipient address"
            value={transferTo}
            onChange={(e) => setTransferTo(e.target.value)}
            disabled={loading}
          />
          <input
            type="number"
            placeholder="Amount to transfer"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
            disabled={loading}
          />
          <button onClick={handleTransfer} disabled={loading || apiStatus === 'offline'}>
            {loading ? 'Processing...' : 'Transfer'}
          </button>
        </div>

        {/* Mint */}
        <div className="card operation-card">
          <h3>🪙 Mint Tokens</h3>
          <input
            type="text"
            placeholder="Recipient address"
            value={mintTo}
            onChange={(e) => setMintTo(e.target.value)}
            disabled={loading}
          />
          <input
            type="number"
            placeholder="Amount to mint"
            value={mintAmount}
            onChange={(e) => setMintAmount(e.target.value)}
            disabled={loading}
          />
          <button onClick={handleMint} disabled={loading || apiStatus === 'offline'}>
            {loading ? 'Processing...' : 'Mint'}
          </button>
        </div>

        {/* Burn */}
        <div className="card operation-card">
          <h3>🔥 Burn Tokens</h3>
          <input
            type="number"
            placeholder="Amount to burn"
            value={burnAmount}
            onChange={(e) => setBurnAmount(e.target.value)}
            disabled={loading}
          />
          <button onClick={handleBurn} disabled={loading || apiStatus === 'offline'}>
            {loading ? 'Processing...' : 'Burn'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TokenComponent;
