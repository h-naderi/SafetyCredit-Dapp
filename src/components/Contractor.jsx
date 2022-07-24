import { Component } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Web3 from "web3";
import NFTABI from "../contracts/SCNFTABI.json";
import SCTF from "../contracts/SCTFactory.json";
import SCO from "../contracts/SCOperator.json";
require('dotenv').config();

var account = null;
var contractSCNFT = null;
var contractSCO = null;
var contractSCTF= null;

const SCNFTabi = NFTABI;
const SCOperator = SCO;
const SCTFactory = SCTF;

const SCNFTContractAddress = process.env.REACT_APP_SCNFT_CONTRACT_ADDRESS;
const SCTContractAddress = process.env.REACT_APP_SCTFACTORY_CONTRACT_ADDRESS;
const SCOperatorAddress = process.env.REACT_APP_SCO_CONTRACT_ADDRESS;

async function cConnectWallet() {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.send("eth_requestAccounts");
    const accounts = await web3.eth.getAccounts();
    account = accounts[0];
    document.getElementById("contractor-address").textContent = account;
    contractSCO = new web3.eth.Contract(SCOperator, SCOperatorAddress);
    checkCEligibility();
    setInterval(checkSCTavailable(),3000);
    setInterval(checkSCTBalance(), 2000);
    setInterval(checkSCNFTBalance(), 4000);
  }
}

async function checkCEligibility() {
  var cres = await contractSCO.methods.vaults(account).call();
  if (cres[0]) {
    document.getElementById("contractor-elig").textContent = "Welcome to the portal";
  } else {
    document.getElementById("contractor-elig").textContent = "Please contact the owner, you are not registered!";
  }
}

async function checkSCTavailable(){
  var sctav= await contractSCO.methods.vaults(account).call();
  document.getElementById("available-sct").textContent= sctav[5];
}

async function checkSCTBalance(){
  const web3 = new Web3(window.ethereum);
  contractSCTF= new web3.eth.Contract(SCTFactory, SCTContractAddress);
  var sctbalance= await contractSCTF.methods.balanceOf(account).call();
  document.getElementById("sct-balance").textContent= sctbalance;
}

async function claim() {
  if (window.ethereum) {
    contractSCO.methods
      .claim()
      .send({ from: account});
  }
}

async function exchange(){
  const web3 = new Web3(window.ethereum);
  contractSCNFT= new web3.eth.Contract(SCNFTabi, SCNFTContractAddress);
  if (window.ethereum){
    contractSCNFT.methods.mint(account).send({from: account})
  }
}

async function checkSCNFTBalance(){
  const web3 = new Web3(window.ethereum);
  contractSCNFT= new web3.eth.Contract(SCNFTabi, SCNFTContractAddress);
  var scnftbalance= await contractSCNFT.methods.balanceOf(account).call();
  document.getElementById("scnft-balance").textContent=scnftbalance;
}

class Contractor extends Component {
  render() {
    return (
      <div style={{ marginTop: "30px" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 mt-5">
              <div
                className="card"
                id="shadow"
                style={{
                  borderRadius: "25px",
                  padding: "10px",
                  border: "1px solid #000000",
                }}
              >
                <h3 style={{ textAlign: "center" }}> the Contractor Portal</h3>
                <h6>
                  Please connect your wallet to check your eligibility for
                  working with this portal!
                </h6>
                <div
                  className="d-flex justify-content-center"
                  id="wallet-address"
                  style={{
                    marginTop: "3px",
                    textAlign: "center",
                  }}
                >
                  <Button
                    className="wallet-button"
                    id="owner-button"
                    onClick={cConnectWallet}
                  >
                    Connect Wallet
                  </Button>
                  <label
                    htmlFor="owner-button"
                    id="contractor-elig"
                    style={{ marginTop: "8px", marginLeft: "8px" }}
                  >
                    {" "}
                  </label>
                </div>

                <div
                  className="card"
                  style={{
                    marginTop: "3px",
                    textAlign: "center",
                  }}
                >
                  <label
                    id="contractor-address"
                    style={{ fontFamily: "Courier Prime, monospace" }}
                  >
                    Click Connect Wallet button to see your address!
                  </label>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-5 mt-5">
                <div
                  className="card"
                  id="shadow"
                  style={{
                    borderRadius: "25px",
                    padding: "10px",
                    border: "1px solid #000000",
                  }}
                >
                  <h3> SCT portal</h3>
                  <h5>
                    <span>
                      You have{" "}
                      <span id="tokenFont">
                        <span id="available-sct">...</span>
                      </span>{" "}
                      SCTs ready to be claimed!{" "}
                    </span>
                  </h5>
                  <div
                    className="card"
                    style={{
                      marginTop: "3px",
                      textAlign: "center",
                    }}
                  >
                    <label htmlFor="#claim-button" className="h6">
                      Click "CLAIM IT" button to receive your rewards!
                    </label>
                    <div style={{ textAlign: "center" }}>
                      <Button className="wallet-button" id="claim-button" onClick={claim}>
                        CLAIM IT
                      </Button>
                    </div>
                  </div>
                  <div className="TokenInfo">
                    <label htmlFor="ul" id="labelFont">
                      <strong>Your SCT Balance Info:&nbsp;&nbsp;&nbsp;</strong>
                    </label>
                    <ul
                      className="list-group mb-2 sidebar-list-items border border-5 border-info"
                      style={{ borderRadius: "20px" }}
                    >
                      <li className="list-group-item pb-2 pt-0 mb-0 border-0">
                        <div style={{ marginTop: "15px" }}>
                          <ul className="list-group mb-2">
                            <li
                              className="list-group-item pb-0 pt-0 mb-2 border-5"
                              style={{
                                borderColor: "#cccccc",
                                borderRadius: "20px",
                              }}
                            >
                              <img
                                src="assets/img/Dapp-SCT.png"
                                alt="Token Logo"
                                style={{
                                  width: "70px",
                                  height: "70px",
                                  border: "5px solid #999999",
                                  borderRadius: "50%",
                                }}
                              />
                              <span
                                style={{
                                  paddingLeft: "20px",
                                  fontSize: "30px",
                                  textAlign: "center",
                                }}
                              >
                                x <span id="sct-balance">...</span> SCTs
                              </span>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 mt-5">
                <div
                  className="card"
                  id="shadow"
                  style={{
                    borderRadius: "25px",
                    padding: "10px",
                    border: "1px solid #000000",
                  }}
                >
                  <h3> SC.NFT portal</h3>
                  <h6>
                    This portal helps you to turn your SCTs to immutable SCNFTs.
                  </h6>
                  <h6 style={{ textAlign: "center" }}>Cost:</h6>
                  <h6 style={{ textAlign: "center" }}>
                    <span id="tokenFont">2 SCT</span>s{" "}
                    <span id="tokenFont">= 1 SC.NFT</span>
                  </h6>

                  <div
                    className="card"
                    style={{
                      marginTop: "3px",
                      textAlign: "center",
                    }}
                  >
                    <label htmlFor="#claim-button" className="h6">
                      Click "EXCHANGE" button to receive your SCNFT!
                    </label>
                    <div style={{ textAlign: "center" }}>
                      <Button className="wallet-button" id="claim-button" onClick={exchange}>
                        EXCHANGE
                      </Button>
                    </div>
                  </div>
                  <div className="NFTInfo">
                    <label htmlFor="ul" id="labelFont">
                      <strong>Your SCNFT Balance Info:&nbsp;&nbsp;&nbsp;</strong>
                    </label>
                    <ul
                      className="list-group mb-2 sidebar-list-items border border-5 border-info"
                      style={{ borderRadius: "20px" }}
                    >
                      <li className="list-group-item pb-2 pt-0 mb-0 border-0">
                        <div style={{ marginTop: "10px" }}>
                          <ul className="list-group mb-0">
                            <li
                              className="list-group-item pb-0 pt-0 mb-0 border-5"
                              style={{
                                borderColor: "#cccccc",
                                borderRadius: "20px",
                              }}
                            >
                              <img
                                src="assets/img/Dapp-SCNFT.png"
                                alt="Token Logo"
                                style={{
                                  width: "70px",
                                  height: "70px",
                                  border: "5px solid #999999",
                                  borderRadius: "50%",
                                }}
                              />
                              <span
                                style={{
                                  paddingLeft: "20px",
                                  fontSize: "30px",
                                  textAlign: "center",
                                }}
                              >
                                x <span id="scnft-balance">...</span> SCNFTs
                              </span>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contractor;
