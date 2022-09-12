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
console.log(compiledContract);

/* const privateKey = '109ed597e869eb1f3cb5b0e4d23553f0187b51a7a8a4ae1108094e9ffc08b061';
// const privateKey = 'ece15dbdad2749bebbd64ac06940c161685fbde2e12fe63172931bcf5ee4721a';
const contractAddress = '0xe6919f8ff6edb9a1f165eb44904bfb04d2b591c3';

(async () => {
    console.log('\nCOMPILING CONTRACT');
    const compiledContract = compileContract('./ArrayOfFacts.sol', "ArrayOfFacts");
    const abi = compiledContract.abi;

    console.log('\nDEPLOYING CONTRACT');
    let contract = await deployContract(
        privateKey, 
        './ArrayOfFacts.sol', 
        'ArrayOfFacts'
    );
    console.log('\nWAITING FOR CONTRACT TO BE MINED');
    await contract.deployed();
    console.log(contract.address);


    console.log('\nADDING A FACT');
    let fact = 'The Times 03/Jan/2009 Chancellor on brink of second bailout for the banks!';
    let tx = await addFact(privateKey, abi, contractAddress, fact);
    console.log('\nWAITING FOR TRANSACTION TO BE MINED');
    await tx.wait();

    console.log('\nGETTING FACT');
    await getFact(privateKey, abi, contractAddress, 0);

    console.log('\nGETTING FACTS COUNT');
    await getFactsCount(provider, abi, contractAddress);
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
}

function addFact(privateKey, abi, contractAddress, fact) {
    let wallet = new ethers.Wallet(privateKey, provider);
    let contract = new ethers.Contract(contractAddress, abi, wallet);

    return contract.add(
        fact,
        {
            gasPrice: ethers.utils.parseUnits('100', 'gwei'),
            gasLimit: 1000000
        }
    )
        .then(transaction => {
            console.log('Transaction: \n');
            console.log(transaction);
            return transaction;
        }
        );
}

function getFact(privateKey, abi, contractAddress, index) {
    let contract = new ethers.Contract(contractAddress, abi, provider);
    return contract.getFact(index).then(_fact => {
        console.log('Fact ' + ++index + ' : ' + _fact);
    });
}

function getFactsCount(provider, abi, contractAddress) {
    let contract = new ethers.Contract(contractAddress, abi, provider);

    return contract.count().then(count => {
        console.log(ethers.BigNumber.from(count).toNumber())
    });
} */