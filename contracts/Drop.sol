// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract Drop is ERC721Enumerable {
    address public owner;
    
    string public dropName;
    string public slug;
    uint256 public mintStart;
    uint256 public mintEnd;
    // commenting out paymentToken, as it will not be used for the PoC.
    // reason: Our users' wallets are Safes, and we process all their transactions through a Relay.
    //         Unfortunately this makes it impossible to use EURe, which currently lacks EIP2612 implementation of permit()
    // address public paymentToken;
    uint256 public price;
    string public sharedImageURI;
    uint256 public maxSupply;

    constructor(
        string memory _dropName,
        string memory _slug,
        string memory _ipfsURI,
        uint256 _mintStart,
        uint256 _mintEnd,
        // address _paymentToken,
        uint256 _price,
        uint256 _maxSupply,
        address _owner
    ) ERC721(_dropName, "DROP") {
        dropName = _dropName;
        slug = _slug;
        sharedImageURI = _ipfsURI;
        mintStart = _mintStart;
        mintEnd = _mintEnd;
        // paymentToken = _paymentToken;
        price = _price;
        maxSupply = _maxSupply;
        owner = _owner;
    }

    function mint(uint256 numberOfTokens, address destination) external {
        require(block.timestamp >= mintStart, "Mint not started yet");
        require(block.timestamp <= mintEnd, "Mint has ended");
        require(numberOfTokens >= 1 && numberOfTokens <= 5, "Invalid number of tokens");
        require(totalSupply() + numberOfTokens <= maxSupply, "Max supply exceeded"); // Check maximum supply

        /*
        require(
            IERC20(paymentToken).balanceOf(destination) >= price * numberOfTokens,
            "Insufficient balance"
        );

        // Transfer the payment tokens from the destination to this contract
        IERC20(paymentToken).transferFrom(destination, address(this), price * numberOfTokens);
        */

        for (uint256 i = 0; i < numberOfTokens; i++) {
            _mint(destination, totalSupply() + 1);
        }
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(
            'data:application/json;base64,', Base64.encode(bytes(abi.encodePacked(
                '{"name":"',
                dropName,' ',uint2str(tokenId), 
                '", "image":"ipfs://',
                sharedImageURI,
                '"}'
                ))))
            );
    }

    function walletOfOwner(address _owner) public view returns (uint256[] memory){
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function uint2str(uint256 _i) internal pure returns (string memory str){
        if (_i == 0){
            return "0";
        }
        uint256 j = _i;
        uint256 length;
        while (j != 0){
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        j = _i;
        while (j != 0){
            bstr[--k] = bytes1(uint8(48 + j % 10));
            j /= 10;
        }
        str = string(bstr);
    }

    /*
    function withdrawTokens(address to, uint256 amount) external onlyOwner {
        IERC20(paymentToken).transfer(to, amount);
    }
    */
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
}
