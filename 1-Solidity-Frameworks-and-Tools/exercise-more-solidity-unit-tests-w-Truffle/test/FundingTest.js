const Funding = artifacts.require('Funding');
const utils = require('./utils');

const SECONDS_IN_1_HOUR = 3600;
const HOURS_IN_A_DAY = 24;
const GWEI = 10 ** 9;
const DAY = SECONDS_IN_1_HOUR * HOURS_IN_A_DAY;

contract('Funding', async (accounts) => {
    const firstAccount = accounts[0];
    const secondAccount = accounts[1];
    let funding;

    beforeEach(async () => {
        funding = await Funding.new(DAY);
    });

    it('does not allow for donations when time is up', async () => {
        await funding.donate({ from: firstAccount, value: 10000000 * GWEI });
        await utils.timeTravel(web3, DAY);
        
        try {
            await funding.donate({ from: firstAccount, value: 10000000 * GWEI });
            assert.fail();
        } catch (err) {
            assert.ok(/revert/.test(err.message));
        }
    });

    it('finishes fundraising when time is up', async () => {
        assert.equal(await funding.isFinished.call(), false);
        await utils.timeTravel(web3, DAY);
        assert.equal(await funding.isFinished.call(), true);
    })

    it('keeps track of donator balance', async () => {
        await funding.donate({ 
            from: firstAccount, 
            value: 5000000 * GWEI 
        });
        await funding.donate({ 
            from: secondAccount, 
            value: 15000000 * GWEI 
        });
        await funding.donate({ 
            from: secondAccount, 
            value: 3000000 * GWEI 
        });
        assert.equal(
            await funding.balances.call(firstAccount), 
            5000000 * GWEI
        );
        assert.equal(
            await funding.balances.call(secondAccount), 
            18000000 * GWEI
        );
    })

    it('accepts donations', async () => {
        await funding.donate({ from: firstAccount, value: 10000000 * GWEI });
        await funding.donate({ from: secondAccount, value: 20000000 * GWEI });
        assert.equal(await funding.raised.call(), 30000000  * GWEI);
    });

    it('sets an owner', async () => {
        assert.equal(await funding.owner.call(), firstAccount);
    });
});