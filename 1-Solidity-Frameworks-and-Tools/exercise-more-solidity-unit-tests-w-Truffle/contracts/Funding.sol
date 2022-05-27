// SPDX-License-Identifier: (c) Copyright 2020 Kingsland University, All Rights Reserved.

pragma solidity ^0.8.7;

contract Funding {
    address payable public owner;
    uint256 public finishesAt;
    uint256 public raised;
    mapping(address => uint256) public balances;

    constructor(uint256 _duration) {
        owner = payable(msg.sender);
        finishesAt = block.timestamp + _duration;
    }

    modifier onlyNotFinished() {
        require(!isFinished());
        _;
    }

    function isFinished() public view returns (bool) {
        return finishesAt <= block.timestamp;
    }

    function donate() public payable onlyNotFinished {
        balances[msg.sender] += msg.value;
        raised += msg.value;
    }
}