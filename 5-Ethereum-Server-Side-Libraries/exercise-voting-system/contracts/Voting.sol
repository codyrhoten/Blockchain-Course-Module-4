// SPDX-License-Identifier: (c) Copyright 2020 Kingsland University All Rights Reserved
pragma solidity ^0.8.13;

contract Voting {
    mapping (bytes32 => uint8) public votesReceived;
    string[] public candidateList;

    function addCandidate(string memory candidateNames) public {
        candidateList.push(candidateNames);
    }

    function totalVotesFor(string memory candidate) public view returns (uint8) {
        require(validCandidate(candidate), 'Must be valid candidate');
        return votesReceived[keccak256(bytes (candidate))];
    }
}