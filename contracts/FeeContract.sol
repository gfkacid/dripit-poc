// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FeeContract is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    // Platform fee percentage
    uint256 public platformFeePercentage;

    // Address where fees are collected
    address public feeCollectionAddress;

    constructor(uint256 _platformFeePercentage, address _feeCollectionAddress) {
        platformFeePercentage = _platformFeePercentage;
        feeCollectionAddress = _feeCollectionAddress;
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function setPlatformFeePercentage(uint256 percentage) external onlyRole(ADMIN_ROLE) {
        platformFeePercentage = percentage;
    }

    function withdrawFees() external onlyRole(ADMIN_ROLE) {
        // Calculate and transfer platform fees to the fee collection address
        // ...
    }
}
