import React, { Component } from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Header from "./components/Header/Header";

// import "./App.css";

import routes from "./routes";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="container">
            <Header />
            {routes}
            <p className="App-intro" />
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
