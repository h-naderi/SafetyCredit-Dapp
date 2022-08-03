/**@title: SafetyCredit Dapp: incentive management of construction safety using blockchain-enabled
 *         tokens and vision-based techniques
 * @Version: 3.0
 * @author: Hossein Naderi
 */  

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;


import '@chainlink/contracts/src/v0.8/ChainlinkClient.sol';
import '@chainlink/contracts/src/v0.8/ConfirmedOwner.sol';
import './SCTFactory.sol';

contract SafetyCreditOperator is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    /*@notice:
    /* Vault keeps essential information of contractors.
    */
    struct vault{
        bool isRegistered; 
        uint totalClaims; 
        uint256[] safetyCredits; 
        uint totalCIDs; 
        string lastCID; 
        uint availableTokens; 
        uint totalEarnedTokens; 
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
