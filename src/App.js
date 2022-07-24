import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import MyNav from "./components/MyNav.jsx";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyNav />
      </div>
    );
  }
}

export default App;
