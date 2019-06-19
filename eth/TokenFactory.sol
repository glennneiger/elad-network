pragma solidity ^0.5.0;

import "./ApproveCallAndFallback.sol";
import "./SafeMath.sol";
import "./ERC20Interface.sol";

contract PropertyToken is ERC20Interface {
    using SafeMath for uint;

    string public symbol;
    string public  name;
    uint8 public decimals;
    uint _totalSupply;

    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowed;

    function totalSupply() public view returns (uint) {
        return _totalSupply.sub(balances[address(0)]);
    }


    function balanceOf(address tokenOwner) public view returns (uint balance) {
        return balances[tokenOwner];
    }

    function approve(address spender, uint tokens) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }

    function allowance(address tokenOwner, address spender) public view returns (uint remaining) {
        return allowed[tokenOwner][spender];
    }


    function approveAndCall(address spender, uint tokens, bytes memory data) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        ApproveAndCallFallBack(spender).receiveApproval(msg.sender, tokens, address(this), data);
        return true;
    }

    // BEGINNING OF YAKKO'S MODIFICATIONS -------------------------------------------
    
    function propertyDetails() public view returns (string memory, uint, uint, uint) {
        return (name, _totalSupply, pricePerTokenInEther, tokensLeft);
    }
    
    uint rentalPaymentPool = 0;
    uint remainingInPool = 0;
    uint roundEnds;
    
    bool roundInProgress;
    
    uint paymentRound = 0;
    
    mapping(address => mapping(uint => bool)) receivedPaymentForRound;
    
    mapping(address => uint) totalPaid;
    
    function updatePrice(uint _priceInElad, uint _priceInEther) public onlyOwner {
        pricePerTokenInElad = _priceInElad;
        pricePerTokenInEther = _priceInEther;
    }
    
    function depositRent(uint _roundEnds) public payable onlyOwner {
        require(!roundInProgress);
        roundInProgress = true;
        roundEnds = block.timestamp + _roundEnds * 1 days;
        rentalPaymentPool += msg.value;
        remainingInPool = rentalPaymentPool;
        transactionsFrozen = true;
        salePaused = true;
        paymentRound++;
    }
    
    function endRound() public payable onlyOwner {
        require(roundInProgress && block.timestamp > roundEnds);
        salePaused = false;
        transactionsFrozen = false;
        roundInProgress = false;
        rentalPaymentPool = remainingInPool;
    }
    
    function receiveDividends() public {
        require(balances[msg.sender] > 0 && roundInProgress);
        require(!receivedPaymentForRound[msg.sender][paymentRound]);
        uint dividendsAllocated = ((10000*balances[msg.sender]/_totalSupply)*rentalPaymentPool)/10000;
        receivedPaymentForRound[msg.sender][paymentRound] = true;
        remainingInPool -= dividendsAllocated;
        msg.sender.transfer(dividendsAllocated);
    }
    
    modifier onlyOwner() {
        require(msg.sender == propertyOwner);
        _;
    }
    
    function userDetails(address _user) public view returns (string memory, uint, uint, uint) {
        return (name, balances[_user], pricePerTokenInEther, totalPaid[_user]);
    }
    
    Tracker public trackerContract;

    /**
     * @dev Creates new token following implementation
     * @param _priceInElad Defines price of property tokens in ELAD tokens
     * @param _priceInEther Defines price of property tokens in Ether
     * @param _fallback Establishes address to receive payments if owner becomes unavailable
    */
    constructor(
        string memory _symbol, 
        string memory _name, 
        address payable _owner,
        uint _supply, 
        uint _priceInElad,
        uint _priceInEther,
        address payable _fallback,
        address _tracker
        ) public 
        {
            symbol = _symbol;
            name = _name;
            decimals = 18;
            propertyOwner = _owner;
        
            // Setting fallbackAddress
            fallbackAddress = _fallback;

            pricePerTokenInElad = _priceInElad;
            pricePerTokenInEther = _priceInEther;

            _totalSupply = _supply;
            tokensLeft = _totalSupply;
            
            trackerContract = Tracker(_tracker);
        }
    
    // Controls the token contract
    address payable propertyOwner;
    
    // Takes over if propertyOwner cannot access account
    address payable fallbackAddress;
    
    uint public tokensLeft;

    // Transactions can only happen if transactionsFrozen == false 
    // Useful for legal reasons
    bool public transactionsFrozen = false;
    
    // Purchases can only happen if transactionsFrozen == false 
    // Useful for legal reasons
    bool public salePaused = false;
    
    uint public pricePerTokenInElad;
    uint public pricePerTokenInEther;

    function buyWithEther() public payable {
        require (tokensLeft > 0);
        uint valueSent = msg.value;
        uint tokensBought = valueSent/pricePerTokenInEther;
        require (valueSent % pricePerTokenInEther == 0);
        balances[msg.sender] = balances[msg.sender].add(tokensBought);
        propertyOwner.transfer(valueSent);
        tokensLeft = tokensLeft.sub(tokensBought);
        addInvestment(msg.sender);
        totalPaid[msg.sender] = totalPaid[msg.sender].add(tokensBought*pricePerTokenInEther);
    }    
    
    EladTokenContract EladToken = EladTokenContract(0x44acC3F509CbEAc302B1C656D393e30858e07018);
    
    function buyWithElad(uint _numberToBuy) public {
        uint totalPrice = _numberToBuy * pricePerTokenInElad;
        EladToken.buyPropertyTokens(totalPrice, propertyOwner);
        addInvestment(msg.sender);
        // totalPaid[msg.sender] = totalPaid[msg.sender].add(tokensBought*pricePerTokenInEther);
    }

    // fallbackAddress activates this if propertyOwner is unavailable
    // Ideally both addresses are owned by the same entity
    function activateFallback(address payable _ad) public {
        require(msg.sender == fallbackAddress);
        propertyOwner = fallbackAddress;
        fallbackAddress = _ad;
    }
    
    // propertyOwner assigns new owner
    function changeOwnership(address payable _newOwner) public onlyOwner {
        propertyOwner = _newOwner;
    }
    
    // propertyOwner selects new fallbackAddress
    function assignNewFallback(address payable _newFallback) public onlyOwner {
        fallbackAddress = _newFallback;
    }
    
    // Freezes all token transfers
    function freezeTransfers(bool _option) public onlyOwner {
        transactionsFrozen = _option;
    }
    
    // Pauses the sale
    function pauseSale(bool _option) public onlyOwner {
        salePaused = _option;
    }
    
    function transfer(address to, uint tokens) public returns (bool success) {
        // Added requirement for transactions to not be frozen
        require(!transactionsFrozen);
        balances[msg.sender] = balances[msg.sender].sub(tokens);
        balances[to] = balances[to].add(tokens);
        emit Transfer(msg.sender, to, tokens);
        return true;
    }
    
    function transferFrom(address from, address to, uint tokens) public returns (bool success) {
        // Added requirement for transactions to not be frozen
        require(!transactionsFrozen);
        balances[from] = balances[from].sub(tokens);
        allowed[from][msg.sender] = allowed[from][msg.sender].sub(tokens);
        balances[to] = balances[to].add(tokens);
        emit Transfer(from, to, tokens);
        return true;
    }
    
    function addInvestment(address _user) internal {
        trackerContract.addNewInvestment(_user, address(this));
    }
    
    

}

contract Tracker {
    
    function addNewInvestment(address _user, address _toAdd) external  { }
    
}


contract EladTokenContract {
    
    function buyPropertyTokens(uint _price, address _owner) external {}
    
}

// Creates a new PropertyToken
contract PropertyFactory {
    
    address public owner;
    address public tracker;
    
    constructor() public {
        owner = msg.sender;
    }
    
    function changeOwnership(address _newOwner) public {
        require(msg.sender == owner);
        owner = _newOwner;
    }

    mapping(address => address[]) public userContracts;
    mapping(address => bool) public isProperty;

    event NewToken(address _contract);

    // Forwards the call to the constructor of the PropertyToken
    function createProperty(
        string memory _symbol, 
        string memory _name,
        uint _priceInEther, 
        uint _priceInElad,
        uint _supply,
        address payable _fallback
        )
        public 
        {
        
            PropertyToken tokenContract = new PropertyToken(
                _symbol, 
                _name,
                // msg.sender is passed as a parameter so that PropertyFactory is not the owner of PropertyToken
                msg.sender,
                _supply,
                _priceInElad,
                _priceInEther,
                _fallback,
                tracker
                );
            
            
            userContracts[msg.sender].push(address(tokenContract));
            isProperty[address(tokenContract)] = true;
            emit NewToken(address(tokenContract));
    }
    
    function allUserContracts(address _user) public view returns (address[] memory) {
        return userContracts[_user];
    }
    
    function isPropertyContract(address _ad) external view returns (bool) {
        return isProperty[_ad];
    }
    
    function setTracker(address _tracker) public {
        require(msg.sender == owner);
        tracker = _tracker;
    }
}