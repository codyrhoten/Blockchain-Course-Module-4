//const helpers = require("./helpers.js");
let PublicArticle = artifacts.require("PublicArticle");

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

    /* it(
        "doesn't get the article name after time limit is up", 
        async () => {
            const minuteLimit = await instance.setDuration(60);
            await web3.eth.getBlock('latest').then(function(block) {
                time
            })
        }
    ); */
})