
// INSTANTIATE CONTRACT AND ABI

var account;

function setAddress() {
    account = web3.toChecksumAddress(web3.eth.accounts[0]);
}

setAddress();

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

var getEvents = true;

function createNew() {
    var symbol = document.getElementById('_tokenSymbol').value;
    var name = document.getElementById('_propertyName').value;
    var supply = document.getElementById('_totalSupply').value;
    var priceElad = document.getElementById('_eladPrice').value;
    var priceEth = document.getElementById('_ethPrice').value;
    var fallback = document.getElementById('_fallbackAddress').value;
    if (fallback == "") { fallback = account }
    createToken(symbol, name, supply, priceElad, priceEth, fallback);
}

function createToken(symbol, name, supply, priceElad, priceEth, fallbackAddress) {
	var eth = 1000000000000000000;
    var tx = Factory.createProperty(symbol, name, priceEth * eth, priceElad, supply, fallbackAddress, {
        from: account,
        // gas: "3000000",
        to: factoryContractAddress,
        // value: checkPrice(0),
        data: ""
    }, function (err, transactionHash) {
        if (!err)
			console.log(transactionHash);
			window.alert("Property being created, please wait to be redirected. This process can take up to a few minutes.");
    })
};

// watch for contract events since last block
// what we want here is the next event emitted, which is the contract creation
Factory.allEvents({
    fromBlock: latest
}, (error, event) => {
    if (getEvents) {
		console.log(event.args._contract);
		window.location = "/users/manage";
    } else { }
});