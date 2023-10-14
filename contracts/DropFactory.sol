// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

// Import the interface for the Drop contract
import "./Drop.sol";

contract DropFactory is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    event DropCreated(string indexed slug, address indexed dropAddress);

    // Registry of deployed Drop contract addresses, lookup by slug
    mapping(string => address) public dropRegistry; 
    address public paymentToken;

    constructor(address _paymentToken) {
        paymentToken = _paymentToken;
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function createDrop(
        string memory name,
        string memory slug,
        string memory artist,
        uint256 tierCount, // how many tiers this drop have
        uint256[] memory tierPrices, // the price for each tier
        uint256[] memory tierSupplies, // supply for each tier
        uint256[] memory streamingRoyaltyShares, // for 1% input 100 , for 0.01% input 1
        string[] memory ipfsImageLinks, // ipfs uri for the NFT image corresponding to each tier
        uint256 mintStart,
        uint256 mintEnd
    ) external onlyRole(ADMIN_ROLE) {
        // Deploy a new Drop contract and get its address
        address newDropAddress = address(
            new Drop(
                name,
                slug,
                artist,
                tierCount,
                tierPrices,
                tierSupplies,
                streamingRoyaltyShares,
                ipfsImageLinks,
                mintStart,
                mintEnd,
                paymentToken
            )
        );

        // Add the deployed Drop contract address to the registry
        dropRegistry[slug] = newDropAddress;

        emit DropCreated(slug, newDropAddress);
    }

}
