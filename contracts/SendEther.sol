//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SendEther {
    function send_ether(address payable recipient) public payable {
        recipient.transfer(msg.value);
    }

    function returnHelloWorld() public view returns (string memory) {
        return "Hello world";
    }
}
