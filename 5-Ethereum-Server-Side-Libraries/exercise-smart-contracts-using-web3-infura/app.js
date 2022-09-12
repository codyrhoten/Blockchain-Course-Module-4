const Web3 = require('web3');
const solc = require('solc');
const fs = require('fs');

const PROVIDER_URL = 'https://ropsten.infura.io/v3/a288ef1245924ce8a9007b07df9eba70';
const web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));

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

const privateKey = '109ed597e869eb1f3cb5b0e4d23553f0187b51a7a8a4ae1108094e9ffc08b061';

web3.eth.accounts.wallet.add(privateKey);
const ABI = compiledContract['abi'];
const BYTECODE = '0x' + compiledContract['evm']['bytecode']['object'];

let contract = new web3.eth.Contract(ABI, null, {
    data: BYTECODE,
    from: web3.eth.accounts.wallet[0].address,
    gas: 4600000
});

contract
    .deploy()
    .send()
    .then(contractInstance => {
        console.log('Contract created at ' + contractInstance.options.address);
    });