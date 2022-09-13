from web3 import Web3, HTTPProvider
import json
PROVIDER = 'https://ropsten.infura.io/v3/a288ef1245924ce8a9007b07df9eba70'
w3 = Web3(HTTPProvider(PROVIDER))
w3Api = w3.eth
#w3Api.enable_unaudited_features()

CONTRACT_ADDRESS = '0x5F7c8ebB728587fa2Ad7f4D60F32fF5AA79848b0'
ABI = """
[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "fact",
				"type": "string"
			}
		],
		"name": "add",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "count",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "factCount",
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
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getFact",
		"outputs": [
			{
				"internalType": "string",
				"name": "fact",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
"""

CONTRACT_INSTANCE = w3Api.contract(address=CONTRACT_ADDRESS, abi=ABI)
# ---------- Contract Owner Wallet Key and Address ----------
# PRIVATE_KEY = '109ed597e869eb1f3cb5b0e4d23553f0187b51a7a8a4ae1108094e9ffc08b061'
# ADDRESS = '0x47E630B546CaE95461FB327b7A67A17bC983B088'
# ----------   not contract owner key or address   ----------
PRIVATE_KEY = 'ece15dbdad2749bebbd64ac06940c161685fbde2e12fe63172931bcf5ee4721a'
ADDRESS = '0x9D8e07AB480A9132f6fe62FB06100de177Bcea3B'

""" def add_fact(contract_instance, private_key, address, fact):
    nonce = w3Api.getTransactionCount(address)

    add_transaction = contract_instance.functions.add(fact).buildTransaction({
        'gas': 4600000,
        'nonce': nonce
    })

    print(add_transaction)
    signed_txn = w3Api.account.signTransaction(add_transaction, private_key=private_key)
    w3Api.sendRawTransaction(signed_txn.rawTransaction)

fact = 'A thing that is known or proved to be true.'
add_fact(CONTRACT_INSTANCE, PRIVATE_KEY, ADDRESS, fact) """

def get_fact(contract_instance, index):
    fact = contract_instance.functions.getFact(index).call()
    print(fact)

get_fact(CONTRACT_INSTANCE, 0)

def facts_count(contract_instance):
    numberOfFacts = contract_instance.functions.count().call()
    print("Stored facts in the contract: ", numberOfFacts)

facts_count(CONTRACT_INSTANCE)