const Web3 = require('web3');
const solc = require('solc');
const fs = require('fs');

const PROVIDER_URL = 'https://ropsten.infura.io/v3/a288ef1245924ce8a9007b07df9eba70';
const web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));
const walletApi = web3.eth.accounts.wallet;

const contractCode = fs.readFileSync('./ArrayOfFacts.sol').toString();

let standardCompilerInput = JSON.stringify({
    language: 'Solidity',
    sources: {
        contract: {
            content: contractCode
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['abi', 'evm.bytecode']
            }
        }
    }
});

let compiledContract = JSON.parse(solc.compile(standardCompilerInput));
compiledContract = compiledContract['contracts']['contract']['ArrayOfFacts'];
// console.log(compiledContract);

// ---------- CONTRACT OWNER WALLET KEY ----------
// const privateKey = '109ed597e869eb1f3cb5b0e4d23553f0187b51a7a8a4ae1108094e9ffc08b061';
// ----------    NOT CONTRACT OWNER    -----------
const privateKey = 'ece15dbdad2749bebbd64ac06940c161685fbde2e12fe63172931bcf5ee4721a';

walletApi.add(privateKey);
const ABI = compiledContract['abi'];
const BYTECODE = '0x' + compiledContract['evm']['bytecode']['object'];
const wallet = walletApi[0].address;

// ---------- CONTRACT ALREADY DEPLOYED ----------
/* let contract = new web3.eth.Contract(ABI, null, {
    data: BYTECODE,
    from: wallet,
    gas: 4600000
});

contract
    .deploy()
    .send()
    .then(contractInstance => {
        console.log('Contract created at ' + contractInstance.options.address);
    }); */

const contractAddress = '0x96C9E358dbD54c017490d0437B25c621F3E023d0';
const fact = 'NASA\'s Mars Helicopter Spots Gear That Helped Perseverance Rover Land 04/27/2022';
const contract = new web3.eth.Contract(ABI, contractAddress);

// ----------    FACT ADDED ALREADY    -----------
/* contract.methods
    .add(fact)
    .send(
        {
            from: wallet,
            gas: 4600000
        },
        (err, txId) => {
            if (err) 
                console.log(err);
            else 
                console.log('Transaction Hash: ' + txId);
        }
    )
    .then(tx => {
        console.log('Transaction Information:');
        console.log(tx);
    }); */

const factIndex = 0;
contract.methods.getFact(factIndex).call().then(result => {
    console.log(`Fact ${factIndex}: ${result}`);
});

contract.methods.count().call().then(result => {
    console.log(`Total recorded facts: ${result}`);
});