const Funding = artifacts.require('Funding');

const GWEI = 10 ** 9;

contract('Funding', async (accounts) => {
    const firstAccount = accounts[0];
    const secondAccount = accounts[1];

    it('keeps track of donator balance', async () => {
        const funding = await Funding.new()
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
        const funding = await Funding.new();
        await funding.donate({ from: firstAccount, value: 10000000 * GWEI });
        await funding.donate({ from: secondAccount, value: 20000000 * GWEI });
        assert.equal(await funding.raised.call(), 30000000  * GWEI);
    });

    it('sets an owner', async () => {
        const funding = await Funding.new();
        assert.equal(await funding.owner.call(), firstAccount);
    });
});