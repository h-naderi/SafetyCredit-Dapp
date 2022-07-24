/**@title: SafetyCreditTokens: incentive management of construction safety using blockchain-enabled
 *         tokens and vision-based techniques
 * @Version: 2.5
 * @author: Hossein Naderi-Alireza Shojaei
    
    /*@notice:
     * This smart contract is a ERC20 contract developed to create SafetyCreditTokens (SCTs).
     *This smart contract is developed as a prototype for the SCT research project.
     *We are in the prototyping stage for this smart contract, and developers are open to any comments or suggestions.
     *Please don't implement this smart contract in real cases until official release
     */

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract SCTFactory is ERC20, ERC20Burnable, Ownable{

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

    function burnfrom(address account, uint256 amount) public{
        if (controllers[msg.sender]){
            _burn(account, amount);
        }
        else{
            super.burnFrom(account, amount);
        }
    }

    //Only address allowed to call and write this contract.
    function setController(address controller) external onlyOwner{
        controllers[controller]=true;
    }
}