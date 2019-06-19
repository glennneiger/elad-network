pragma solidity^0.5.0;

contract PropertyFactory {

    function isPropertyContract(address _ad) external view returns (bool) {}
}

contract Tracker {
    
    PropertyFactory public factoryContract;
    
    constructor(address _factory) public {
        factoryContract = PropertyFactory(_factory);
    }
    
    modifier onlySelect() {
        require(factoryContract.isPropertyContract(msg.sender));
        _;
    }
    
    event UserInvestments(address[]);
    
    mapping(address => address[]) userInvestments;
    
    function allUserInvestments(address _user, uint _index) public view returns (address) {
        return(userInvestments[_user][_index]);
    }
    
    function investmentsArrayLength(address _user) public view returns (uint) {
        return userInvestments[_user].length;
    }
    
    
    
    function addNewInvestment(address _user, address _toAdd) external onlySelect {
        bool exists = false;
        if (userInvestments[_user].length == 0) {
            userInvestments[_user].push(_toAdd);
        }
        else {
        for (uint i = 0; i < userInvestments[_user].length; i++) {
            if (userInvestments[_user][i] == _toAdd) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            userInvestments[_user].push(_toAdd);
        }
        }
    }
}