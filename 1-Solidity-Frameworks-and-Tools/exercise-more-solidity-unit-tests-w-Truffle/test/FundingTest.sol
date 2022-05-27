// SPDX-License-Identifier: (c) Copyright 2021 Kingsland University, All Rights Reserved.

pragma solidity ^0.8.7;

import 'truffle/Assert.sol';
import '../contracts/Funding.sol';
import 'truffle/DeployedAddresses.sol';

contract FundingTest {
    uint public initialBalance = 10 ether;
    Funding funding;

    receive() external payable {}

    function beforeEach() public {
        funding = new Funding(1 days);
    }

    function testTrackingDonatorsBalance() public {
        funding.donate{value: 5000000 gwei}();
        funding.donate{value: 15000000 gwei}();
        Assert.equal(
            funding.balances(address(this)), 
            20000000 gwei, 
            'Donator balance is different from donations'
        );
    }

    function testAcceptingDonations() public {
        Assert.equal(
            funding.raised(), 
            0, 
            'Initial raised amount is different from 0'
        );

        funding.donate{value: 10000000 gwei}();
        funding.donate{value: 20000000 gwei}();

        Assert.equal(
            funding.raised(), 
            30000000 gwei, 
            'Raised amount is different from sum of donations'
        );
    }

    function testSettingAnOwnerDuringCreation() public {
        Assert.equal(
            funding.owner(),
            address(this),
            'The owner is different from the deployer'
        );
    }

    function testSettingAnOwnerOfDeployedContract() public {
        Funding newFund = Funding(DeployedAddresses.Funding());
        Assert.equal(
            newFund.owner(),
            msg.sender,
            'The owner is different from the deployer'
        );
    }
}