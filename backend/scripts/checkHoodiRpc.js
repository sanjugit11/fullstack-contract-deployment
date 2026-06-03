const { ethers } = require('ethers');
const env = require('../config/env');

const HOODI_CHAIN_ID = 560048n;

async function main() {
  const rpcUrl = env.HOODI_RPC_URL;
  const counterAddress = env.HOODI_COUNTER_ADDRESS;

  if (!rpcUrl) {
    throw new Error('HOODI_RPC_URL is missing in backend/.env');
  }

  if (!counterAddress || !ethers.isAddress(counterAddress.trim())) {
    throw new Error('HOODI_COUNTER_ADDRESS is missing or invalid in backend/.env');
  }

  const provider = new ethers.JsonRpcProvider(
    rpcUrl.trim(),
    { name: 'hoodi', chainId: Number(HOODI_CHAIN_ID) },
    { staticNetwork: true }
  );

  const network = await provider.getNetwork();
  if (network.chainId !== HOODI_CHAIN_ID) {
    throw new Error(`RPC returned chain id ${network.chainId}; expected ${HOODI_CHAIN_ID}`);
  }

  const code = await provider.getCode(counterAddress.trim());
  if (code === '0x') {
    throw new Error(`No contract code found at ${counterAddress} on Hoodi`);
  }

  console.log('Hoodi RPC OK');
  console.log(`Chain ID: ${network.chainId}`);
  console.log(`Counter contract: ${counterAddress.trim()}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
