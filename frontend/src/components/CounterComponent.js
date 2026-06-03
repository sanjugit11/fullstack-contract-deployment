import React, { useState, useEffect } from 'react';
import { counterService } from '../services/apiService';
import './CounterComponent.css';

function CounterComponent({ apiStatus }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [counterValue, setCounterValue] = useState(null);
  
  const [setValue, setSetValue] = useState('');
  const [incrementByAmount, setIncrementByAmount] = useState('');
  const [decrementByAmount, setDecrementByAmount] = useState('');

  useEffect(() => {
    fetchCounterValue();
    // Refresh every 5 seconds
    const interval = setInterval(fetchCounterValue, 5000);
    return () => clearInterval(interval);
  }, []);

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  const fetchCounterValue = async () => {
    const result = await counterService.getValue();
    if (result.success) {
      setCounterValue(parseInt(result.value));
    }
  };

  const handleIncrement = async () => {
    setLoading(true);
    const result = await counterService.increment();
    setLoading(false);

    if (result.success) {
      setCounterValue(parseInt(result.newValue));
      showMessage(`Counter incremented to ${result.newValue}`, 'success');
    } else {
      showMessage(result.error, 'error');
    }
  };

  const handleDecrement = async () => {
    setLoading(true);
    const result = await counterService.decrement();
    setLoading(false);

    if (result.success) {
      setCounterValue(parseInt(result.newValue));
      showMessage(`Counter decremented to ${result.newValue}`, 'success');
    } else {
      showMessage(result.error, 'error');
    }
  };

  const handleSetValue = async () => {
    if (!setValue) {
      showMessage('Please enter a value', 'error');
      return;
    }

    setLoading(true);
    const result = await counterService.setValue(setValue);
    setLoading(false);

    if (result.success) {
      setCounterValue(parseInt(setValue));
      showMessage(`Counter set to ${setValue}`, 'success');
      setSetValue('');
    } else {
      showMessage(result.error, 'error');
    }
  };

  const handleIncrementBy = async () => {
    if (!incrementByAmount) {
      showMessage('Please enter an amount', 'error');
      return;
    }

    setLoading(true);
    const result = await counterService.incrementBy(incrementByAmount);
    setLoading(false);

    if (result.success) {
      setCounterValue(parseInt(result.newValue));
      showMessage(`Counter incremented by ${incrementByAmount} to ${result.newValue}`, 'success');
      setIncrementByAmount('');
    } else {
      showMessage(result.error, 'error');
    }
  };

  const handleDecrementBy = async () => {
    if (!decrementByAmount) {
      showMessage('Please enter an amount', 'error');
      return;
    }

    setLoading(true);
    const result = await counterService.decrementBy(decrementByAmount);
    setLoading(false);

    if (result.success) {
      setCounterValue(parseInt(result.newValue));
      showMessage(`Counter decremented by ${decrementByAmount} to ${result.newValue}`, 'success');
      setDecrementByAmount('');
    } else {
      showMessage(result.error, 'error');
    }
  };

  return (
    <div className="counter-component">
      <div className="counter-display">
        <div className="card">
          <h2>🔢 Current Counter Value</h2>
          <div className="counter-value">
            {counterValue !== null ? counterValue : 'Loading...'}
          </div>
          <button 
            onClick={fetchCounterValue} 
            disabled={loading}
            className="refresh-btn"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {message && (
        <div className={`alert alert-${messageType}`}>
          {message}
        </div>
      )}

      <div className="operations-grid">
        {/* Increment */}
        <div className="card operation-card">
          <h3>➕ Increment by 1</h3>
          <button onClick={handleIncrement} disabled={loading || apiStatus === 'offline'}>
            {loading ? 'Processing...' : 'Increment'}
          </button>
        </div>

        {/* Decrement */}
        <div className="card operation-card">
          <h3>➖ Decrement by 1</h3>
          <button onClick={handleDecrement} disabled={loading || apiStatus === 'offline'}>
            {loading ? 'Processing...' : 'Decrement'}
          </button>
        </div>

        {/* Set Value */}
        <div className="card operation-card">
          <h3>🎯 Set Value</h3>
          <input
            type="number"
            placeholder="New counter value"
            value={setValue}
            onChange={(e) => setSetValue(e.target.value)}
            disabled={loading}
          />
          <button onClick={handleSetValue} disabled={loading || apiStatus === 'offline'}>
            {loading ? 'Processing...' : 'Set Value'}
          </button>
        </div>

        {/* Increment By */}
        <div className="card operation-card">
          <h3>➕ Increment By Amount</h3>
          <input
            type="number"
            placeholder="Amount to increment"
            value={incrementByAmount}
            onChange={(e) => setIncrementByAmount(e.target.value)}
            disabled={loading}
          />
          <button onClick={handleIncrementBy} disabled={loading || apiStatus === 'offline'}>
            {loading ? 'Processing...' : 'Increment By'}
          </button>
        </div>

        {/* Decrement By */}
        <div className="card operation-card">
          <h3>➖ Decrement By Amount</h3>
          <input
            type="number"
            placeholder="Amount to decrement"
            value={decrementByAmount}
            onChange={(e) => setDecrementByAmount(e.target.value)}
            disabled={loading}
          />
          <button onClick={handleDecrementBy} disabled={loading || apiStatus === 'offline'}>
            {loading ? 'Processing...' : 'Decrement By'}
          </button>
        </div>
      </div>

      <div className="info-section">
        <div className="card">
          <h3>ℹ️ SimpleCounter Info</h3>
          <p>Network: <span className="badge">Hoodi Testnet</span></p>
          <p>Auto-refresh: Every 5 seconds</p>
        </div>
      </div>
    </div>
  );
}

export default CounterComponent;
