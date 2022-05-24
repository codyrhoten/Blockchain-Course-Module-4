// SPDX-License-Identifier: (c) Copyright 2021 Kingsland University, All Rights Reserved.

pragma solidity ^0.8.7;

import 'truffle/Assert.sol';
import '../contracts/Funding.sol';
import 'truffle/DeployedAddresses.sol';

contract FundingTest {
    function testAcceptingDonations() public {
        Funding funding = new Funding();
        Assert.equal(
            funding.raised(), 
            0, 
            'Initial raised amonut is different from 0'
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
        Funding funding = new Funding();
        Assert.equal(
            funding.owner(),
            address(this),
            'The owner is different from the deployer'
        );
    }

    function testSettingAnOwnerOfDeployedContract() public {
        Funding newFunding = Funding(DeployedAddresses.Funding());
        Assert.equal(
            newFunding.owner(),
            msg.sender,
            'The owner is different from the deployer'
        );
    }
}