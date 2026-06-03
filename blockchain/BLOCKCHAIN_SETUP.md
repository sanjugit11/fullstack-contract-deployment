# Blockchain Setup Guide

## Folder Structure

```
blockchain/
├── contracts/           # Smart contracts
├── scripts/            # Deployment scripts
├── test/               # Test files
├── artifacts/          # Compiled contracts
├── hardhat.config.js   # Hardhat configuration
├── package.json        # Dependencies
└── .env.example        # Environment template
```

## Configuration

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
HOODI_RPC_URL=https://ethereum-hoodi-rpc.publicnode.com
PRIVATE_KEY=your_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### 3. Get Test ETH

- **Sepolia**: Visit https://sepoliafaucet.com
- **Hoodi**: Use a Hoodi faucet or RPC provider-supported funding flow

## Commands

### Compile Contracts
```bash
npm run compile
```

### Run Tests
```bash
npm test
```

### Deploy to Sepolia
```bash
npm run deploy:sepolia
```

### Deploy to Hoodi
```bash
npm run deploy:hoodi
```

### View Gas Report
Set `REPORT_GAS=true` in .env, then run:
```bash
npm test
```

## Smart Contracts

### SimpleToken (Sepolia)
- ERC20-like token
- Mint, transfer, and burn functions
- Owner-based access control

### SimpleCounter (Hoodi)
- Simple counter contract
- Increment, decrement, set value
- Owner-only setValue function

## Deployment Process

1. **Compile** contracts: `npm run compile`
2. **Test** contracts: `npm test`
3. **Deploy** to testnet: `npm run deploy:sepolia` for SimpleToken or `npm run deploy:hoodi` for SimpleCounter
4. **Verify** on Etherscan
5. **Update** backend with contract addresses

## Verification on Etherscan

After deployment, verify your contract:

```bash
npx hardhat verify --network sepolia CONTRACT_ADDRESS
npx hardhat verify --network hoodi CONTRACT_ADDRESS
```

## Security Notes

⚠️ **IMPORTANT:**
- Never commit `.env` file
- Keep private keys secure
- Use different accounts for testnets and mainnet
- Always test thoroughly before mainnet deployment
- Verify contract source code on Etherscan

## Troubleshooting

### "Invalid RPC URL"
- Check your Infura project ID
- Ensure RPC URL is correct in .env

### "Insufficient gas"
- Get test ETH from faucet
- Check gas price on testnet

### "Nonce too high"
- Reset account nonce in wallet settings
- Or wait for pending transactions to confirm

## Next Steps

1. Deploy contracts to testnets
2. Update backend `.env` with contract addresses
3. Test backend API connectivity
4. Update frontend with contract details
5. Start testing full application flow
