/**@title: SafetyCredit Dapp: incentive management of construction safety using blockchain-enabled
 *         tokens and vision-based techniques
 * @Version: 3.0
 * @author: Hossein Naderi
 */
     
// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

pragma solidity ^0.8.0;

contract SCNFTMinter is ERC721Enumerable, Ownable {

    //Define variables for the acceptable token.
    IERC20 paytoken;
    uint256 costvalue;

    using Strings for uint256;
    //URI, containing the latest reports and credintials of applicants
    string public URI;
    string public baseExtension = ".json";
    uint256 public maxSupply = 1000;
    bool public paused = false;

    constructor() ERC721("SafetyCredit Collection", "SC.NFT") {}

    function setAllowableToken(
        IERC20 _paytoken,
        uint256 _costvalue
    ) public onlyOwner {
                paytoken= _paytoken;
                costvalue= _costvalue;
            }
    
    function setURI(string memory _URI) external onlyOwner(){
        URI=_URI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
    return URI;
    }

    function mint(address _to) public payable {
        uint256 cost;
        cost = costvalue;
        uint256 supply = totalSupply();
        require(!paused);
 
        require(supply + 1 <= maxSupply);
            
            if (msg.sender != owner()) {
            require(msg.value == cost, "Not enough balance to complete transaction.");
            }
            
                paytoken.transferFrom(msg.sender, address(this), cost);
                _safeMint(_to, supply + 1);
        }

        function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
        {
            uint256 ownerTokenCount = balanceOf(_owner);
            uint256[] memory tokenIds = new uint256[](ownerTokenCount);
            for (uint256 i; i < ownerTokenCount; i++) {
                tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
            }
            return tokenIds;
        }
    
        
        function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory) {
            require(
                _exists(tokenId),
                "ERC721Metadata: URI query for nonexistent token"
                );
                
                string memory currentBaseURI = _baseURI();
                return
                bytes(currentBaseURI).length > 0 
                ? string(abi.encodePacked(currentBaseURI))
                : "";
        }
        // only owner
        
        
        
        function setBaseExtension(string memory _newBaseExtension) public onlyOwner() {
            baseExtension = _newBaseExtension;
        }
        
        function pause(bool _state) public onlyOwner() {
            paused = _state;
        }
        
        function withdraw() public payable onlyOwner() {
            paytoken.transfer(msg.sender, paytoken.balanceOf(address(this)));
        }
}