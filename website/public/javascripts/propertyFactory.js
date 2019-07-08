// var account

// function setAddress() {
//     account = web3.toChecksumAddress(web3.eth.accounts[0])
// }

// setAddress()

var factoryContractABI = [{"constant":false,"inputs":[{"name":"_symbol","type":"string"},{"name":"_name","type":"string"},{"name":"_supplyOfTokens","type":"uint256"},{"name":"_owner","type":"address"}],"name":"createProperty","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_contract","type":"address"}],"name":"NewToken","type":"event"}]

var factoryContractAddress = "0x59e6b19bfb6be43c32bbbeb9fcd3446648001cbb"

var factoryContract = web3.eth.contract(factoryContractABI).at(factoryContractAddress)

// function createProperty(string memory _symbol, string memory _name, uint _supplyOfTokens, address _owner)

function createNew() {
    // var symbol = document.getElementById('_tokenSymbol').value;
    // var name = document.getElementById('_propertyName').value;
    // var supply = document.getElementById('_totalSupply').value;

    var txObject = {
        value: web3.toWei(0, 'ether'),
        data: web3.toHex(name),
        gas: 300000
    }

    console.log(txObject)

	factoryContract.createProperty.sendTransaction(symbol, name, supply, account, txObject, function (error, txHash) {
        if (error) {
            console.log('There was an error with the transaction:')
            console.log(error)
        } else {
			console.log(txHash);
			window.alert("Property being created, please wait, MOTHAFUCKA")
        }
    }))
    console.log('\nPASSOU POR AQUI\n')
}