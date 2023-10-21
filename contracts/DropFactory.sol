// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Import the interface for the Drop contract
import "./Drop.sol";

contract DropFactory {
    address public owner;
    event DropCreated(string indexed slug, address indexed dropAddress);

    // Registry of deployed Drop contract addresses, lookup by slug
    mapping(string => address) public dropRegistry; 
    address public paymentToken;

    constructor(address _paymentToken) {
        paymentToken = _paymentToken;
        owner = msg.sender;
    }

    function createDrop(
        string memory name,
        string memory slug,
        string memory ipfsURI,
        uint256 mintStart,
        uint256 mintEnd,
        uint256 price,
        uint256 maxSupply
    ) external onlyOwner {
        // Deploy a new Drop contract and get its address
        address newDropAddress = address(
            new Drop(
                name,
                slug,
                ipfsURI,
                mintStart,
                mintEnd,
                //paymentToken
                price,
                maxSupply,
                owner
            )
        );

        // Add the deployed Drop contract address to the registry
        dropRegistry[slug] = newDropAddress;

        emit DropCreated(slug, newDropAddress);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

}