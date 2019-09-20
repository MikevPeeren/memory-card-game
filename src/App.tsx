import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import NewGamePage from "./pages/NewGamePage";

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact={true} path="/" component={IndexPage} />
            <Route exact={true} path="/new-game" component={NewGamePage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
