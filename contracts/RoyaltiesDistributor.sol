// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Drop.sol";

contract RoyaltiesDistributor {
    address public owner;

    struct RoyaltyRound {
        address drop;          // Address of the Drop contract
        uint256 periodStart;   // Unix timestamp for the period start
        uint256 periodEnd;     // Unix timestamp for the period end
        uint256 total;         // Total amount of tokens to be distributed
        mapping(uint256 => bool) claimed; // Tracks claimed status for token IDs
    }

    event RoyaltyRoundCreated(address indexed drop, uint256 periodStart, uint256 periodEnd, uint256 total);
    event RoyaltiesClaimed(address indexed holder, address indexed drop, uint256 period, uint256 tokenId);

    mapping(uint256 => RoyaltyRound) public royaltyRounds;
    uint256 public royaltyRoundCounter;
    address public paymentToken;

    constructor(address _paymentToken) {
        owner = msg.sender;
        paymentToken = _paymentToken;
    }

    function createRoyaltyRound(
        address drop,
        uint256 periodStart,
        uint256 periodEnd,
        uint256 total
    ) external onlyOwner {
        require(periodStart < periodEnd, "Invalid period timestamps");
        require(periodEnd > block.timestamp, "Period has already ended");
        royaltyRoundCounter++;
        
        RoyaltyRound storage round = royaltyRounds[royaltyRoundCounter];
        round.drop = drop;
        round.periodStart = periodStart;
        round.periodEnd = periodEnd;
        round.total = total;

        // Deposit tokens to the contract
        IERC20(paymentToken).transferFrom(msg.sender, address(this), total);

        emit RoyaltyRoundCreated(drop, periodStart, periodEnd, total);
    }


    function claim(uint256 period, address safeWallet) external {
        require(period > 0 && period <= royaltyRoundCounter, "Invalid royalty period");
        RoyaltyRound storage round = royaltyRounds[period];
        require(round.total > 0, "No tokens to distribute for this period");

        Drop dropContract = Drop(round.drop);
        uint256 tokenCount = dropContract.balanceOf(safeWallet);
        if(tokenCount>0){
            uint256 totalSupply = dropContract.totalSupply();
            uint256 tokensToClaim = 0;
            for (uint256 i = 0; i < tokenCount; i++) {
                uint256 tokenId = dropContract.tokenOfOwnerByIndex(safeWallet, i);
                if (!round.claimed[tokenId]) {
                    round.claimed[tokenId] = true;
                    tokensToClaim++;
                    emit RoyaltiesClaimed(safeWallet, round.drop, period, tokenId);
                }
            }
            uint256 royalties = (round.total * tokensToClaim) / totalSupply;
            IERC20(paymentToken).transfer(safeWallet, royalties);
        }
        
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
}
