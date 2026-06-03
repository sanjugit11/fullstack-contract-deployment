import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TokenComponent from './components/TokenComponent';
import CounterComponent from './components/CounterComponent';

function App() {
  const [apiStatus, setApiStatus] = useState('checking');
  const [activeTab, setActiveTab] = useState('token');

  useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      const response = await axios.get('/api/health');
      if (response.data.success) {
        setApiStatus('online');
      }
    } catch (error) {
      console.error('API health check failed:', error);
      setApiStatus('offline');
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🚀 Crypto Dashboard</h1>
        <p>Interact with SimpleToken & SimpleCounter Smart Contracts</p>
        <div className="status-bar">
          <span className={`status-badge ${apiStatus}`}>
            {apiStatus === 'online' ? '✓ API Online' : '✗ API Offline'}
          </span>
        </div>
      </header>

      <div className="tabs-container">
        <button 
          className={`tab-button ${activeTab === 'token' ? 'active' : ''}`}
          onClick={() => setActiveTab('token')}
        >
          💰 Token Operations
        </button>
        <button 
          className={`tab-button ${activeTab === 'counter' ? 'active' : ''}`}
          onClick={() => setActiveTab('counter')}
        >
          🔢 Counter Operations
        </button>
      </div>

      <div className="content-container">
        {apiStatus === 'offline' && (
          <div className="alert alert-error">
            ⚠️ Backend API is offline. Please ensure the backend server is running on port 5000.
          </div>
        )}

        {activeTab === 'token' && (
          <TokenComponent apiStatus={apiStatus} />
        )}

        {activeTab === 'counter' && (
          <CounterComponent apiStatus={apiStatus} />
        )}
      </div>

      <footer className="app-footer">
        <p>SimpleToken (Sepolia) • SimpleCounter (Hoodi) • Full-Stack DApp</p>
      </footer>
    </div>
  );
}

export default App;
