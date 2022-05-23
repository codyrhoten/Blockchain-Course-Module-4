const helpers = require('./helpers.js');
let PublicArticle = artifacts.require('PublicArticle');

contract('PublicArticle', function(accounts) {
    let instance;

    beforeEach('should setup the contract instance', async () => {
        instance = await PublicArticle.deployed();
    });

    it("should get the article's name as empty string", async () => {
        await instance.setDuration(20);
        const name = await instance.getArticleName();
        assert.equal(name, '');
    });

    it("should get the article's text as empty string", async () => {
        await instance.setDuration(20);
        const text = await instance.getArticleText();
        assert.equal(text, '');
    });

    it("should change the article's name", async () => {
        await instance.setDuration(20);
        await instance.setArticleName('Article Name');
        const name = await instance.getArticleName();
        assert.equal(name, 'Article Name');
    });

    it("should change the article's text", async () => {
        await instance.setDuration(20);
        await instance.setArticleText('Article Text Here');
        const text = await instance.getArticleText();
        assert.equal(text, 'Article Text Here');
    });

    it(
        "doesn't get the article name after time limit is up", 
        async () => {
            let minute = 60;
            let timeAfter = 0;
            let timeDuring = 0;
            await instance.setDuration(minute);

            await web3.eth.getBlock('latest').then(function(block) {
                timeDuring = block.timestamp;
            });
            await helpers.timeTravel(web3, minute + 1);
            await web3.await.eth.getBlock('latest').then(function(block) {
                timeAfter = block.timestamp;
            });

            assert.isAbove(timeAfter - timeDuring, minute);
        }
    );

    it(
        'should not get the article name if the duration has not been set',
        async () => {
            assert.throws(function() {
                instance.getArticleName();
            });
        }
    );
});