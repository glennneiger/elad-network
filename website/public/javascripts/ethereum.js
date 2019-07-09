
var accountAddress
var accountBalance

window.addEventListener('load', async () => {
    // if (window.ethereum) {
    //     window.web3 = new Web3(ethereum);
    //     try {
    //         await ethereum.enable();
    //         web3.eth.sendTransaction({ });
    //     } catch (error) {
    //         //web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    //         web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/d81a3501521247ce9a510f4e8317219b"));
    //     }
    // }
    // else if (window.web3) {
    //     window.web3 = new Web3(web3.currentProvider);
    //     web3.eth.sendTransaction({/*...*/}); 
    // }
    // else {
    //     // web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    //     web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/d81a3501521247ce9a510f4e8317219b"));
    //     console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    // }

    web3.eth.getAccounts(function(error, result) {
        if(error) {
            console.log('There was an error retrieving the user\'s Ethereum account address')
            console.log(error)
        } else {
            accountAddress = String(result)
            $('#accountAddress').text(accountAddress)
            console.log(accountAddress)

            // get account balance in Ether
            web3.eth.getBalance(accountAddress, function(error, res) {
                if(error) {
                    console.log(error)
                } else {
                    accountBalance = web3.fromWei(res, 'ether')
                    console.log(res)

                    $('#accountBalance').text(accountBalance.toFixed(4) + ' ETH')
                }
            });
        }
    })

    // web3.eth.getBalance(accountAddress, function(error, result) {
    //     if(error) {
    //         console.log('There was an error retrieving the user\'s Ethereum account balance')
    //         console.log(error)
    //     } else {
    //         // $('#accountData').text(accountAddress + ' | ' + result)
    //         console.log()
    //     }
    // })
})