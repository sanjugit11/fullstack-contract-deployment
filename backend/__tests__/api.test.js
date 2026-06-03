jest.mock('../services/tokenService', () => ({
  getBalance: jest.fn(),
  getTotalSupply: jest.fn(),
  transfer: jest.fn(),
  mint: jest.fn(),
  burn: jest.fn()
}));

jest.mock('../services/counterService', () => ({
  getValue: jest.fn(),
  increment: jest.fn(),
  decrement: jest.fn(),
  setValue: jest.fn(),
  incrementBy: jest.fn(),
  decrementBy: jest.fn()
}));

const app = require('../server');
const tokenService = require('../services/tokenService');
const counterService = require('../services/counterService');
const { Readable, Writable } = require('stream');
const { ServerResponse } = require('http');

class MockRequest extends Readable {
  constructor(path, options) {
    super();
    this.method = options.method || 'GET';
    this.url = path;
    this.body = options.body;
    this.bodyPayload = null;
    this.headers = {
      host: '127.0.0.1',
      ...(options.headers || {})
    };
  }

  _read() {
    if (this.bodyPayload) {
      this.push(this.bodyPayload);
      this.bodyPayload = null;
    }

    this.push(null);
  }
}

class MockSocket extends Writable {
  _write(chunk, encoding, callback) {
    callback();
  }
}

async function apiRequest(path, options = {}) {
  return new Promise((resolve, reject) => {
    const req = new MockRequest(path, options);
    const res = new ServerResponse(req);
    const chunks = [];

    res.assignSocket(new MockSocket());
    res.write = (chunk, encoding, callback) => {
      if (chunk) {
        chunks.push(Buffer.from(chunk));
      }

      if (typeof encoding === 'function') {
        encoding();
      }

      if (typeof callback === 'function') {
        callback();
      }

      return true;
    };
    res.end = (chunk, encoding, callback) => {
      if (chunk) {
        chunks.push(Buffer.from(chunk));
      }

      if (typeof encoding === 'function') {
        encoding();
      }

      if (typeof callback === 'function') {
        callback();
      }

      const rawBody = Buffer.concat(chunks).toString();
      resolve({
        status: res.statusCode,
        body: rawBody ? JSON.parse(rawBody) : null
      });

      return res;
    };

    req.on('error', reject);
    res.on('error', reject);
    app.handle(req, res);
  });
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Backend API', () => {
  test('GET /api/health returns service health', async () => {
    const response = await apiRequest('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      success: true,
      status: 'Backend API is running'
    });
    expect(response.body).toHaveProperty('hoodiRpcHost');
    expect(Date.parse(response.body.timestamp)).not.toBeNaN();
  });

  test('unknown routes return 404 JSON', async () => {
    const response = await apiRequest('/api/not-found');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      error: 'Route not found'
    });
  });

  test('GET /api/token/balance/:address returns token balance', async () => {
    const address = '0x0000000000000000000000000000000000000001';
    tokenService.getBalance.mockResolvedValue({
      success: true,
      balance: '12.5',
      balanceWei: '12500000000000000000'
    });

    const response = await apiRequest(`/api/token/balance/${address}`);

    expect(response.status).toBe(200);
    expect(tokenService.getBalance).toHaveBeenCalledWith(address);
    expect(response.body).toEqual({
      success: true,
      balance: '12.5',
      balanceWei: '12500000000000000000'
    });
  });

  test('POST /api/token/transfer validates required body fields', async () => {
    const response = await apiRequest('/api/token/transfer', {
      method: 'POST',
      body: { to: '0x0000000000000000000000000000000000000001' }
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      error: 'Recipient address and amount are required'
    });
    expect(tokenService.transfer).not.toHaveBeenCalled();
  });

  test('POST /api/counter/set-value accepts zero', async () => {
    counterService.setValue.mockResolvedValue({
      success: true,
      newValue: '0',
      action: 'setValue'
    });

    const response = await apiRequest('/api/counter/set-value', {
      method: 'POST',
      body: { value: 0 }
    });

    expect(response.status).toBe(200);
    expect(counterService.setValue).toHaveBeenCalledWith(0);
    expect(response.body).toEqual({
      success: true,
      newValue: '0',
      action: 'setValue'
    });
  });
});
