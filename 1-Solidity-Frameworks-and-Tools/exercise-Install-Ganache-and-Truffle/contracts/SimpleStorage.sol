// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
    uint private storedData;

    function set(uint x) public { storedData = x; }

    function get() view public returns (uint) { return storedData; }
}