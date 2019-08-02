
var account = web3.toChecksumAddress(web3.eth.accounts[0])

const latest = web3.eth.getBlockNumber()

// Factory Contract
var factoryABI = web3.eth.contract([
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
				"name": "_supplyOfTokens",
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
	}
])

// var factoryAddress = "0x50f16ed6f353668c94f7be1ac7b802be08f453f5" // kovan
// var factoryAddress = "0x2d42d87bfb8fe08f7a2c2ecc33762fef538ef871" // local blockchain
var factoryAddress = "0x1b29c2c052818b77f4fcb8556baa038626009a68" // ropsten

var factory = factoryABI.at(factoryAddress)

function createProperty() {
    var symbol = $('#_tokenSymbol').val()
    var name = $('#_propertyName').val()
	var supply = $('#_propertyPrice').val()
	// var supply = $('#_totalSupply').val()
	// var priceEth = $('#_ethPrice').val()

	var address = $('#_propertyAddress').val()
	var description = $('#_propertyDescription').val()
	var image = $('#imageInput').val()

	var isDataValid = validateFields(symbol, name, supply, address, description, image)

	if(isDataValid) {
		// createToken(symbol, name, supply, priceEth, account);
		createToken(symbol, name, supply, account);
	} else {
		return
	}
}

function validateFields(symbol, name, supply, address, description, image) {
	if(name.length == 0) {
		alert('Please provide a value for the field Property Name')
		return false
	}
	if(supply.length == 0) {
		alert('Please provide a value for the field Property Price')
		return false
	}
	if(!/^\d+$/.test(supply)) {
		alert('Property Price is not valid: ' + supply)
		return false
	}
	if(address.length == 0) {
		alert('Please provide a value for the field Property Address')
		return false
	}
	if(symbol.length == 0) {
		alert('Please provide a value for the field Property Token Symbol')
		return false
	}
	if(description.length == 0) {
		alert('Please provide a value for the field Property Description')
		return false
	}
	if(image.length == 0) {
		alert('Please provide a value for the field Property Image')
		return false
	}
	return true
}

// function createToken(symbol, name, supply, priceEth, owner) {
function createToken(symbol, name, supply, owner) {
    // var tx = factory.createProperty(symbol, name, supply, priceEth, owner, {
	var tx = factory.createProperty(symbol, name, supply, owner, {
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
			// alert("Property being created, please wait to be redirected. This process can take up to a few minutes.");
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