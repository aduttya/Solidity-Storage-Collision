// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
// import "hardhat/console.sol";
// Uncomment this line to use console.log
import "hardhat/console.sol";

library StorageCollision{
    
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
}