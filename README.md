# Full Stack DApp - SimpleToken & SimpleCounter

A complete full-stack decentralized application featuring two smart contracts deployed on Ethereum testnets, with a React frontend and Express backend.

## 📋 Project Structure

```
project5Fullstack/
├── blockchain/
│   ├── contracts/
│   │   ├── SimpleToken.sol          # ERC20-like token on Sepolia
│   │   └── SimpleCounter.sol        # Counter contract on Hoodi
│   ├── hardhat.config.js
│   ├── package.json
│   └── .env.example
├── backend/
│   ├── routes/
│   │   ├── tokenRoutes.js
│   │   ├── counterRoutes.js
│   │   └── healthRoutes.js
│   ├── controllers/
│   │   ├── tokenController.js
│   │   └── counterController.js
│   ├── services/
│   │   ├── tokenService.js
│   │   └── counterService.js
│   ├── utils/
│   │   └── abis.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── TokenComponent.js
│   │   │   ├── TokenComponent.css
│   │   │   ├── CounterComponent.js
│   │   │   └── CounterComponent.css
│   │   ├── services/
│   │   │   └── apiService.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Hardhat
- Ethers.js v6
- Private key for testnet transactions
- RPC URLs for Sepolia and Hoodi

### 1. Blockchain Setup

```bash
cd blockchain

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your RPC URLs and private key

# Compile contracts
npm run compile

# Deploy SimpleToken to Sepolia
npm run deploy:sepolia

# Deploy SimpleCounter to Hoodi
npm run deploy:hoodi
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with contract addresses and RPC URLs

# Start server (runs on port 5000)
npm run dev

# test cases run
npm test
npm run test:reorg
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server (runs on port 3000)
npm start
```

## 🔗 Smart Contracts

### SimpleToken (Sepolia Testnet)

**Features:**
- Mint new tokens (owner only)
- Transfer tokens between addresses
- Burn tokens from caller's balance
- Query token balances
- Check total supply

**Functions:**
- `mint(address to, uint256 amount)` - Create new tokens
- `transfer(address to, uint256 amount)` - Transfer tokens
- `burn(uint256 amount)` - Burn tokens
- `balanceOf(address account)` - Get balance
- `totalSupply()` - Get total supply

**Events:**
- `Transfer(address indexed from, address indexed to, uint256 amount)`
- `Mint(address indexed to, uint256 amount)`
- `Burn(address indexed from, uint256 amount)`
- `Approval(address indexed owner, address indexed spender, uint256 amount)`

### SimpleCounter (Hoodi Testnet)

**Features:**
- Increment counter by 1
- Decrement counter by 1
- Set counter to specific value (owner only)
- Query current counter value

**Functions:**
- `increment()` - Increase by 1
- `decrement()` - Decrease by 1
- `setValue(uint256 newValue)` - Set to specific value
- `getValue()` - Get current value
- `incrementBy(uint256 amount)` - Increase by amount
- `decrementBy(uint256 amount)` - Decrease by amount

**Events:**
- `CounterIncremented(address indexed caller, uint256 newValue)`
- `CounterDecremented(address indexed caller, uint256 newValue)`
- `ValueSet(address indexed caller, uint256 oldValue, uint256 newValue)`

## 📡 Backend API Endpoints

### Token Endpoints (Base: `/api/token`)

- `GET /balance/:address` - Get token balance
- `GET /total-supply` - Get total supply
- `POST /transfer` - Transfer tokens
- `POST /mint` - Mint new tokens (owner)
- `POST /burn` - Burn tokens

### Counter Endpoints (Base: `/api/counter`)

- `GET /value` - Get current counter
- `POST /increment` - Increment by 1
- `POST /decrement` - Decrement by 1
- `POST /set-value` - Set value (owner)
- `POST /increment-by` - Increment by amount
- `POST /decrement-by` - Decrement by amount

### Health Check

- `GET /api/health` - API status

## 🎨 Frontend Features

- **Tab-based UI** - Switch between Token and Counter operations
- **Real-time status** - API health monitoring
- **Responsive design** - Works on desktop and mobile
- **Auto-refresh** - Counter auto-updates every 5 seconds
- **Error handling** - User-friendly error messages
- **Loading states** - Visual feedback during transactions

## 🔐 Environment Variables

### Blockchain (.env)
```
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
HOODI_RPC_URL=https://ethereum-hoodi-rpc.publicnode.com
PRIVATE_KEY=your_private_key
ETHERSCAN_API_KEY=your_etherscan_key
```

### Backend (.env)
```
PORT=5000
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
HOODI_RPC_URL=https://ethereum-hoodi-rpc.publicnode.com
SEPOLIA_TOKEN_ADDRESS=deployed_contract_address
HOODI_COUNTER_ADDRESS=deployed_contract_address
PRIVATE_KEY=your_private_key
CORS_ORIGIN=http://localhost:3000
```

## 🧪 Testing

### Run Smart Contract Tests
```bash
cd blockchain
npm test
```

## 📦 Technologies Used

**Blockchain:**
- Solidity ^0.8.19
- Hardhat
- Ethers.js v6
- OpenZeppelin Contracts

**Backend:**
- Node.js
- Express.js
- Ethers.js v6
- CORS
- Body-parser

**Frontend:**
- React 18
- Axios
- CSS3
- Responsive Design

## 🌐 Testnet Information

### Sepolia Testnet
- Chain ID: 11155111
- RPC: https://sepolia.infura.io/v3/{PROJECT_ID}
- Faucet: https://sepoliafaucet.com

### Hoodi Testnet
- Chain ID: 560048
- RPC: https://ethereum-hoodi-rpc.publicnode.com
- Explorer: https://hoodi.ethpandaops.io

## 🚢 Deployment Commands

Run each deployment from the `blockchain` directory:

```bash
cd blockchain
npm run compile

# Deploys only SimpleToken to Sepolia
npm run deploy:sepolia

# Deploys only SimpleCounter to Hoodi
npm run deploy:hoodi
```

Equivalent Hardhat commands:

```bash
npx hardhat run scripts/deploy.js --network sepolia
npx hardhat run scripts/deploy.js --network hoodi
```

## 🚨 Important Notes

1. **Never commit .env files** - Always use .env.example as template
2. **Secure private keys** - Keep them safe and never share
3. **Test on testnet first** - Always test before mainnet deployment
4. **Gas fees** - Monitor gas costs on testnet
5. **Contract verification** - Verify contracts on Etherscan after deployment

## 📚 API Response Format

All API responses follow this format:

**Success Response:**
```json
{
  "success": true,
  "data": {}
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message"
}
```

## 🐛 Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Verify RPC URLs in .env
- Ensure contract addresses are correct

### Frontend can't connect to backend
- Make sure backend is running on port 5000
- Check CORS_ORIGIN in backend .env
- Verify API_URL in frontend

### Smart contract transactions fail
- Check wallet has sufficient gas
- Verify account has required permissions
- Check contract address is correct

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please create a pull request with your changes.

## 📧 Contact

For questions or support, please reach out to the development team.
