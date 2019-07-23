
var account = web3.toChecksumAddress(web3.eth.accounts[0])

const latest = web3.eth.getBlockNumber()

// Factory Contract
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

var factoryAddress = "0x50f16ed6f353668c94f7be1ac7b802be08f453f5" // kovan
// var factoryAddress = "0x2d42d87bfb8fe08f7a2c2ecc33762fef538ef871" // local blockchain

var factory = factoryABI.at(factoryAddress)

function createProperty() {
    var symbol = $('#_tokenSymbol').val()
    var name = $('#_propertyName').val()
    var supply = $('#_totalSupply').val()
    var priceEth = $('#_ethPrice').val()
	
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
}

// watch for contract events since last block
// what we want here is the next event emitted, which is the contract creation
// factory.allEvents({
//     fromBlock: latest
// }, (error, event) => {
//     if (true) {
// 		console.log(event.args._contract);
// 		window.alert('Token created!')
// 		window.location = "/properties";
//     }
// });