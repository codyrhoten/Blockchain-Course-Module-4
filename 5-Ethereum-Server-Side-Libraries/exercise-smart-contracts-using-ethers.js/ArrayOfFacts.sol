// SPDX-License-Identifier: (c) Copyright 2020 Kingsland University All Rights Reserved
pragma solidity ^0.8.7;

contract ArrayOfFacts {
    string[] private facts;
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, 'Only contract owner can do this!');
        _;
    }

    function add(string memory fact) public onlyOwner {
        facts.push(fact);
    }

    function count() public view returns (uint256 factCount) {
        return facts.length;
    }

    function getFact(uint256 index) public view returns (string memory fact) {
        return facts[index];
    }
}