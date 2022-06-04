pragma solidity ^0.8.3;

contract SimpleStorage {
    
    // define the integer data storage field named storedData
    uint private storedData;
    
    // write a function to assign a value in the data storage field
    function set(uint x) public {
        storedData = x;
    }
    
    // write a function to read the current value from the data storage field on the blockchain
    function get() view public returns (uint) {
        return storedData;
    }
}