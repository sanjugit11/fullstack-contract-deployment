// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title SimpleToken
 * @dev A simple ERC20-like token contract deployed on Sepolia Testnet
 * @notice This contract allows minting, transferring, and burning tokens
 */
contract SimpleToken {
    // Token metadata
    string public name = "Simple Token";
    string public symbol = "STK";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    // Mapping to store balances
    mapping(address => uint256) public balanceOf;
    
    // Mapping to store allowances
    mapping(address => mapping(address => uint256)) public allowance;

    // Contract owner
    address public owner;

    // Events
    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Approval(address indexed owner, address indexed spender, uint256 amount);
    event Mint(address indexed to, uint256 amount);
    event Burn(address indexed from, uint256 amount);

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "SimpleToken: Only owner can call this function");
        _;
    }

    /**
     * @dev Constructor to initialize the contract
     */
    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Mint new tokens (only owner)
     * @param to The address to mint tokens to
     * @param amount The amount of tokens to mint
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "SimpleToken: Cannot mint to zero address");
        require(amount > 0, "SimpleToken: Amount must be greater than 0");

        balanceOf[to] += amount;
        totalSupply += amount;

        emit Transfer(address(0), to, amount);
        emit Mint(to, amount);
    }

    /**
     * @dev Transfer tokens to another address
     * @param to The recipient address
     * @param amount The amount of tokens to transfer
     */
    function transfer(address to, uint256 amount) external returns (bool) {
        require(to != address(0), "SimpleToken: Cannot transfer to zero address");
        require(balanceOf[msg.sender] >= amount, "SimpleToken: Insufficient balance");

        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;

        emit Transfer(msg.sender, to, amount);
        return true;
    }

    /**
     * @dev Approve another address to spend tokens on your behalf
     * @param spender The address that can spend tokens
     * @param amount The amount of tokens to approve
     */
    function approve(address spender, uint256 amount) external returns (bool) {
        require(spender != address(0), "SimpleToken: Cannot approve zero address");

        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    /**
     * @dev Transfer tokens from one address to another (requires approval)
     * @param from The sender address
     * @param to The recipient address
     * @param amount The amount of tokens to transfer
     */
    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        require(from != address(0), "SimpleToken: Cannot transfer from zero address");
        require(to != address(0), "SimpleToken: Cannot transfer to zero address");
        require(balanceOf[from] >= amount, "SimpleToken: Insufficient balance");
        require(allowance[from][msg.sender] >= amount, "SimpleToken: Insufficient allowance");

        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        allowance[from][msg.sender] -= amount;

        emit Transfer(from, to, amount);
        return true;
    }

    /**
     * @dev Burn tokens from caller's account
     * @param amount The amount of tokens to burn
     */
    function burn(uint256 amount) external returns (bool) {
        require(balanceOf[msg.sender] >= amount, "SimpleToken: Insufficient balance");

        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;

        emit Transfer(msg.sender, address(0), amount);
        emit Burn(msg.sender, amount);
        return true;
    }

    /**
     * @dev Get the balance of an address
     * @param account The address to check balance for
     */
    function getBalance(address account) external view returns (uint256) {
        return balanceOf[account];
    }

    /**
     * @dev Transfer ownership to a new address
     * @param newOwner The new owner address
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "SimpleToken: Cannot transfer ownership to zero address");
        owner = newOwner;
    }
}
