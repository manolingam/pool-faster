import React, { Component } from 'react';

import 'bulma';

import './Finish.css';

import FinishLine from '../../assets/finish-line.png';

class Finish extends Component {
	state = {};

	render() {
		return (
			<div className='finish'>
				<img src={FinishLine} alt='' width='300px' height='auto' />
				<p className='is-small' id='helper'>
					Hooray! You are all set. Check your email for the
					transaction & payment details.
					<br></br>
					Go on & get yourself some tickets.
				</p>
			</div>
		);
	}
}

export default Finish;
