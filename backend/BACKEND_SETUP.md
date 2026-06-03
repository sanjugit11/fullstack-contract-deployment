# Backend Setup Guide

## Folder Structure

```
backend/
├── routes/              # API route handlers
│   ├── tokenRoutes.js
│   ├── counterRoutes.js
│   └── healthRoutes.js
├── controllers/         # Business logic
│   ├── tokenController.js
│   └── counterController.js
├── services/           # Blockchain interactions
│   ├── tokenService.js
│   └── counterService.js
├── utils/              # Utilities
│   └── abis.js
├── server.js           # Main server file
├── package.json        # Dependencies
└── .env.example        # Environment template
```

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
PORT=5000
NODE_ENV=development

# Sepolia (SimpleToken)
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
SEPOLIA_TOKEN_ADDRESS=deployed_token_contract_address

# Hoodi (SimpleCounter)
HOODI_RPC_URL=https://ethereum-hoodi-rpc.publicnode.com
HOODI_COUNTER_ADDRESS=deployed_counter_contract_address

# Private Key (for signing transactions)
PRIVATE_KEY=your_private_key_here

# Frontend Configuration
CORS_ORIGIN=http://localhost:3000
```

## Running the Backend

### Development Mode (with hot reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

Server will start on: `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /api/health
```

### Token Operations (Sepolia)

**Get Balance**
```
GET /api/token/balance/:address
```
Response:
```json
{
  "success": true,
  "balance": "100.5",
  "balanceWei": "100500000000000000000"
}
```

**Get Total Supply**
```
GET /api/token/total-supply
```
Response:
```json
{
  "success": true,
  "totalSupply": "5000.0",
  "totalSupplyWei": "5000000000000000000000"
}
```

**Transfer Tokens**
```
POST /api/token/transfer
Content-Type: application/json

{
  "to": "0x...",
  "amount": 10.5
}
```

**Mint Tokens** (owner only)
```
POST /api/token/mint
Content-Type: application/json

{
  "to": "0x...",
  "amount": 100
}
```

**Burn Tokens**
```
POST /api/token/burn
Content-Type: application/json

{
  "amount": 50.5
}
```

### Counter Operations (Hoodi)

**Get Counter Value**
```
GET /api/counter/value
```
Response:
```json
{
  "success": true,
  "value": "42"
}
```

**Increment Counter**
```
POST /api/counter/increment
```
Response:
```json
{
  "success": true,
  "transactionHash": "0x...",
  "newValue": "43"
}
```

**Decrement Counter**
```
POST /api/counter/decrement
```

**Set Counter Value** (owner only)
```
POST /api/counter/set-value
Content-Type: application/json

{
  "value": 100
}
```

**Increment By Amount**
```
POST /api/counter/increment-by
Content-Type: application/json

{
  "amount": 5
}
```

**Decrement By Amount**
```
POST /api/counter/decrement-by
Content-Type: application/json

{
  "amount": 3
}
```

## Architecture

### Service Layer
- **tokenService.js**: Handles all token contract interactions
- **counterService.js**: Handles all counter contract interactions
- Uses ethers.js v6 for blockchain communication

### Controller Layer
- **tokenController.js**: Validates token requests and calls services
- **counterController.js**: Validates counter requests and calls services

### Route Layer
- REST API endpoints for frontend consumption
- Error handling and validation

## Error Handling

All API responses follow a consistent format:

**Success:**
```json
{
  "success": true,
  "data": {...}
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

HTTP Status Codes:
- `200` - Successful request
- `400` - Bad request (validation error)
- `500` - Server error

## CORS Configuration

The backend accepts requests from:
- Default: `http://localhost:3000`
- Configure in `.env` via `CORS_ORIGIN`

## Security Notes

⚠️ **IMPORTANT:**
- Never commit `.env` file
- Keep private keys secure
- Use environment variables for sensitive data
- Always validate input data
- Implement rate limiting for production
- Use HTTPS in production

## Testing Endpoints

### Using cURL

Get balance:
```bash
curl http://localhost:5000/api/token/balance/0xaddress
```

Get counter:
```bash
curl http://localhost:5000/api/counter/value
```

Increment counter:
```bash
curl -X POST http://localhost:5000/api/counter/increment
```

### Using Postman

1. Import the API endpoints
2. Set BASE_URL to `http://localhost:5000`
3. Test each endpoint

## Troubleshooting

### "Cannot GET /api/token/..."
- Check that server is running
- Verify route spelling
- Check CORS configuration

### "Contract call reverted"
- Verify contract address is correct
- Check account has required permissions
- Ensure RPC URL is working

### "Invalid RPC URL"
- Check Infura key is correct
- Verify network ID matches contract

## Next Steps

1. ✅ Install dependencies
2. ✅ Configure `.env`
3. ✅ Deploy smart contracts
4. ✅ Update contract addresses in `.env`
5. ✅ Start backend server
6. ✅ Test API endpoints
7. ➡️ Connect frontend

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use proper RPC provider (Alchemy, Infura, etc.)
3. Implement rate limiting
4. Add request logging
5. Set up monitoring
6. Use HTTPS
7. Set appropriate CORS origins
8. Store secrets in secure vault

## Support

For issues or questions, check:
- Backend logs
- Contract verification on Etherscan
- RPC provider status
- Network connectivity
