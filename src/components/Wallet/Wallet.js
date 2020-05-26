import React, { Component } from 'react';

import 'bulma';

import './Wallet.css';

import StartLine from '../../assets/start-line.png';

class Wallet extends Component {
	state = {};
	render() {
		return (
			<div className='wallet'>
				<img src={StartLine} alt='' width='300px' height='auto' />
				<p className='is-small' id='helper'>
					A Wallet allows you to interact with applications on
					Ethereum and also lets you hold crypto assets. There are
					various wallet proviers like{' '}
					<a
						href='https://metamask.io/'
						target='_blank'
						rel='noopener noreferrer'
					>
						Metamask
					</a>
					,{' '}
					<a
						href='https://wallet.coinbase.com/'
						target='_blank'
						rel='noopener noreferrer'
					>
						Coinbase
					</a>
					,{' '}
					<a
						href='https://fortmatic.com/'
						target='_blank'
						rel='noopener noreferrer'
					>
						Fortmatic
					</a>
					, etc. You can create a wallet using any of the providers
					and can import your account in others. Let us create one
					using{' '}
					<span
						style={{
							color: '#512da8',
							fontWeight: 'bold',
						}}
					>
						Fortmatic
					</span>
					.
				</p>
			</div>
		);
	}
}

export default Wallet;
