import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import Login from './screens/login.screen';
import Register from './screens/register.screen';
import Home from './screens/home.screen';
import TestForm from './screens/test-form.screen';
import FourNotFour from './components/404';
import GuradedRoute from './utils/guarded-route';

function App() {
	return (
		<Router>
			<div className='App'>
				<Switch>
					<Route exact path='/'>
						<Redirect to='/login' />
					</Route>
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
					<GuradedRoute path='/home' component={Home} />
					<Route path='/test-form' component={TestForm} />
					<Route render={() => <FourNotFour />} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
