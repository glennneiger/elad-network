
var accountAddress = web3.toChecksumAddress(web3.eth.accounts[0])
var accountBalance

$('#accountAddress').text(accountAddress)

// get account balance in Ether
web3.eth.getBalance(accountAddress, function(error, res) {
    if(error) {
        console.log(error)
    } else {
        accountBalance = web3.fromWei(res, 'ether')
        $('#accountBalance').text(accountBalance.toFixed(4) + ' ETH')
    }
})