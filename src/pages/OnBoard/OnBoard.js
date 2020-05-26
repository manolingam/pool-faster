import React from 'react';

import Web3 from 'web3';
import Web3Modal from 'web3modal';
import Fortmatic from 'fortmatic';
import transakSDK from '@transak/transak-sdk';

import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import StepConnector from '@material-ui/core/StepConnector';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';

import 'bulma';

import Wallet from '../../components/Wallet/Wallet';
import Ramp from '../../components/Ramp/Ramp';
import Finish from '../../components/Finish/Finish';

import './OnBoard.css';
import './Loading.css';

const THEME = createMuiTheme({
	typography: {
		fontFamily: "'Karla', sans-serif",
	},
});

const QontoConnector = withStyles({
	alternativeLabel: {
		top: 10,
		left: 'calc(-50% + 16px)',
		right: 'calc(50% + 16px)',
	},
	active: {
		'& $line': {
			borderColor: '#784af4',
		},
	},
	completed: {
		'& $line': {
			borderColor: '#784af4',
		},
	},
	line: {
		borderColor: '#eaeaf0',
		borderTopWidth: 3,
		borderRadius: 1,
	},
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
	root: {
		color: '#eaeaf0',
		display: 'flex',
		height: 22,
		alignItems: 'center',
	},
	active: {
		color: '#784af4',
	},
	circle: {
		width: 8,
		height: 8,
		borderRadius: '50%',
		backgroundColor: 'currentColor',
	},
	completed: {
		color: '#784af4',
		zIndex: 1,
		fontSize: 18,
	},
});

function QontoStepIcon(props) {
	const classes = useQontoStepIconStyles();
	const { active, completed } = props;

	return (
		<div
			className={clsx(classes.root, {
				[classes.active]: active,
			})}
		>
			{completed ? (
				<Check className={classes.completed} />
			) : (
				<div className={classes.circle} />
			)}
		</div>
	);
}

QontoStepIcon.propTypes = {
	active: PropTypes.bool,
	completed: PropTypes.bool,
};

const providerOptions = {
	fortmatic: {
		package: Fortmatic,
		options: {
			key: process.env.REACT_APP_FORTMATIC_ID,
		},
	},
};

const web3Modal = new Web3Modal({
	network: 'mainnet',
	cacheProvider: false,
	providerOptions,
});

class OnBoard extends React.Component {
	state = {
		address: '',
		steps: ['Create a wallet', 'Get some DAI', 'Go to app'],
		activeStep: 0,
		transakOrderSuccess: false,
		loading: false,
	};

	initFortmatic = async () => {
		web3Modal.clearCachedProvider();

		const provider = await web3Modal.connectTo('fortmatic');
		const web3 = new Web3(provider);
		const accounts = await web3.eth.getAccounts();

		this.setState({ address: accounts[0], provider, web3 });
	};

	initTransak = async () => {
		let transak = new transakSDK({
			apiKey: process.env.REACT_APP_TRANSAK_API_KEY,
			environment: 'STAGING',
			defaultCryptoCurrency: 'DAI',
			cryptoCurrencyList: 'DAI',
			exchangeScreenTitle: 'Fund your wallet with DAI',
			walletAddress: this.state.address,
			themeColor: '000000',
			fiatCurrency: '',
			email: '',
			redirectURL: '',
			hostURL: window.location.origin,
			widgetHeight: '550px',
			widgetWidth: '',
		});

		transak.init();

		// To get all the events
		transak.on(transak.ALL_EVENTS, (data) => {
			// console.log('All events', data);
		});

		// This will trigger when the user marks payment is made.
		transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
			this.setState({ transakOrderSuccess: true }, () => {
				this.setState({ activeStep: this.state.activeStep + 1 });
			});
			transak.close();
		});
	};

	handleNext = async () => {
		this.setState({ loading: true });
		if (this.state.activeStep === 0) {
			await this.initFortmatic();
			this.setState({ activeStep: this.state.activeStep + 1 });
		} else if (this.state.activeStep === 1) {
			await this.initTransak();
		} else if (this.state.activeStep === 2) {
			this.setState({ activeStep: this.state.activeStep + 1 });
		}
		this.setState({ loading: false });
	};

	handleBack = () => {};

	render() {
		return (
			<ThemeProvider theme={THEME}>
				<p className='is-medium' style={{ marginTop: '50px' }}>
					OnBoard in 3 Steps
				</p>
				<div className={` on-board`}>
					<Stepper
						alternativeLabel
						activeStep={this.state.activeStep}
						connector={<QontoConnector />}
					>
						{this.state.steps.map((label) => (
							<Step key={label}>
								<StepLabel StepIconComponent={QontoStepIcon}>
									{label}
								</StepLabel>
							</Step>
						))}
					</Stepper>

					{this.state.activeStep === 0 ? (
						<div className='stepper-container'>
							<Wallet />
							{this.state.loading ? (
								<div className='lds-ellipsis'>
									<div></div>
									<div></div>
									<div></div>
									<div></div>
								</div>
							) : (
								<p
									onClick={this.handleNext}
									className='button is-rounded stepper-button'
								>
									CREATE & CONNECT
								</p>
							)}
						</div>
					) : this.state.activeStep === 1 ? (
						<div className='stepper-container'>
							<Ramp address={this.state.address} />
							{this.state.loading ? (
								<div className='lds-ellipsis'>
									<div></div>
									<div></div>
									<div></div>
									<div></div>
								</div>
							) : (
								<p
									onClick={this.handleNext}
									className='button is-rounded stepper-button'
								>
									BUY DAI
								</p>
							)}
						</div>
					) : this.state.activeStep === 2 ? (
						<div className='stepper-container'>
							<Finish />
							<a
								onClick={this.handleNext}
								className='button is-rounded stepper-button'
								href='https://app.pooltogether.com/'
								target='_blank'
								rel='noopener noreferrer'
							>
								JOIN THE POOL
							</a>
						</div>
					) : null}
				</div>
			</ThemeProvider>
		);
	}
}

export default OnBoard;
