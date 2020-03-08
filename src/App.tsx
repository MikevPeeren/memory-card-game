// React
import React from 'react';
import { Switch, HashRouter, Route } from 'react-router-dom';

// Pages
import IndexPage from './pages/IndexPage';
import NewGamePage from './pages/GamePage';

// Font Awesome
import { library, dom } from '@fortawesome/fontawesome-svg-core';
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
				<HashRouter basename={process.env.PUBLIC_URL}>
					<Switch>
						<Route exact path={'/'} component={IndexPage} />
						<Route exact path={'/new-game'} component={NewGamePage} />
					</Switch>
				</HashRouter>
			</div>
		);
	}
}

export default App;
