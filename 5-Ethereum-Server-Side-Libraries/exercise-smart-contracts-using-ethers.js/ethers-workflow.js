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

const privateKey = '109ed597e869eb1f3cb5b0e4d23553f0187b51a7a8a4ae1108094e9ffc08b061';

(async() => {
    console.log('\nCOMPILING CONTRACT');
    const compiledContract = compileContract('./ArrayOfFacts.sol', "ArrayOfFacts");
    console.log(compiledContract);
    const abi = compiledContract.abi;

    /* console.log('\nDEPLOYING CONTRACT');
    let contract = await deployContract(
        privateKey, 
        './ArrayOfFacts.sol', 
        'ArrayOfFacts'
    );
    console.log('\nWAITING FOR CONTRACT TO BE MINED');
    await contract.deployed();
    console.log(contract.address); */
    
    let contractAddress = '0xE6919F8Ff6EDb9A1f165EB44904bfb04d2B591c3'

    console.log('\nADDING A FACT');
    let fact = 'The Times 03/Jan/2009 Chancellor on brink of second bailout for the banks!';
    let tx = await addFact(privateKey, abi, contractAddress, fact);
    console.log('\nWAITING FOR TRANSACTION TO BE MINED');
    await tx.wait();
})();


function deployContract(privateKey, fileName, contractName) {
    let wallet = new ethers.Wallet(privateKey, provider);
    let contract = compileContract(fileName, contractName);
    let bytecode = '0x' + contract.evm.bytecode.object;
    let abi = contract.abi;
    let factory = new ethers.ContractFactory(abi, bytecode, wallet);

    return factory.deploy().then(contract => {
        console.log('Transaction created: ');
        console.log(contract.deployTransaction);
        console.log('Contract address: ' + contract.address);
        return contract;
    });

    function addFact(privateKey, abi, contractAddress, fact) {
        let wallet = new ethers.Wallet(privateKey, provider);
        let contract = new ethers.Contract(contractAddress, abi, wallet);

        return contract.add(fact).then(tx => {
            console.log('Transaction: \n' + tx);
            return tx;
        })
    }
}