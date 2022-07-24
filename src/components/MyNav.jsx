import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Contractor from "./Contractor";
import Owner from "./Owner";

class MyNav extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar bg="myNav" fixed="top" expand="lg" variant="dark">
            <Navbar.Brand>
              <img
                src="assets/img/DappLogo.png"
                alt="Logo"
                width="60px"
                height="45.6px"
              />
              {"  "}
              <span className="navFont">SafetyCredit Dapp</span>
            </Navbar.Brand>

            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav className="navFont">
                <Nav.Link as={Link} to={"/"}>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to={"/contractor"}>
                  I'm a Contractor
                </Nav.Link>
                <Nav.Link as={Link} to={"/owner"}>
                  I'm the Owner
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/contractor" element={<Contractor />}/>
            <Route path="/owner" element={<Owner />}/>
          </Routes>
        </div>
      </Router>
    );
  }
}

export default MyNav;
