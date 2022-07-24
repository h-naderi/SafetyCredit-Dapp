/**@title: SafetyCreditTokens: incentive management of construction safety using blockchain-enabled
 *         tokens and vision-based techniques
 * @Version: 2.5
 * @author: Hossein Naderi-Alireza Shojaei
    
    /*@notice:
     * This smart contract is developed to interact with stakeholders and other smart contracts
     *This smart contract is developed as a prototype for the SCT research project.
     *This smart contract in prototyping stage and developers are open to any comments and suggestion.
     *Please don't use this smart contract in real cases until official release
     */

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

/**Section1:************************************************************************************ 
 *Import other contracts
 */
import '@chainlink/contracts/src/v0.8/ChainlinkClient.sol';
import '@chainlink/contracts/src/v0.8/ConfirmedOwner.sol';
import './SCTFactory.sol';

contract SafetyCreditOperator is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

/**Section2:************************************************************************************ 
 *Define variables
 */
    /*@notice:
    /* Vault keeps essential information of contractors.
    */
    struct vault{
        bool isRegistered; //to call this varable go to section 4.1, apply vaultCallBool() function
        uint totalClaims; //to call this varablego to section 4.1, apply vaultCallInt() function and id=1
        uint256[] safetyCredits; //to call this varablego to section 4.1, apply vaultCallInt() function and id=2 and arrayIndex
        uint256 creditLength; //to call this varablego to section 4.1, apply vaultCallInt() function and id=3
        uint totalCIDs; //to call this varablego to section 4.1, apply vaultCallInt() function and id=4
        string lastCID; //to call this varablego to section 4.1, apply vaultCallString() function
        uint availableTokens; //to call this varablego to section 4.1, apply vaultCallInt() function and id=5
        uint totalEarnedTokens; //to call this varablego to section 4.1, apply vaultCallInt() function and id=6
    }


    SCTFactory SCT; //reference to the SCTFactory contract.
    uint public totalRegister=0;
    bool public isTokenFactoryRegistered=false;
    string CID;
    bytes32 private jobId; // jobId and fee are defined as components of the decentralized oracle(chainlink).
    uint256 private fee;
    address contractOwner;
    address applicantAddress;
    uint256 private minPerformance;


    mapping (address=> vault) public vaults;
    event claimed(address claimer, uint amount);

/**Section3:************************************************************************************ 
 *Build constructor
 */
    /*@notice:
     * This smart contract are developed for testing on Rinkeby Testnet. Address of link token, 
     * Oracle and jobId are essential for the implementation of decentralized oracle (chainlink)
     * These details can be found on https://chain.link
     * Rinkeby Testnet details:
     * Smart Contract Address of Link Token: 0x01BE23585060835E02B77ef475b0Cc51aA1e0709
     * Oracle: 0xf3FBB7f3391F62C8fe53f89B41dFC8159EE9653f (Chainlink DevRel)
     * jobId: ca98366cc7314957b8c012c72f05aeeb
     */
    constructor() ConfirmedOwner(msg.sender) {
        contractOwner=msg.sender;
        setChainlinkToken(0x01BE23585060835E02B77ef475b0Cc51aA1e0709);
        setChainlinkOracle(0xf3FBB7f3391F62C8fe53f89B41dFC8159EE9653f);
        jobId = 'ca98366cc7314957b8c012c72f05aeeb';
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
    }
/**Section4.1:************************************************************************************ 
 * set least requirement and call Safety Performance
 */
    /*@notice:
     * Apply this function to set the amount of performance required for rewarding tokens.
     * @param:
     * _leastPerformance: a integer input as minimum safety performance.
     */
    function setLeastPerformance(uint _minPerformance) external onlyOwner(){
        minPerformance=_minPerformance;
    }
    /*@notice:
     * Apply this function to check the history of safe performance submitted by SCV through chained IPFS content.
     * @param:
     * _registeredAddress: asking for the address of account which is requested for safety performance
     * _historyIndex: choose 0 for reviewing first safety performance and choose bigger number for more recent reports.
     *    Last report can be seen by considering (creditLength-1) as _historyIndex.
     */
     function callSafetyPerfomance (address _registeredAddress, uint256 _historyIndex) onlyOwner public view returns(uint){   
            return vaults[_registeredAddress].safetyCredits[_historyIndex];
    }
/**Section4.2:************************************************************************************ 
 * Registration
 */
    /*@notice:
     * This function is applied by owner to register contractors.
     * default values are set for variables within the vault
     */
    function registerApplicants(address[] memory _registerList) public onlyOwner(){
        uint _length= _registerList.length;
        totalRegister += _length;
        for (uint i=0; i<_length; i++){
            address _applicantAddress= _registerList[i];
            require(vaults[_applicantAddress].isRegistered!=true, "Already registered!");
            vaults[_applicantAddress].isRegistered=true;
            vaults[_applicantAddress].creditLength= vaults[_applicantAddress].safetyCredits.length;
            vaults[_applicantAddress].totalClaims=0;
            vaults[_applicantAddress].totalCIDs=0;
            vaults[_applicantAddress].lastCID= "null";
            vaults[_applicantAddress].availableTokens=0;
            vaults[_applicantAddress].totalEarnedTokens=0;
        }
    }

    function setTokenFactory(SCTFactory _sct) public onlyOwner(){
        SCT= _sct;
        isTokenFactoryRegistered=true;
    }

/**Section4.3:************************************************************************************ 
 * Retrieve safety performance reports submitted by SCVs.
 */
    /*@notice:
     * This function is applied by the owner to set CIDs (addresses of reports uploaded on immutable IPFS)
     */
    function setCID(string memory _CID, address _regiteredAddress) external{
        require(vaults[_regiteredAddress].isRegistered=true, "Only registered users have access to setCID function");
        applicantAddress=_regiteredAddress;
        vaults[_regiteredAddress].totalCIDs += 1;
        vaults[_regiteredAddress].lastCID=_CID;
        CID=_CID;
        requestSafetyPerformance();
    }

    /*@notice:
     * Create a Chainlink GET request to retrieve safety performance values
     * To apply this function we need to fund this smart contract with LINK tokens.
     * for more details go to https://docs.chain.link/docs/advanced-tutorial/
     */
 function requestSafetyPerformance() private returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        req.add('get', CID);
        req.add('path', 'SCVisionReport,safetyPerformance'); 

        int256 timesAmount = 1;
        req.addInt('times', timesAmount);

        // Sends the request
        return sendChainlinkRequest(req, fee);
    }

    /*@notice:
     * Receive the response in the form of uint256
     * Initializing the evaluation of tokens for the address of contractors
     */
    function fulfill(bytes32 _requestId, uint256 _volume) public recordChainlinkFulfillment(_requestId) {
        vaults[applicantAddress].safetyCredits.push(_volume);
        assessAvailableTokens(applicantAddress);
    }

    /*@notice:
     * Calculate the total amount of tokens for a given address based on reported safety performance
     */
    function assessAvailableTokens(address _applicantAddress) private {
        require(vaults[_applicantAddress].safetyCredits.length>0, "At least one safety vision report is required for SCT assessment");
        vaults[_applicantAddress].creditLength=vaults[_applicantAddress].safetyCredits.length;
        
            if (vaults[_applicantAddress].safetyCredits[vaults[_applicantAddress].creditLength-1]>=minPerformance){
                vaults[_applicantAddress].availableTokens += 1;
            }
        }

    /*@notice:
     * Allow withdraw of LINK tokens from the contract
     */
    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(link.transfer(msg.sender, link.balanceOf(address(this))), 'Unable to transfer');
    }

/**Section4.4:************************************************************************************
 * Manage token claims
 */
    function claim() external{
        require(vaults[msg.sender].isRegistered=true, "Only registered accounts can claim SCTs!!");
        require(isTokenFactoryRegistered=true, "The owner should register the token factory using setTokenFactory()");
        require(vaults[msg.sender].availableTokens>0, "You don't have any potential tokens waiting for the transfer");

        _mintSCT(msg.sender, vaults[msg.sender].availableTokens);
    }

    function _mintSCT(address _claimer, uint256 _availableTokens) internal{
        vaults[_claimer].totalClaims+=1;
        SCT.mint(_claimer, _availableTokens);
        vaults[_claimer].availableTokens=0;
        emit claimed(_claimer, _availableTokens);
        vaults[_claimer].totalEarnedTokens += _availableTokens;
    }
}
