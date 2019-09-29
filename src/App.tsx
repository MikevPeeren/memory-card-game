import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import NewGamePage from './pages/GamePage';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faCoffee,
    faAirFreshener,
    faBaby,
    faAmbulance,
    faCoins,
    faCarrot,
    faCreditCard,
    faCookie,
} from '@fortawesome/free-solid-svg-icons';

library.add(faCoffee);
library.add(faAirFreshener);
library.add(faBaby);
library.add(faAmbulance);
library.add(faCoins);
library.add(faCarrot);
library.add(faCreditCard);
library.add(faCookie);

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
