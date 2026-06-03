// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title SimpleCounter
 * @dev A simple counter contract deployed on Hoodi Testnet
 * @notice This contract allows incrementing, decrementing, and setting counter values
 */
contract SimpleCounter {
    // Counter state variable
    uint256 public counter;

    // Contract owner
    address public owner;

    // Events
    event CounterIncremented(address indexed caller, uint256 newValue);
    event CounterDecremented(address indexed caller, uint256 newValue);
    event ValueSet(address indexed caller, uint256 oldValue, uint256 newValue);

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "SimpleCounter: Only owner can call this function");
        _;
    }

    /**
     * @dev Constructor to initialize the contract
     */
    constructor() {
        owner = msg.sender;
        counter = 0;
    }

    /**
     * @dev Increment counter by 1
     */
    function increment() external {
        counter += 1;
        emit CounterIncremented(msg.sender, counter);
    }

    /**
     * @dev Decrement counter by 1
     */
    function decrement() external {
        require(counter > 0, "SimpleCounter: Counter cannot go below 0");
        counter -= 1;
        emit CounterDecremented(msg.sender, counter);
    }

    /**
     * @dev Set counter to a specific value (only owner)
     * @param newValue The new value for the counter
     */
    function setValue(uint256 newValue) external onlyOwner {
        uint256 oldValue = counter;
        counter = newValue;
        emit ValueSet(msg.sender, oldValue, newValue);
    }

    /**
     * @dev Get the current counter value
     */
    function getValue() external view returns (uint256) {
        return counter;
    }

    /**
     * @dev Increment counter by a specific amount
     * @param amount The amount to increment by
     */
    function incrementBy(uint256 amount) external {
        require(amount > 0, "SimpleCounter: Amount must be greater than 0");
        counter += amount;
        emit CounterIncremented(msg.sender, counter);
    }

    /**
     * @dev Decrement counter by a specific amount
     * @param amount The amount to decrement by
     */
    function decrementBy(uint256 amount) external {
        require(amount > 0, "SimpleCounter: Amount must be greater than 0");
        require(counter >= amount, "SimpleCounter: Counter cannot go below 0");
        counter -= amount;
        emit CounterDecremented(msg.sender, counter);
    }

    /**
     * @dev Reset counter to 0 (only owner)
     */
    function reset() external onlyOwner {
        uint256 oldValue = counter;
        counter = 0;
        emit ValueSet(msg.sender, oldValue, 0);
    }

    /**
     * @dev Transfer ownership to a new address
     * @param newOwner The new owner address
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "SimpleCounter: Cannot transfer ownership to zero address");
        owner = newOwner;
    }
}
