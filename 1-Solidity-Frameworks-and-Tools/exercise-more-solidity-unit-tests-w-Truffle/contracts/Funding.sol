// SPDX-License-Identifier: (c) Copyright 2020 Kingsland University, All Rights Reserved.

pragma solidity ^0.8.7;

contract Funding {
    address payable public owner;
    uint256 public finishesAt;
    uint public goal;
    uint256 public raised;
    mapping(address => uint256) public balances;

    constructor(uint256 _duration, uint _goal) {
        owner = payable(msg.sender);
        finishesAt = block.timestamp + _duration;
        goal = _goal;
    }

    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }

    modifier onlyFunded() {
        require(isFunded());
        _;
    }

    modifier onlyNotFunded() {
        require(!isFunded());
        _;
    }

    modifier onlyFinished() {
        require(isFinished());
        _;
    }

    modifier onlyNotFinished() {
        require(!isFinished());
        _;
    }

    function refund() public onlyFinished onlyNotFunded {
        uint256 amount = balances[msg.sender];
        require(amount > 0);
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    function isFunded() public view returns (bool) {
        return raised >= goal;
    }

    function withdraw() public onlyOwner onlyFunded {
        owner.transfer(address(this).balance);
    }

    function isFinished() public view returns (bool) {
        return finishesAt <= block.timestamp;
    }

    function donate() public payable onlyNotFinished {
        balances[msg.sender] += msg.value;
        raised += msg.value;
    }
}