import React from 'react';
import '@aws-amplify/ui/dist/style.css';
import logo from './logo.svg';
import Amplify, {Auth} from 'aws-amplify';
import {
	withAuthenticator
} from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

const App = ({signOut, user}) => {

	return (
		<div className="App">
			<header className="App-header">
				<div>Hello, {user.username}</div>
				<img src={logo} className="App-logo" alt="logo" />
				<button onClick={signOut}>Sign out</button>
			</header>
		</div>
	)
};

export default withAuthenticator(App);
