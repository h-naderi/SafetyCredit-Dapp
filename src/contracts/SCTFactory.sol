/**@title: SafetyCredit Dapp: incentive management of construction safety using blockchain-enabled
 *         tokens and vision-based techniques
 * @Version: 3.0
 * @author: Hossein Naderi
 */

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SCTFactory is ERC20, Ownable{

    //Only address allowed to call this contract and mint SCT.
    mapping (address => bool) controllers;

    //Initialization of ERC20 contract and definition of token name and symbol.
    constructor() ERC20("SafetyCreditToken", "SCT"){}

    //definition of decimals for tokens.
    function decimals() override public pure returns (uint8) {
    return 0;
    }

    function mint(address to, uint256 amount) external{
        require(controllers[msg.sender], "Only controllers can access to the mint function");
        _mint(to, amount);
    }

    //Only address allowed to call and write this contract.
    function setController(address controller) external onlyOwner{
        controllers[controller]=true;
    }
}