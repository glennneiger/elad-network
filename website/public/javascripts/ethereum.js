var accountAddress = web3.toChecksumAddress(web3.eth.accounts[0])
var accountBalance

function setAccountDetais(address) {
    $('#accountAddress').text(address)
    
    // get account balance in Ether
    web3.eth.getBalance(address, function (error, res) {
        if (error) {
            console.log(error)
        } else {
            accountBalance = web3.fromWei(res, 'ether')
            $('#accountBalance').text(accountBalance.toFixed(4) + ' ETH')
        }
    })
}

setAccountDetais(accountAddress)

/**
 * Detects if account was changed on MetaMask and updates user's account info
 * https://ethereum.stackexchange.com/questions/42768/how-can-i-detect-change-in-account-in-metamask
 */
window.ethereum.on('accountsChanged', function(accounts) {
    setAccountDetais(accounts[0])
})

/**
 * This also works, but it's inefficient
 */
// setInterval(function() {
//     var account = web3.toChecksumAddress(web3.eth.accounts[0])
//     if(account !== accountAddress) {
//         setAccountDetais(account)
//     }
// }, 100)
