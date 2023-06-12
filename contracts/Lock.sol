// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
// import "hardhat/console.sol";
// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Lock {

    struct CreateAccount{
        address account;
        uint8 reputation_score;
        uint createdAt;
        string handle;
        string profession;
        string Country;
        string timezone;
    }

    mapping (address => CreateAccount) public _owners;

    string name = "ajay kumar yadav darshan nagar ayodhya";

    function set(
        address account,
        uint8 reputation_score,
        uint createdAt,
        string memory _handle,
        string memory _profession,
        string memory Country,
        string memory timezone
    ) public{
        _owners[msg.sender].account = account;
        _owners[msg.sender].reputation_score = reputation_score;
        _owners[msg.sender].createdAt = createdAt; 
        _owners[msg.sender].handle = _handle;
        _owners[msg.sender].profession = _profession;
        _owners[msg.sender].Country = Country;
        _owners[msg.sender].timezone = timezone;
    }

    function writeValueToStorage(uint slot, uint256 value) public {
        assembly {
            // Store the value in storage slot 0
            mstore(slot, value)
        }
    }


    function getDataFromSlotDirectly(bytes32 slot) public view returns(bytes32 result) {
        assembly{
            result := sload(slot)
        }
    }

    function getNextSlot(bytes memory _currentSlot) public view returns(bytes memory nextslot){
            uint value = uint256(bytesToUint(_currentSlot)) + 1;
            nextslot = uintToBytes(value);
            
        
    }

    function bytesToUint(bytes memory data) private pure returns (uint256) {
        uint256 value;
        assembly {
            value := mload(add(data, 32))
        }
        return value;
    }

    function uintToBytes(uint256 value) private pure returns (bytes memory) {
            bytes memory result = new bytes(32);
            assembly {
                mstore(add(result, 32), value)
            }
            return result;
    }



    function getDataFromSlotDirectlyUintType(uint slot) public view returns(uint result){
        assembly{
            result := sload(slot)
        }
    }

    function getslotForMapping(address _user, uint slot) public view returns(bytes32 hash) {
        assembly{
            mstore(0,_user)
            mstore(32, slot)
            hash := keccak256(0,64)
        }
    }

    function getStorageValue(uint num, uint slot) public view returns (uint result) {
        assembly {
            // Store num in memory scratch space (note: lookup "free memory pointer" if you need to allocate space)
            mstore(0, num)
            // Store slot number in scratch space after num
            mstore(32, slot)
            // Create hash from previously stored num and slot
            let hash := keccak256(0, 64)
            // Load mapping value using the just calculated hash
            result := sload(hash)
        } 
}

    // function set(uint _val, uint8 _val8) public{

    //         assembly {
    //         myVariable := sload(
                
    //             keccak256(abi.encodePacked(_val,3));
    //         )
    //     }
    // }
}
