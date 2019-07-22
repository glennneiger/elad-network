var accountAddress = web3.toChecksumAddress(web3.eth.accounts[0])

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

// var factoryAddress = "0xcd73948b5775451057aa2665958bd6e57ab442af" // kovan
var factoryAddress = "0x2d42d87bfb8fe08f7a2c2ecc33762fef538ef871"

var factory = factoryABI.at(factoryAddress)

// Property Token
var propertyTokenABI = web3.eth.contract([
	{
		"constant": true,
		"inputs": [],
		"name": "propertyDetails",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
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
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
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
				"name": "spender",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
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
				"name": "sender",
				"type": "address"
			},
			{
				"name": "recipient",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
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
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
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
		"constant": true,
		"inputs": [],
		"name": "tokensBought",
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
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
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
				"name": "recipient",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "id",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "tokensLeft",
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
		"constant": true,
		"inputs": [],
		"name": "myBalance",
		"outputs": [
			{
				"name": "balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "buyTokens",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "tokenOwner",
				"type": "address"
			},
			{
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
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
		"constant": true,
		"inputs": [],
		"name": "tokenEthPrice",
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
				"name": "_initialSupply",
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
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	}
])

// var property = propertyTokenABI.at(propertyTokenAddress)
var propertyTokenAddress

var property

// get token address (asyncronous call)
function getTokenAdress() {
	var propertyName = document.getElementById('nome').innerHTML

	// first we get number of tokens created
    factory.totalTokens(function(error, number) {

        // now we get tokens addresses
        for(var i = 0; i < number; i++) {
            factory.tokens(i, function(error, address) {

				// instance of target token
                var targetTokenAddress = address
				var targetToken = propertyTokenABI.at(targetTokenAddress)

				targetToken.name(function(error, name) {
					if(propertyName == name) {
						setTimeout(function() {
							propertyTokenAddress = address
							property = propertyTokenABI.at(propertyTokenAddress)
						}, Math.random() * 2000);
					}
				})
            })
        }
    })
}

// getTokenAdress()

function loadPropertyData() {
	var propertyName = document.getElementById('nome').innerHTML

	// first we get number of tokens created
    factory.totalTokens(function(error, number) {

        // now we get tokens addresses
        for(var i = 0; i < number; i++) {
            factory.tokens(i, function(error, address) {

				// instance of target token
                var targetTokenAddress = address
				var targetToken = propertyTokenABI.at(targetTokenAddress)

				targetToken.name(function(error, name) {
					if(propertyName == name) {

						// do stuff here...

						targetToken.totalSupply(function(error, result) {
							let totalSupply = formatNumber(result)
							$('#totalSupply_1').text(totalSupply)
							$('#totalSupply_2').text(totalSupply)
						})
					
						targetToken.tokensLeft(function(error, result) {
							let tokensLeft = formatNumber(result)
							$('#tokensLeft_1').text(tokensLeft)
							$('#tokensLeft_2').text(tokensLeft)
						})
					
						targetToken.myBalance(function(error, result) {
							let myBalance = formatNumber(result)
							$('#myBalance_1').text(myBalance)
							$('#myBalance_2').text(myBalance)
						})
					}
				})
            })
        }
	})
	
    // get account balance in Ether
    web3.eth.getBalance(accountAddress, function(error, res) {
        if(error) {
            console.log(error)
        } else {
            let accountBalance = web3.fromWei(res, 'ether').toFixed(4) + ' ETH'
            $('#ethBalance').text(accountBalance)
        }
	})
}

loadPropertyData()

function buyTokens() {
	var propertyName = document.getElementById('nome').innerHTML

	// first we get number of tokens created
    factory.totalTokens(function(error, number) {

        // now we get tokens addresses
        for(var i = 0; i < number; i++) {
            factory.tokens(i, function(error, address) {

				// instance of target token
                var targetTokenAddress = address
				var targetToken = propertyTokenABI.at(targetTokenAddress)

				targetToken.name(function(error, name) {
					if(propertyName == name) {
						var ethAmount = $('#ethAmount').val()

						// amount of Ether to send on the transaction
						let txObject = {
						    'value' : web3.toWei(ethAmount, 'ether')
						}

						// call function buyTokens() from contract
						targetToken.buyTokens.sendTransaction(txObject, function(error, result){
						    if(error) {
						        console.log(error)
						    } else {
						        alert('Your token purchase transaction has been broadcasted.\ntx hash: ' + result)
						    }
						})
					}
				})
				
            })
        }
    })
}

function formatNumber(number) {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}