// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Ownable {
  address private _owner;    
  mapping(address => bool) public  isManagers;  
  mapping(uint =>address) public  managers;  
  uint public managerID;
  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );
  constructor() {
    _owner = msg.sender;
    addManager(msg.sender);
    emit OwnershipTransferred(address(0), _owner);
  }
  function owner() public view returns(address) {
    return _owner;
  }
  modifier onlyOwner() {
    require(isOwner(),"Sender not authorized.");
    _;
  }
  modifier onlyManagers() {
        require(isManager()," You not is a Manager" );
        _;
    }

  function isManager() public view returns (bool) {
    return isManagers[msg.sender];
  }
  function isOwner() public view returns(bool) {
    return msg.sender == _owner;
  }
 function addManager(address _newManager) public onlyOwner {
        uint index = managerID++;
        managers[index] = _newManager;
        isManagers[_newManager] = true;
    }
  function getAllManager() public view returns (address[] memory) {
          address[]  memory allManager  = new address[](managerID);
          for (uint i = 0; i < managerID; i++) {
              address manager = managers[i];
              allManager[i]= manager;
          }
          return allManager;
  }
  function renounceOwnership() public onlyOwner {
    emit OwnershipTransferred(_owner, address(0));
    _owner = address(0);
  }
  function transferOwnership(address newOwner) public onlyOwner {
    _transferOwnership(newOwner);
  }
  function _transferOwnership(address newOwner) internal {
    require(newOwner != address(0));
    emit OwnershipTransferred(_owner, newOwner);
    _owner = newOwner;
  }
}
