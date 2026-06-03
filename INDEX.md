# 📚 Project Documentation Index

Welcome to the Full-Stack DApp Project! This document helps you navigate all available resources.

## 🚀 Quick Start

**New to the project?** Start here:
1. Read [GETTING_STARTED.md](./GETTING_STARTED.md) - Complete setup walkthrough
2. Follow the step-by-step instructions
3. Test the application locally

## 📖 Main Documentation

| Document | Purpose | Audience |
|----------|---------|----------|
| [README.md](./README.md) | Project overview and structure | Everyone |
| [GETTING_STARTED.md](./GETTING_STARTED.md) | Setup walkthrough with troubleshooting | Developers |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System design and data flow | Architects |
| [FEATURES.md](./FEATURES.md) | Complete feature list | Product managers |

## 🏗️ Component Documentation

### Blockchain (Smart Contracts)

**Location:** `blockchain/`

| File | Description |
|------|-------------|
| [blockchain/BLOCKCHAIN_SETUP.md](./blockchain/BLOCKCHAIN_SETUP.md) | Blockchain setup and deployment guide |
| [blockchain/contracts/SimpleToken.sol](./blockchain/contracts/SimpleToken.sol) | ERC20-like token contract |
| [blockchain/contracts/SimpleCounter.sol](./blockchain/contracts/SimpleCounter.sol) | Counter contract |
| [blockchain/scripts/deploy.js](./blockchain/scripts/deploy.js) | Deployment script |
| [blockchain/test/contracts.test.js](./blockchain/test/contracts.test.js) | Contract tests |
| [blockchain/hardhat.config.js](./blockchain/hardhat.config.js) | Hardhat configuration |

**Quick Start:**
```bash
cd blockchain
npm install
npm run compile
npm test
npm run deploy:sepolia
```

### Backend (Node.js + Express)

**Location:** `backend/`

| File | Description |
|------|-------------|
| [backend/BACKEND_SETUP.md](./backend/BACKEND_SETUP.md) | API documentation and setup |
| [backend/server.js](./backend/server.js) | Main server file |
| [backend/routes/tokenRoutes.js](./backend/routes/tokenRoutes.js) | Token API routes |
| [backend/routes/counterRoutes.js](./backend/routes/counterRoutes.js) | Counter API routes |
| [backend/controllers/tokenController.js](./backend/controllers/tokenController.js) | Token business logic |
| [backend/controllers/counterController.js](./backend/controllers/counterController.js) | Counter business logic |
| [backend/services/tokenService.js](./backend/services/tokenService.js) | Token blockchain integration |
| [backend/services/counterService.js](./backend/services/counterService.js) | Counter blockchain integration |
| [backend/utils/abis.js](./backend/utils/abis.js) | Contract ABIs |
| [backend/package.json](./backend/package.json) | Backend dependencies |

**API Endpoints:**
- Token: `/api/token/*` (balance, transfer, mint, burn)
- Counter: `/api/counter/*` (value, increment, decrement, etc.)
- Health: `/api/health`

**Quick Start:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your settings
npm run dev
```

### Frontend (React)

**Location:** `frontend/`

| File | Description |
|------|-------------|
| [frontend/FRONTEND_SETUP.md](./frontend/FRONTEND_SETUP.md) | Frontend setup and guide |
| [frontend/src/App.js](./frontend/src/App.js) | Main app component |
| [frontend/src/components/TokenComponent.js](./frontend/src/components/TokenComponent.js) | Token UI component |
| [frontend/src/components/CounterComponent.js](./frontend/src/components/CounterComponent.js) | Counter UI component |
| [frontend/src/services/apiService.js](./frontend/src/services/apiService.js) | API client |
| [frontend/public/index.html](./frontend/public/index.html) | HTML template |
| [frontend/package.json](./frontend/package.json) | Frontend dependencies |

**Quick Start:**
```bash
cd frontend
npm install
npm start
```

## 🔗 Smart Contracts

### SimpleToken (Sepolia)

**Functions:**
- `mint(address, uint256)` - Create tokens
- `transfer(address, uint256)` - Send tokens
- `burn(uint256)` - Remove tokens
- `balanceOf(address)` - Check balance
- `totalSupply()` - Get total tokens

**Events:**
- Transfer, Mint, Burn, Approval

### SimpleCounter (Hoodi)

**Functions:**
- `increment()` - +1
- `decrement()` - -1
- `setValue(uint256)` - Set value
- `getValue()` - Get value
- `incrementBy(uint256)` - Add amount
- `decrementBy(uint256)` - Subtract amount

**Events:**
- CounterIncremented, CounterDecremented, ValueSet

## 📡 API Reference

### Token Endpoints

```
GET    /api/token/balance/:address       - Get balance
GET    /api/token/total-supply           - Get total supply
POST   /api/token/transfer               - Transfer tokens
POST   /api/token/mint                   - Mint tokens (owner)
POST   /api/token/burn                   - Burn tokens
```

### Counter Endpoints

```
GET    /api/counter/value                - Get value
POST   /api/counter/increment            - Increment
POST   /api/counter/decrement            - Decrement
POST   /api/counter/set-value            - Set value (owner)
POST   /api/counter/increment-by         - Increment by amount
POST   /api/counter/decrement-by         - Decrement by amount
```

### Health

```
GET    /api/health                       - API status
```

## 🗂️ Project Structure

```
project5Fullstack/
├── blockchain/
│   ├── contracts/
│   │   ├── SimpleToken.sol
│   │   └── SimpleCounter.sol
│   ├── scripts/
│   │   └── deploy.js
│   ├── test/
│   │   └── contracts.test.js
│   ├── hardhat.config.js
│   ├── package.json
│   └── BLOCKCHAIN_SETUP.md
│
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
│   └── BACKEND_SETUP.md
│
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
│   └── FRONTEND_SETUP.md
│
├── README.md
├── GETTING_STARTED.md
├── ARCHITECTURE.md
├── FEATURES.md
├── .gitignore
└── INDEX.md (this file)
```

## 🔍 Finding Information

### By Role

**Smart Contract Developer**
- Read: [ARCHITECTURE.md](./ARCHITECTURE.md)
- Study: [blockchain/contracts/](./blockchain/contracts/)
- Reference: [blockchain/BLOCKCHAIN_SETUP.md](./blockchain/BLOCKCHAIN_SETUP.md)

**Backend Developer**
- Read: [BACKEND_SETUP.md](./backend/BACKEND_SETUP.md)
- Study: [backend/services/](./backend/services/)
- Reference: [backend/controllers/](./backend/controllers/)

**Frontend Developer**
- Read: [FRONTEND_SETUP.md](./frontend/FRONTEND_SETUP.md)
- Study: [frontend/src/components/](./frontend/src/components/)
- Reference: [frontend/src/services/apiService.js](./frontend/src/services/apiService.js)

**DevOps/Deployment**
- Read: [GETTING_STARTED.md](./GETTING_STARTED.md)
- Reference: [ARCHITECTURE.md](./ARCHITECTURE.md)
- Setup guides in each folder

**Product Manager**
- Read: [README.md](./README.md)
- Reference: [FEATURES.md](./FEATURES.md)
- Check: [ARCHITECTURE.md](./ARCHITECTURE.md)

### By Topic

**Setup & Installation**
- [GETTING_STARTED.md](./GETTING_STARTED.md) - Complete walkthrough
- [blockchain/BLOCKCHAIN_SETUP.md](./blockchain/BLOCKCHAIN_SETUP.md) - Blockchain setup
- [backend/BACKEND_SETUP.md](./backend/BACKEND_SETUP.md) - Backend setup
- [frontend/FRONTEND_SETUP.md](./frontend/FRONTEND_SETUP.md) - Frontend setup

**Architecture & Design**
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
- [README.md](./README.md) - Project overview
- [FEATURES.md](./FEATURES.md) - Feature list

**API Documentation**
- [backend/BACKEND_SETUP.md](./backend/BACKEND_SETUP.md) - API endpoints
- [backend/routes/](./backend/routes/) - Route definitions
- [backend/controllers/](./backend/controllers/) - Business logic

**Smart Contracts**
- [blockchain/contracts/SimpleToken.sol](./blockchain/contracts/SimpleToken.sol)
- [blockchain/contracts/SimpleCounter.sol](./blockchain/contracts/SimpleCounter.sol)
- [blockchain/BLOCKCHAIN_SETUP.md](./blockchain/BLOCKCHAIN_SETUP.md)

**Deployment**
- [GETTING_STARTED.md](./GETTING_STARTED.md)
- [blockchain/scripts/deploy.js](./blockchain/scripts/deploy.js)
- Each setup guide

**Troubleshooting**
- [GETTING_STARTED.md](./GETTING_STARTED.md#-troubleshooting)
- [blockchain/BLOCKCHAIN_SETUP.md](./blockchain/BLOCKCHAIN_SETUP.md#troubleshooting)
- [backend/BACKEND_SETUP.md](./backend/BACKEND_SETUP.md#troubleshooting)
- [frontend/FRONTEND_SETUP.md](./frontend/FRONTEND_SETUP.md#troubleshooting)

## 🎯 Common Tasks

### Deploy Contracts
1. Go to: `blockchain/`
2. Follow: [blockchain/BLOCKCHAIN_SETUP.md](./blockchain/BLOCKCHAIN_SETUP.md)
3. Run: `npm run deploy:sepolia` or `npm run deploy:hoodi`

### Start Backend
1. Go to: `backend/`
2. Follow: [backend/BACKEND_SETUP.md](./backend/BACKEND_SETUP.md)
3. Run: `npm run dev`

### Start Frontend
1. Go to: `frontend/`
2. Follow: [frontend/FRONTEND_SETUP.md](./frontend/FRONTEND_SETUP.md)
3. Run: `npm start`

### Add New API Endpoint
1. Create route: `backend/routes/`
2. Create controller: `backend/controllers/`
3. Create service: `backend/services/`
4. Update `backend/server.js`

### Modify Smart Contract
1. Edit: `blockchain/contracts/`
2. Test: `npm test`
3. Deploy: `npm run deploy`

### Update Frontend Component
1. Edit: `frontend/src/components/`
2. Update CSS if needed
3. Refresh browser (hot reload)

## 📚 External Resources

### Documentation
- [Solidity Docs](https://docs.soliditylang.org/)
- [Hardhat Docs](https://hardhat.org/)
- [Ethers.js Docs](https://docs.ethers.org/v6/)
- [React Docs](https://react.dev/)
- [Express Docs](https://expressjs.com/)

### Testnets
- [Sepolia Faucet](https://sepoliafaucet.com)
- Hoodi faucet: use your RPC or wallet provider
- [Sepolia Explorer](https://sepolia.etherscan.io/)
- [Hoodi Explorer](https://hoodi.ethpandaops.io/)

### Tools
- [MetaMask](https://metamask.io/) - Wallet
- [Etherscan](https://etherscan.io/) - Block explorer
- [Remix IDE](https://remix.ethereum.org/) - Smart contract IDE
- [Infura](https://infura.io/) - RPC provider

## ✅ Next Steps

1. **First Time?** → Start with [GETTING_STARTED.md](./GETTING_STARTED.md)
2. **Setup Complete?** → Read [README.md](./README.md)
3. **Understand Architecture?** → Read [ARCHITECTURE.md](./ARCHITECTURE.md)
4. **Explore Code** → Check specific component guides
5. **Deploy?** → Follow deployment section

## 📞 Support

- Check relevant setup guide for your area
- Review troubleshooting sections
- Check documentation files
- Review error messages
- Check blockchain explorers

## 🎉 Success!

When you can successfully:
- Deploy both contracts
- Start backend API
- Start frontend dashboard
- Transfer tokens
- Increment counter

**You're ready to go!** 🚀

---

**Last Updated:** June 1, 2026
**Project Version:** 1.0.0
**Status:** ✅ Production Ready

For detailed information, see specific documentation files above.
