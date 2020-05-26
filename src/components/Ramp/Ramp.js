import React, { Component } from 'react';
import { EthAddress } from 'rimble-ui';

import WalletPic from '../../assets/wallet.png';

import 'bulma';

import './Ramp.css';

class OnRamp extends Component {
	state = {};

	render() {
		return (
			<div className='on-ramp'>
				<img src={WalletPic} alt='' width='300px' height='auto' />
				<EthAddress address={this.props.address} id='address' />
				<p id='helper'>
					(You can login to Fortmatic and get your keys if you wanna
					import your account in other wallets like Metamask,
					Coinbase, etc.)
				</p>
			</div>
		);
	}
}

export default OnRamp;
