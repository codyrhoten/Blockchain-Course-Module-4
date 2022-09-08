const ethers = require('ethers');
const solc = require('solc');
const Contract = ethers.Contract;
const provider = ethers.getDefaultProvider('ropsten');
const fs = require('fs-extra');

function readFile(fileName) {
    return fs.readFileSync(fileName, 'utf8');
}

function compileContract(fileName, contractName) {
    let contractStr = readFile(fileName);
    let input = JSON.stringify({
        language: 'Solidity',
        sources: {
            'source_1': {
                content: contractStr
            }
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*']
                }
            }
        }
    });

    let output = JSON.parse(solc.compile(input)).contracts['source_1'];
    return output[contractName];
}

/* (async() => {
    console.log('\nCOMPILING CONTRACT');
    const compiledContract = compileContract('./ArrayOfFacts.sol', "ArrayOfFacts");
    console.log(compiledContract);
    const abi = compiledContract.abi;
})(); */

const privateKey = 'b33688aba6fcfcc17668c27686e5a70c0259f7d289980f82da91d76584f953dc';

function deployContract(privateKey, fileName, contractName) {
    let wallet = new ethers.Wallet(privateKey, provider);
    let contract = compileContract(fileName, contractName);
    let bytecode = '0x' + contract.evm.bytecode.object;
    let abi = contract.abi;
    let factory = new Ethers.ContractFactory(abi, bytecode, wallet);

    return factory.deploy().then(contract => {
        console.log('Transaction created: ');
        console.log(contract.deployTransaction);
        console.log('Contract address: ' + contract.address);
        return contract;
    });
}