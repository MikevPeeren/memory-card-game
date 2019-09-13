import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./styles/index.css";
import IndexPage from "./pages/IndexPage";

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route path="/" component={IndexPage} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
