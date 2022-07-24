import { Component } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Web3 from "web3";
import SCO from "../contracts/SCOperator.json";
import CDATA from "../data_companies/data.json";
import CIDDATA from "../data_companies/reportCIDsA.json";
import axios from "axios";
require('dotenv').config();

var account = null;
var contractSCO = null;

const SCOperator = SCO;
const cdata = CDATA;
const cidDataA = CIDDATA;

const ownerAccount = process.env.REACT_APP_OWNER_ADDRESS;
const SCNFTContractAddress = process.env.REACT_APP_SCNFT_CONTRACT_ADDRESS;
const apikey =  process.env.REACT_APP_ETHERSCAN_API_KEY;
const endpoint = process.env.REACT_APP_ETHERSCAN_RINKEBY_ENDPOINT;
const SCOperatorAddress = process.env.REACT_APP_SCO_CONTRACT_ADDRESS;
const accountIDs = [];

for (let i = 0; i < cdata.length; i++) {
  accountIDs.push(cdata[i].Address);
}

async function ownerConnectWallet() {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.send("eth_requestAccounts");
    const accounts = await web3.eth.getAccounts();
    account = accounts[0];
    document.getElementById("owner-address").textContent = account;
    contractSCO = new web3.eth.Contract(SCOperator, SCOperatorAddress);
    checkEligibility();
  }
}

async function checkEligibility() {
  if (account === ownerAccount) {
    document.getElementById("owner-elig").textContent = "Welcome to the portal";
  } else {
    document.getElementById("owner-elig").textContent = "You are not eligible";
  }
}

async function registerIt() {
  if (window.ethereum) {
    var _applicantArray = [];
    _applicantArray.push(
      document.querySelector("[name=applicantAddress]").value
    );
    contractSCO.methods
      .registerApplicants(_applicantArray)
      .send({ from: account });
  }
}

async function initializeIt() {
  document.getElementById("init").textContent =
    "Initializing..., confirm transactions!";

  setInterval(() => {
    if (cidDataA[cidDataA.length - 1].status === 0) {
      contractSCO.methods
        .setCID(
          cidDataA[cidDataA.length - 1].reportCID,
          cidDataA[cidDataA.length - 1].companyAddress
        )
        .send({ from: account });
      cidDataA[cidDataA.length - 1].status = 1;
    }
  }, 1000);
}

async function checkStatus() {
  var _applicantArray = String(
    document.querySelector("[name=statusAddress]").value
  );
  var res = await contractSCO.methods.vaults(_applicantArray).call();
  document.getElementById("isRegistered").innerText = res[0];
  document.getElementById("creditLength").innerText = res[2];
  document.getElementById("availableTokens").innerText = res[5];
  document.getElementById("totalEarned").innerText = res[6];
}

class Owner extends Component {
  constructor() {
    super();
    this.state = {
      nftbalance: [],
      sctbalance: [],
    };
  }
  async componentDidMount() {
    setTimeout(() => {
      axios
        .get(
          endpoint +
            `?module=stats&action=tokensupply&contractaddress=${SCNFTContractAddress}&apikey=${apikey}`
        )
        .then((output1) => {
          const { result } = output1.data;
          this.setState({
            nftbalance: result,
          });
        });
    }, 3000);

    setTimeout(() => {
      axios
        .get(
          endpoint +
            `?module=stats&action=tokensupply&contractaddress=${SCNFTContractAddress}&apikey=${apikey}`
        )
        .then((output1) => {
          const { result } = output1.data;
          this.setState({
            sctbalance: result,
          });
        });
    }, 4000);
}

  render() {
    const { nftbalance } = this.state;
    const { sctbalance } = this.state;

    return (
      <div style={{ marginTop: "30px" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 mt-5">
              <div
                className="card"
                id="shadow"
                style={{
                  borderRadius: "25px",
                  padding: "10px",
                  border: "1px solid #000000",
                }}
              >
                <h3 style={{ textAlign: "center" }}> the Owner Portal</h3>
                <h6>
                  1. Please connect your wallet to check your eligibility for
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
                    onClick={ownerConnectWallet}
                  >
                    Connect Wallet
                  </Button>
                  <label
                    htmlFor="owner-button"
                    id="owner-elig"
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
                    id="owner-address"
                    style={{ fontFamily: "Courier Prime, monospace" }}
                  >
                    Click Connect Wallet button to see your address!
                  </label>
                </div>
                <div
                  className="card"
                  style={{
                    borderRadius: "25px",
                    padding: "10px",
                    border: "1px solid #000000",
                    marginTop: "10px",
                  }}
                >
                  <h6>
                    2. Please register applicants using a wallet address in the
                    field below.
                  </h6>
                  <div
                    className="d-flex justify-content-center"
                    style={{
                      marginTop: "3px",
                      textAlign: "center",
                    }}
                  >
                    <Button
                      className="wallet-button"
                      id="register-button"
                      onClick={registerIt}
                    >
                      Register it
                    </Button>
                    <div
                      id="applicant-address"
                      style={{
                        marginTop: "8px",
                        marginLeft: "8px",
                      }}
                    >
                      <input
                        type="text"
                        name="applicantAddress"
                        defaultValue="Applicant address"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="card"
                  style={{
                    borderRadius: "25px",
                    padding: "10px",
                    border: "1px solid #000000",
                    marginTop: "10px",
                  }}
                >
                  <h6>
                    3. Please initialize the SafetyCredit Dapp by clicking the
                    following button.
                  </h6>
                  <div
                    className="d-flex justify-content-center"
                    style={{
                      marginTop: "3px",
                      textAlign: "center",
                    }}
                  >
                    <Button
                      className="wallet-button"
                      id="initialize-button"
                      onClick={initializeIt}
                    >
                      Initialize it
                    </Button>
                    <label
                      htmlFor="initialize-button"
                      id="init"
                      style={{ marginTop: "8px", marginLeft: "8px" }}
                    >
                      {" "}
                    </label>
                  </div>
                </div>
                <div
                  className="card"
                  style={{
                    borderRadius: "25px",
                    padding: "10px",
                    border: "1px solid #000000",
                    marginTop: "10px",
                  }}
                >
                  <h6>
                    4. Let's check the status of each account using its address!
                  </h6>
                  <div
                    className="d-flex justify-content-center"
                    style={{
                      marginTop: "3px",
                      textAlign: "center",
                    }}
                  >
                    <Button
                      className="wallet-button"
                      id="status-button"
                      onClick={checkStatus}
                    >
                      Check status
                    </Button>
                    <div
                      id="status-address"
                      style={{
                        marginTop: "8px",
                        marginLeft: "8px",
                      }}
                    >
                      <input
                        type="text"
                        name="statusAddress"
                        defaultValue="Applicant address"
                      />
                    </div>
                  </div>
                  <div className="ApplicanttInfo">
                    <label htmlFor="ul" id="labelFont">
                      <strong>Info:&nbsp;&nbsp;&nbsp;</strong>
                    </label>
                    <ul className="list-group mb-2 border border-dark">
                      <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center pb-0 pt-0 mb-0 border-1">
                        <span>
                          <strong>
                            Total SCTs minted so far:&nbsp;&nbsp;&nbsp;
                          </strong>
                        </span>
                        <div id="numberFont">
                          <span id="totalSCTs">{sctbalance}</span>
                        </div>
                      </li>
                      <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center pb-0 pt-0 mb-0 border-1">
                        <span>
                          <strong>
                            Total SCNFTs minted so far :&nbsp;&nbsp;&nbsp;
                          </strong>
                        </span>
                        <div id="numberFont">
                          <span id="totalSCNFTs">{nftbalance}</span>
                        </div>
                      </li>
                      <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center pb-0 pt-0 mb-0 border-1">
                        <span>
                          <strong>
                            Is this address registered?&nbsp;&nbsp;&nbsp;
                          </strong>
                        </span>
                        <div id="numberFont">
                          <span id="isRegistered">Address required</span>
                        </div>
                      </li>
                      <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center pb-0 pt-0 mb-0 border-1">
                        <span>
                          <strong>
                            Number of received reports (CIDs):&nbsp;&nbsp;&nbsp;
                          </strong>
                        </span>
                        <div id="numberFont">
                          <span id="creditLength">Address required</span>
                        </div>
                      </li>
                      <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center pb-0 pt-0 mb-0 border-1">
                        <span>
                          <strong>
                            Number of available SCTs:&nbsp;&nbsp;&nbsp;
                          </strong>
                        </span>
                        <div id="numberFont">
                          <span id="availableTokens">Address required</span>
                        </div>
                      </li>
                      <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center pb-0 pt-0 mb-0 border-1">
                        <span>
                          <strong>
                            Number of earned SCTs:&nbsp;&nbsp;&nbsp;
                          </strong>
                        </span>
                        <div id="numberFont">
                          <span id="totalEarned">Address required</span>
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

export default Owner;
