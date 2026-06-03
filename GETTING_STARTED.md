# 🚀 GETTING STARTED - Complete Setup Guide

This guide walks you through setting up and running the complete full-stack DApp from scratch.

## 📋 Prerequisites

Before starting, ensure you have:

1. **Node.js** v16+ and npm
   ```bash
   node --version
   npm --version
   ```

2. **Git** (optional, for version control)

3. **Text Editor** (VS Code recommended)

4. **Wallet** (for testnet funds)
   - MetaMask or similar Web3 wallet
   - Ethereum address ready

5. **API Keys**
   - Infura Project ID (https://infura.io)
   - Etherscan API Key (https://etherscan.io/apis)

## 🎯 Step-by-Step Setup

### Step 1: Get Testnet Funds

Before deploying, get test ETH:

1. **Sepolia Faucet**
   - Visit: https://sepoliafaucet.com
   - Enter your Ethereum address
   - Request test ETH

2. **Hoodi Faucet**
   - Use a Hoodi faucet from your RPC or wallet provider
   - Enter your Ethereum address
   - Request test ETH

⏳ Wait 1-2 minutes for transactions to confirm.

### Step 2: Blockchain Setup

```bash
cd blockchain

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your details
nano .env
# or open in your editor
```

**Edit `.env` with:**

```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
HOODI_RPC_URL=https://ethereum-hoodi-rpc.publicnode.com
PRIVATE_KEY=your_wallet_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key
```

**Get your values:**
1. **Infura Project ID**: 
   - Go to https://infura.io
   - Create account → Create Project → Copy Project ID

2. **ETHERSCAN_API_KEY**:
   - Go to https://etherscan.io/apis
   - Create account → Create API Key

3. **PRIVATE_KEY**:
   - ⚠️ Never share this!
   - From MetaMask: Settings → Security & Privacy → Reveal Private Key
   - Or use a new wallet account

**Compile contracts:**

```bash
npm run compile
```

Expected output:
```
✓ Compiled successfully
```

**Test contracts:**

```bash
npm test
```

Should see all tests pass.

### Step 3: Deploy Smart Contracts

Choose your deployment network:

**Option A: Deploy to Sepolia (SimpleToken)**

```bash
npm run deploy:sepolia
```

Save the output, especially the contract address:
```
✅ SimpleToken deployed at: 0x...
```

**Option B: Deploy to Hoodi (SimpleCounter)**

```bash
npm run deploy:hoodi
```

Save the contract address.

**📝 Note:** You can deploy both by running each command in separate terminals.

### Step 4: Backend Setup

In a new terminal:

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your details
nano .env
```

**Edit `.env` with:**

```env
PORT=5000
NODE_ENV=development

SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
SEPOLIA_TOKEN_ADDRESS=0x...  # From Step 3

HOODI_RPC_URL=https://ethereum-hoodi-rpc.publicnode.com
HOODI_COUNTER_ADDRESS=0x...  # From Step 3

PRIVATE_KEY=your_wallet_private_key_here
CORS_ORIGIN=http://localhost:3000
```

**Start backend server:**

```bash
npm run dev
```

Expected output:
```
Backend server is running on port 5000
```

✅ Backend is now running!

### Step 5: Frontend Setup

In a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Optional: Create .env file
cp .env.example .env
```

**Start development server:**

```bash
npm start
```

Expected output:
```
Compiled successfully!
You can now view frontend-app in the browser.
  Local:            http://localhost:3000
```

✅ Frontend will open automatically in your browser!

## 🧪 Testing the Application

### 1. Verify Backend is Running

```bash
curl http://localhost:5000/api/health
```

Response should be:
```json
{
  "success": true,
  "status": "Backend API is running"
}
```

### 2. Test Token Operations

In frontend, go to **Token Operations** tab:

1. **Get Balance**
   - Enter any Ethereum address
   - Click "Get Balance"
   - Should show balance or 0

2. **Get Total Supply**
   - Click "Get Total Supply"
   - Should return total tokens

3. **Mint Tokens** (owner only)
   - Enter recipient address
   - Enter amount (e.g., 100)
   - Click "Mint"
   - Should confirm transaction

4. **Transfer**
   - Enter recipient address
   - Enter amount
   - Click "Transfer"
   - Should complete successfully

5. **Burn**
   - Enter amount to burn
   - Click "Burn"
   - Tokens should be removed

### 3. Test Counter Operations

Go to **Counter Operations** tab:

1. **View Current Value**
   - Should display current counter (auto-refreshes)

2. **Increment**
   - Click "Increment"
   - Value should increase by 1

3. **Decrement**
   - Click "Decrement"
   - Value should decrease by 1
   - Auto-refreshes every 5 seconds

4. **Set Value**
   - Enter new value
   - Click "Set Value"
   - Counter updates instantly

5. **Increment/Decrement By Amount**
   - Enter custom amount
   - Click respective button
   - Counter updates by that amount

## 🔧 Troubleshooting

### Backend Won't Start

**Issue:** `Cannot find module 'express'`

**Solution:**
```bash
npm install
npm run dev
```

**Issue:** `Error: connect ECONNREFUSED 127.0.0.1:5000`

**Solution:**
- Port 5000 is already in use
- Change PORT in `.env` to 5001
- Or kill process on port 5000

### Frontend Won't Load

**Issue:** `Failed to fetch from API`

**Solution:**
- Check backend is running on 5000
- Check CORS_ORIGIN in backend `.env`
- Clear browser cache (Ctrl+Shift+Delete)

**Issue:** `Module not found`

**Solution:**
```bash
npm install
npm start
```

### Contract Deployment Failed

**Issue:** `Insufficient funds`

**Solution:**
- Get test ETH from faucet
- Wait 2 minutes for confirmation

**Issue:** `Invalid RPC URL`

**Solution:**
- Check Infura Project ID is correct
- Verify network URL is correct

**Issue:** `Private key is invalid`

**Solution:**
- Export private key from wallet (no 0x prefix)
- Ensure no extra spaces

### API Returns Error

**Issue:** `Contract call reverted`

**Solution:**
- Verify contract address is correct
- Check contract is deployed to correct network
- Verify RPC URL matches network

## 📊 Project Structure

After setup, your directory should look like:

```
project5Fullstack/
├── blockchain/
│   ├── contracts/
│   │   ├── SimpleToken.sol
│   │   └── SimpleCounter.sol
│   ├── scripts/
│   ├── test/
│   ├── artifacts/           (created after compile)
│   ├── .env                 (created by you)
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   ├── .env                 (created by you)
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .env                 (optional)
│   ├── package.json
│   └── node_modules/        (created after npm install)
│
└── README.md
```

## 🎓 Learning Path

1. **Understand Smart Contracts**
   - Read `blockchain/contracts/SimpleToken.sol`
   - Read `blockchain/contracts/SimpleCounter.sol`
   - Understand Solidity concepts

2. **Learn Backend Integration**
   - Review `backend/services/tokenService.js`
   - Review `backend/services/counterService.js`
   - Understand ethers.js interaction

3. **Explore Frontend Components**
   - Check `frontend/src/components/TokenComponent.js`
   - Check `frontend/src/components/CounterComponent.js`
   - Understand React patterns

4. **Advanced Topics**
   - Gas optimization
   - Event indexing
   - State management
   - Performance tuning

## 🚀 Next Steps

### 1. Explore the Code
- Review smart contract logic
- Understand service layer
- Check component structure

### 2. Make Modifications
- Add new functions
- Enhance UI
- Improve error handling

### 3. Deploy to Production
- Use production RPC provider
- Configure production backend
- Deploy frontend to hosting
- Use mainnet (with real funds!)

### 4. Add More Features
- User authentication
- Transaction history
- Web3 wallet integration
- Real-time notifications

## 📚 Resources

### Documentation
- [Solidity Docs](https://docs.soliditylang.org/)
- [Hardhat Docs](https://hardhat.org/docs)
- [Ethers.js Docs](https://docs.ethers.org/v6/)
- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)

### Testnets
- [Sepolia Faucet](https://sepoliafaucet.com)
- Hoodi faucet: use your RPC or wallet provider
- [Sepolia Testnet](https://sepolia.etherscan.io)
- [Hoodi Testnet](https://hoodi.ethpandaops.io)

### Tools
- [MetaMask](https://metamask.io)
- [Etherscan](https://etherscan.io)
- [Remix IDE](https://remix.ethereum.org)
- [Infura](https://infura.io)

## ✅ Checklist

- [ ] Node.js installed
- [ ] Testnet ETH obtained
- [ ] Infura account created
- [ ] Etherscan API key obtained
- [ ] Blockchain setup completed
- [ ] Contracts deployed
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Token operations tested
- [ ] Counter operations tested
- [ ] All features working

## 🎉 Success!

If you can:
- ✅ View token balances
- ✅ Transfer tokens
- ✅ Mint/burn tokens
- ✅ Increment/decrement counter
- ✅ See auto-updates

**Congratulations!** Your full-stack DApp is complete and working! 🚀

## 🆘 Need Help?

1. Check setup guides in each folder
2. Review error messages carefully
3. Verify all configuration values
4. Check blockchain explorer for transactions
5. Review terminal logs

---

**Happy Building! 🚀**

For detailed information about each component, see:
- [Blockchain Setup](./blockchain/BLOCKCHAIN_SETUP.md)
- [Backend Setup](./backend/BACKEND_SETUP.md)
- [Frontend Setup](./frontend/FRONTEND_SETUP.md)
- [Main README](./README.md)
