
// INSTANTIATE CONTRACT AND ABI

var account;

function setAddress() {
    account = web3.toChecksumAddress(web3.eth.accounts[0]);
}

setAddress();

console.log('Address:')
console.log(account)

var factoryContractABI = web3.eth.contract([
	{
		"constant": true,
		"inputs": [
			{
				"name": "_ad",
				"type": "address"
			}
		],
		"name": "isPropertyContract",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "changeOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "isProperty",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_symbol",
				"type": "string"
			},
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_priceInEther",
				"type": "uint256"
			},
			{
				"name": "_priceInElad",
				"type": "uint256"
			},
			{
				"name": "_supply",
				"type": "uint256"
			},
			{
				"name": "_fallback",
				"type": "address"
			}
		],
		"name": "createProperty",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tracker",
				"type": "address"
			}
		],
		"name": "setTracker",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_user",
				"type": "address"
			}
		],
		"name": "allUserContracts",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userContracts",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "tracker",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_contract",
				"type": "address"
			}
		],
		"name": "NewToken",
		"type": "event"
	}
]);

var factoryContractAddress = "0x71f85c2e175df7d258bc7362d45e0f7b38513600";

var Factory = factoryContractABI.at(factoryContractAddress);

const latest = web3.eth.getBlockNumber();

// ---
var factoryABI = web3.eth.contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "_symbol",
				"type": "string"
			},
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_supplyOfTokens",
				"type": "uint256"
			},
			{
				"name": "_tokenEthPrice",
				"type": "uint256"
			},
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "createProperty",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_contract",
				"type": "address"
			}
		],
		"name": "NewToken",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tokens",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalTokens",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
])

var factoryAddress = "0x709147918F86cEAA51326B48705674fA4B57F2DE"

var factory = factoryABI.at(factoryAddress)
// ---

var getEvents = true;

function createNew() {
    var symbol = document.getElementById('_tokenSymbol').value;
    var name = document.getElementById('_propertyName').value;
    var supply = document.getElementById('_totalSupply').value;
    // var priceElad = document.getElementById('_eladPrice').value;
    var priceEth = document.getElementById('_ethPrice').value;
    // var fallback = document.getElementById('_fallbackAddress').value;
    // if (fallback == "") { fallback = account }
	// createToken(symbol, name, supply, priceElad, priceEth, fallback);

	
	createToken(symbol, name, supply, priceEth, account);
}

function createToken(symbol, name, supply, priceEth, owner) {
    var tx = factory.createProperty(symbol, name, supply, priceEth, owner, {
        from: account,
        to: factoryAddress,
        data: ""
    }, function (error, txHash) {
		if (error) {
			console.log('There was an error creating the token')
			console.log(error)
		} else {
			console.log('tx hash:')
			console.log(txHash);
			alert("Property being created, please wait to be redirected. This process can take up to a few minutes.");
		}
    })
};

// watch for contract events since last block
// what we want here is the next event emitted, which is the contract creation
factory.allEvents({
    fromBlock: latest
}, (error, event) => {
    if (getEvents) {
		console.log(event.args._contract);
		window.alert('Token created!')
		window.location = "/properties";
    }
});