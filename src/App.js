import React, { Component } from 'react';

import Intro from './pages/Intro/Intro';
import OnBoard from './pages/OnBoard/OnBoard';
import KnowMore from './pages/KnowMore/KnowMore';

import 'bulma';

import './App.css';

class App extends Component {
	state = {};
	render() {
		return (
			<div className='App'>
				<section id='zero'>
					<Intro />
				</section>
				<section id='one'>
					<KnowMore />
				</section>
				<section id='two'>
					<OnBoard />
				</section>
			</div>
		);
	}
}

export default App;
