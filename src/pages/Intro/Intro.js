import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import PoolFaster from '../../assets/pool-logo.png';
import Lottery from '../../assets/lottery.png';
import TraditionalLottery from '../../assets/traditional-lottery.png';
import PoolLottery from '../../assets/pool-lottery.png';

import './Intro.css';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const Intro = () => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [traditional, setTraditional] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className='intro'>
			<img
				src={PoolFaster}
				alt=''
				id='app-logo'
				width='150px'
				height='auto'
			/>
			<div className='sub-container'>
				<p className='is-medium'>Get into PoolTogether in no time.</p>

				<img src={Lottery} alt='' width='450px' height='auto' />
				<button
					className='button'
					onClick={() => {
						setTraditional(true);
						setOpen(true);
					}}
				>
					How traditional lottery works?
				</button>
				<button
					className='button'
					onClick={() => {
						setTraditional(false);
						setOpen(true);
					}}
				>
					How pool together works?
				</button>
			</div>
			<div className='next'>
				<span className='scroll-icon'>
					<span className='scroll-icon__wheel-outer'>
						<span className='scroll-icon__wheel-inner'></span>
					</span>
				</span>
				<h2
					style={{
						fontWeight: 'bold',
						marginTop: '0.3rem',
					}}
				>
					KNOW MORE
				</h2>
			</div>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<img
							src={traditional ? TraditionalLottery : PoolLottery}
							alt=''
						/>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default Intro;
