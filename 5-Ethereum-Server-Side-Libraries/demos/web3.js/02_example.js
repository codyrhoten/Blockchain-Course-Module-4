let Web3 = require('web3')
let web3 = new Web3("http://localhost:7545")

const contractAddress = '0x6ce78f7700ac45c07a9bcf4619c7d39c637f5b60';
const contractABI = [
	{
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "x",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "set",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
let contract = new web3.eth.Contract(contractABI, contractAddress);

contract.methods.get()
    .call({from: '0xa24c8e169c36f179308a7baa5a499fce09a0b877'})
    .then(console.log)
