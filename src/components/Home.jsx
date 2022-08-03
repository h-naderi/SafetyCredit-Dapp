import { Component } from "react";
import { Button } from "react-bootstrap";
import CDATA from "../data_companies/publicReport.json";
import axios from "axios";
require('dotenv').config();


const cdata = CDATA;

const apikey = process.env.REACT_APP_ETHERSCAN_API_KEY;
const endpoint = process.env.REACT_APP_ETHERSCAN_RINKEBY_ENDPOINT;
const SCNFTContractAddress = process.env.REACT_APP_SCNFT_CONTRACT_ADDRESS;
const SCTContractAddress = process.env.REACT_APP_SCTFACTORY_CONTRACT_ADDRESS;

const accountIDs = [];

for (let i = 0; i < cdata.length; i++) {
  accountIDs.push(cdata[i].Address);
}

class Home extends Component {
  constructor() {
    super();
    this.state = {
      balance: [],
      tokenBalanceID1: [],
      tokenBalanceID2: [],
      tokenBalanceID3: [],
      NFTBalanceID1: [],
      NFTBalanceID2: [],
      NFTBalanceID3: [],
    };
  }

  async componentDidMount() {
    setTimeout(() => {
      axios
        .get(
          endpoint +
            `?module=account&action=tokenbalance&contractaddress=${SCTContractAddress}&address=${accountIDs[0]}&tag=latest&apikey=${apikey}`
        )
        .then((output2) => {
          const { result } = output2.data;
          this.setState({
            tokenBalanceID1: result,
          });
        });
    }, 1000);

    setTimeout(() => {
      axios
        .get(
          endpoint +
            `?module=account&action=tokenbalance&contractaddress=${SCTContractAddress}&address=${accountIDs[1]}&tag=latest&apikey=${apikey}`
        )
        .then((output3) => {
          const { result } = output3.data;
          this.setState({
            tokenBalanceID2: result,
          });
        });
    }, 5000);

    setTimeout(() => {
      axios
        .get(
          endpoint +
            `?module=account&action=tokenbalance&contractaddress=${SCTContractAddress}&address=${accountIDs[2]}&tag=latest&apikey=${apikey}`
        )
        .then((output4) => {
          const { result } = output4.data;
          this.setState({
            tokenBalanceID3: result,
          });
        });
    }, );

    setTimeout(() => {
      axios
        .get(
          endpoint +
            `?module=account&action=tokenbalance&contractaddress=${SCNFTContractAddress}&address=${accountIDs[0]}&tag=latest&apikey=${apikey}`
        )
        .then((output5) => {
          const { result } = output5.data;
          this.setState({
            NFTBalanceID1: result,
          });
        });
    }, 2000);

    setTimeout(() => {
      axios
        .get(
          endpoint +
            `?module=account&action=tokenbalance&contractaddress=${SCNFTContractAddress}&address=${accountIDs[1]}&tag=latest&apikey=${apikey}`
        )
        .then((output6) => {
          const { result } = output6.data;
          this.setState({
            NFTBalanceID2: result,
          });
        });
    }, 4000);

    setTimeout(() => {
      axios
        .get(
          endpoint +
            `?module=account&action=tokenbalance&contractaddress=${SCNFTContractAddress}&address=${accountIDs[2]}&tag=latest&apikey=${apikey}`
        )
        .then((output7) => {
          const { result } = output7.data;
          this.setState({
            NFTBalanceID3: result,
          });
        });
    }, 6000);
  }

  render() {
    const { tokenBalanceID1 } = this.state;
    const { tokenBalanceID2 } = this.state;
    const { tokenBalanceID3 } = this.state;
    const { NFTBalanceID1 } = this.state;
    const { NFTBalanceID2 } = this.state;
    const { NFTBalanceID3 } = this.state;
    return (
      <div>
        <div className="container">
          <div
            className="row"
            style={{ marginTop: "40px", marginBottom: "40px" }}
          >
            {/* #######################################################################################################*/}
            <div className="col-lg-4 mt-5 mb-5">
              <div
                className="card"
                id="shadow"
                style={{
                  borderRadius: "25px",
                  padding: "10px",
                  border: "1px solid #000000",
                  marginTop: "30px",
                }}
              >
                <div className="card-header d-flex justify-content-between">
                  <span>
                    <h3> {cdata[0].companyName}</h3>
                  </span>
                  <img
                    src={cdata[0].profilePic}
                    alt="Profile"
                    className="profile-img"
                  ></img>
                </div>
                <div>
                  <label htmlFor="ul" id="labelFont">
                    <strong>Basic Info:&nbsp;&nbsp;&nbsp;</strong>
                  </label>
                  <ul className="list-group mb-2 sidebar-list-items border border-dark">
                    <li className="list-group-item list-group-item-action pb-0 pt-0 mb-0 border-1">
                      <span>
                        <strong>Company Type:&nbsp;&nbsp;&nbsp;</strong>
                      </span>
                      <span>{cdata[0].companyType}</span>
                    </li>
                    <li className="list-group-item list-group-item-action pb-0 pt-0 mb-0 border-1">
                      <label htmlFor="span">
                        <strong>Project Type:&nbsp;&nbsp;&nbsp;</strong>
                      </label>
                      <span>{cdata[0].ProjectName}</span>
                    </li>
                  </ul>
                </div>
                <div className="ReportInfo">
                  <label htmlFor="ul" id="labelFont">
                    <strong>Report Info:&nbsp;&nbsp;&nbsp;</strong>
                  </label>
                  <ul className="list-group mb-2 border border-dark">
                    <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center pb-0 pt-0 mb-0 border-1">
                      <span>
                        <strong>SafetyVision in use:&nbsp;&nbsp;&nbsp;</strong>
                      </span>
                      <span id="numberFont">{cdata[0].SafetyVision}</span>
                    </li>
                    <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center pb-0 pt-0 mb-0 border-1">
                      <span>
                        <strong>
                          Total Observed Worders:&nbsp;&nbsp;&nbsp;
                        </strong>
                      </span>
                      <span id="numberFont">
                        {cdata[0].TotalObservedWorkers}
                      </span>
                    </li>
                    <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center pb-0 pt-0 mb-0 border-1">
                      <span>
                        <strong>Average SCV Accuracy:&nbsp;&nbsp;&nbsp;</strong>
                      </span>
                      <span id="numberFont">{cdata[0].AvarageAccuracy}</span>
                    </li>
                    <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center pb-0 pt-0 mb-0 border-1">
                      <span>
                        <strong>
                          Average safety performance:&nbsp;&nbsp;&nbsp;
                        </strong>
                      </span>
                      <span id="numberFont">{cdata[0].AveragePerformance}</span>
                    </li>
                  </ul>
                  <div
                    className="LatestReport"
                    style={{
                      marginBottom: "20px",
                      textAlign: "right",
                      paddingRight: "60px",
                      paddingTop: "7px",
                    }}
                  >
                    <label
                      className="text text-center"
                      htmlFor="Button"
                      id="labelFont"
                      style={{
                        paddingRight: "60px",
                        textAlign: "center",
                        color: "black",
                      }}
                    >
                      check latest report
                    </label>
                    <Button
                      className="wallet-button"
                      id="right-panel-button"
                      href={cdata[0].LatestReport}
                    >
                      Click Here
                    </Button>
                  </div>
                </div>
                <div className="TokenInfo">
                  <label htmlFor="ul" id="labelFont">
                    <strong>Token Info:&nbsp;&nbsp;&nbsp;</strong>
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
                              x {tokenBalanceID1} SCTs
                            </span>
                          </li>
                          <li
                            className="list-group-item pb-0 pt-0 mb-0 border-5"
                            style={{
                              borderColor: "#cccccc",
                              borderRadius: "20px",
                            }}
                          >
                            <img
                              src="assets/img/Dapp-SCNFT.png"
                              alt="NFT Logo"
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
                              x {NFTBalanceID1} SC.NFTs
                            </span>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* #######################################################################################################*/}
            <div className="col-lg-4 mt-5 mb-5">
              <div
                className="card"
                id="shadow"
                style={{
                  borderRadius: "25px",
                  padding: "10px",
                  border: "1px solid #000000",
                  marginTop: "30px",
                }}
              >
                <div className="card-header d-flex justify-content-between">
                  <span>
                    <h3> {cdata[1].companyName}</h3>
                  </span>
                  <img
                    src={cdata[1].profilePic}
                    alt="Profile"
                    className="profile-img"
                  ></img>
                </div>
                <div>
                  <label htmlFor="ul" id="labelFont">
                    <strong>Basic Info:&nbsp;&nbsp;&nbsp;</strong>
                  </label>
                  <ul className="list-group mb-2 sidebar-list-items border border-dark">
                    <li className="list-group-item list-group-item-action pb-0 pt-0 mb-0 border-1">
                      <span>
                        <strong>Company Type:&nbsp;&nbsp;&nbsp;</strong>
                      </span>
                      <span>{cdata[1].companyType}</span>
                    </li>
                    <li className="list-group-item list-group-item-action pb-0 pt-0 mb-0 border-1">
                      <label htmlFor="span">
                        <strong>Project Type:&nbsp;&nbsp;&nbsp;</strong>
                      </label>
                      <span>{cdata[1].ProjectName}</span>
                    </li>
                  </ul>
                </div>
                <div className="ReportInfo">
                  <label htmlFor="ul" id="labelFont">
                    <strong>Report Info:&nbsp;&nbsp;&nbsp;</strong>
                  </label>
                  <ul className="list-group mb-2 border border-dark">
                    <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center pb-0 pt-0 mb-0 border-1">
                      <span>
                        <strong>SafetyVision in use:&nbsp;&nbsp;&nbsp;</strong>
                      </span>
                      <span id="numberFont">{cdata[1].SafetyVision}</span>
                    </li>
                    <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center pb-0 pt-0 mb-0 border-1">
                      <span>
                        <strong>
                          Total Observed Worders:&nbsp;&nbsp;&nbsp;
                        </strong>
                      </span>
                      <span id="numberFont">
                        {cdata[1].TotalObservedWorkers}
                      </span>
                    </li>
                    <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center pb-0 pt-0 mb-0 border-1">
                      <span>
                        <strong>Average SCV Accuracy:&nbsp;&nbsp;&nbsp;</strong>
                      </span>
                      <span id="numberFont">{cdata[1].AvarageAccuracy}</span>
                    </li>
                    <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center pb-0 pt-0 mb-0 border-1">
                      <span>
                        <strong>
                          Average safety performance:&nbsp;&nbsp;&nbsp;
                        </strong>
                      </span>
                      <span id="numberFont">{cdata[1].AveragePerformance}</span>
                    </li>
                  </ul>
                  <div
                    className="LatestReport"
                    style={{
                      marginBottom: "20px",
                      textAlign: "right",
                      paddingRight: "60px",
                      paddingTop: "7px",
                    }}
                  >
                    <label
                      className="text text-center"
                      htmlFor="Button"
                      id="labelFont"
                      style={{
                        paddingRight: "60px",
                        textAlign: "center",
                        color: "black",
                      }}
                    >
                      check latest report
                    </label>
                    <Button
                      className="wallet-button"
                      id="right-panel-button"
                      href={cdata[1].LatestReport}
                    >
                      Click Here
                    </Button>
                  </div>
                </div>
                <div className="TokenInfo">
                  <label htmlFor="ul" id="labelFont">
                    <strong>Token Info:&nbsp;&nbsp;&nbsp;</strong>
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
                              x {tokenBalanceID2} SCTs
                            </span>
                          </li>
                          <li
                            className="list-group-item pb-0 pt-0 mb-0 border-5"
                            style={{
                              borderColor: "#cccccc",
                              borderRadius: "20px",
                            }}
                          >
                            <img
                              src="assets/img/Dapp-SCNFT.png"
                              alt="NFT Logo"
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
                              x {NFTBalanceID2} SC.NFTs
                            </span>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* #######################################################################################################*/}
            <div className="col-lg-4 mt-5 mb-5">
              <div
                className="card"
                id="shadow"
                style={{
                  borderRadius: "25px",
                  padding: "10px",
                  border: "1px solid #000000",
                  marginTop: "30px",
                }}
              >
                <div className="card-header d-flex justify-content-between">
                  <span>
                    <h3> {cdata[2].companyName}</h3>
                  </span>
                  <img
                    src={cdata[2].profilePic}
                    alt="Profile"
                    className="profile-img"
                  ></img>
                </div>
                <div>
                  <label htmlFor="ul" id="labelFont">
                    <strong>Basic Info:&nbsp;&nbsp;&nbsp;</strong>
                  </label>
                  <ul className="list-group mb-2 sidebar-list-items border border-dark">
                    <li className="list-group-item list-group-item-action pb-0 pt-0 mb-0 border-1">
                      <span>
                        <strong>Company Type:&nbsp;&nbsp;&nbsp;</strong>
                      </span>
                      <span>{cdata[2].companyType}</span>
                    </li>
                    <li className="list-group-item list-group-item-action pb-0 pt-0 mb-0 border-1">
                      <label htmlFor="span">
                        <strong>Project Type:&nbsp;&nbsp;&nbsp;</strong>
                      </label>
                      <span>{cdata[2].ProjectName}</span>
                    </li>
                  </ul>
                </div>
                <div className="ReportInfo">
                  <label htmlFor="ul" id="labelFont">
                    <strong>Report Info:&nbsp;&nbsp;&nbsp;</strong>
                  </label>
                  <ul className="list-group mb-2 border border-dark">
                    <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center pb-0 pt-0 mb-0 border-1">
                      <span>
                        <strong>SafetyVision in use:&nbsp;&nbsp;&nbsp;</strong>
                      </span>
                      <span id="numberFont">{cdata[2].SafetyVision}</span>
                    </li>
                    <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center pb-0 pt-0 mb-0 border-1">
                      <span>
                        <strong>
                          Total Observed Worders:&nbsp;&nbsp;&nbsp;
                        </strong>
                      </span>
                      <span id="numberFont">
                        {cdata[2].TotalObservedWorkers}
                      </span>
                    </li>
                    <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center pb-0 pt-0 mb-0 border-1">
                      <span>
                        <strong>Average SCV Accuracy:&nbsp;&nbsp;&nbsp;</strong>
                      </span>
                      <span id="numberFont">{cdata[2].AvarageAccuracy}</span>
                    </li>
                    <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center pb-0 pt-0 mb-0 border-1">
                      <span>
                        <strong>
                          Average safety performance:&nbsp;&nbsp;&nbsp;
                        </strong>
                      </span>
                      <span id="numberFont">{cdata[2].AveragePerformance}</span>
                    </li>
                  </ul>
                  <div
                    className="LatestReport"
                    style={{
                      marginBottom: "20px",
                      textAlign: "right",
                      paddingRight: "60px",
                      paddingTop: "7px",
                    }}
                  >
                    <label
                      className="text text-center"
                      htmlFor="Button"
                      id="labelFont"
                      style={{
                        paddingRight: "60px",
                        textAlign: "center",
                        color: "black",
                      }}
                    >
                      check latest report
                    </label>
                    <Button
                      className="wallet-button"
                      id="right-panel-button"
                      href={cdata[2].LatestReport}
                    >
                      Click Here
                    </Button>
                  </div>
                </div>
                <div className="TokenInfo">
                  <label htmlFor="ul" id="labelFont">
                    <strong>Token Info:&nbsp;&nbsp;&nbsp;</strong>
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
                              x {tokenBalanceID3} SCTs
                            </span>
                          </li>
                          <li
                            className="list-group-item pb-0 pt-0 mb-0 border-5"
                            style={{
                              borderColor: "#cccccc",
                              borderRadius: "20px",
                            }}
                          >
                            <img
                              src="assets/img/Dapp-SCNFT.png"
                              alt="NFT Logo"
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
                              x {NFTBalanceID3} SC.NFTs
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
    );
  }
}

export default Home;
