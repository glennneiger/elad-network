pragma solidity >=0.5.0 <0.6.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/math/SafeMath.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/token/ERC20/IERC20.sol";

contract PropertyToken is IERC20 {
    using SafeMath for uint256;

    string public symbol;
    string public name;
    uint8 public decimals;
    uint256 private _totalSupply;
    uint256 public tokensBought;
    address payable public owner;

    mapping(address => uint256) private _balances;
    mapping (address => mapping (address => uint256)) private _allowances;

    constructor(string memory _symbol, string memory _name, uint256 _initialSupply, address payable _owner) public {
        symbol = _symbol;
        name = _name;
        decimals = 0;
        _totalSupply = _initialSupply * 10**uint(decimals);
        owner = _owner;
        _balances[_owner] = _totalSupply;
        emit Transfer(address(0), _owner, _totalSupply);
    }
    
    /**
     * @dev See `IERC20.totalSupply`.
     */
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev See `IERC20.balanceOf`.
     */
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    /**
     * @dev See `IERC20.transfer`.
     *
     * Requirements:
     *
     * - `recipient` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address recipient, uint256 amount) public returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }
    
    /**
     * @dev See `IERC20.allowance`.
     */
    function allowance(address tokenOwner, address spender) public view returns (uint256) {
        return _allowances[tokenOwner][spender];
    }
    
    /**
     * @dev See `IERC20.approve`.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(address spender, uint256 value) public returns (bool) {
        _approve(msg.sender, spender, value);
        return true;
    }

    /**
     * @dev See `IERC20.transferFrom`.
     *
     * Emits an `Approval` event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of `ERC20`;
     *
     * Requirements:
     * - `sender` and `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `value`.
     * - the caller must have allowance for `sender`'s tokens of at least
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, _allowances[sender][msg.sender].sub(amount));
        return true;
    }

    /**
     * @dev Moves tokens `amount` from `sender` to `recipient`.
     *
     * This is internal function is equivalent to `transfer`, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a `Transfer` event.
     *
     * Requirements:
     *
     * - `sender` cannot be the zero address.
     * - `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _balances[sender] = _balances[sender].sub(amount);
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(sender, recipient, amount);
    }
    
    /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner`s tokens.
     *
     * This is internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an `Approval` event.
     *
     * Requirements:
     *
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(address tokenOwner, address spender, uint256 value) internal {
        require(tokenOwner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[tokenOwner][spender] = value;
        emit Approval(tokenOwner, spender, value);
    }
    
    /**
     * @dev Implements the buy property token functionality.
     *
     * Receives ether from investor, moves tokens from owner to investor.
     * Ether received is transferred to contract owner.
     *
     * Emits a `Transfer` event.
     *
     * Requirements:
     *
     * - cannot be called by contract owner.
     * - amount of ether should be at least 1 Finney.
     * - amount of tokens to buy must be less or equal contract owner's balance.
     */
    function buyTokens() public payable {
        require(msg.sender != owner, "Caller can't be contract owner");
        
        uint256 exchangeRate = 1000;
        uint256 tokens = exchangeRate.mul(msg.value).div(1 ether);
        
        require(tokens > 0, "Amount of ether sent less than 1 Finney");
        require(tokens <= _balances[owner], "Contract owner doesn't have enough balance");
        
        _transfer(owner, msg.sender, tokens);
        owner.transfer(msg.value);
        
        tokensBought += tokens;
        
        emit Transfer(owner, msg.sender, tokens);
    }
    
    /**
     * @dev Returns token balance of calling account
     */
    function myBalance() public view returns (uint balance) {
        return _balances[msg.sender];
    }
    
    /**
     * @dev Returns available amount of tokens to buy
     */
    function tokensLeft() public view returns(uint256) {
        return totalSupply() - tokensBought;
    }
    
    /**
     * @dev Returns some property details
     */
    function propertyDetails() public view returns(string memory, string memory, uint256, uint256, uint256) {
        return (name, symbol, _totalSupply, tokensBought, tokensLeft());
    }
    
    /**
     * @dev Doesn't accept ether
     */
    function () external payable {
        revert();
    }
    
}

contract PropertyTokenFactory {
    event NewToken(address _contract);
    
    address[] public tokens;
    uint256 private numberOfTokens;

    function createProperty(string memory _symbol, string memory _name, uint256 _supplyOfTokens, address payable _owner) public returns (address) {
        PropertyToken tokenContract = new PropertyToken(_symbol, _name, _supplyOfTokens, _owner);
        
        tokens.push(address(tokenContract));
        numberOfTokens++;
        
        emit NewToken(address(tokenContract));
    }
    
    function totalTokens() public view returns(uint256) {
        return numberOfTokens;
    }
}