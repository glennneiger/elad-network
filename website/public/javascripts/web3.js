
// var accountAddress

window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
            web3.eth.sendTransaction({ });
        } catch (error) {
            //web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
            web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/d81a3501521247ce9a510f4e8317219b"));
        }
    }
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        web3.eth.sendTransaction({/*...*/}); 
    }
    else {
        // web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
        web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/d81a3501521247ce9a510f4e8317219b"));
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
})


// GANACHE
// web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

/*
$(".noreload").click(function(event) {
    event.preventDefault();
})
*/

//account = ethereum.selectedAddress; PRODUCTION

// account = web3.eth.accounts[0]; // GANACHE ONLY
