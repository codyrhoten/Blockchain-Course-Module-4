// SPDX-License-Identifier: (c) Copyright 2020 Kingsland University, All Rights Reserved.

pragma solidity ^0.8.7;

contract Funding {
    address payable public owner;
    uint256 public raised;

    constructor() {
        owner = payable(msg.sender);
    }

    function donate() public payable {
        raised += msg.value;
    }
}