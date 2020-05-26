import React, { Component } from 'react';
import ReactPlayer from 'react-player';

import Thumbnail from '../../assets/thumbnail.png';
import Demo from '../../assets/pool-together-demo.mp4';

class KnowMore extends Component {
	state = {};
	render() {
		return (
			<div className='one-container'>
				<div className='one-container-sub'>
					<div className='pool-intro'>
						<ol>
							<li className='is-medium'>
								Join the Pool
								<p className='is-small'>
									Deposit Dai into the pool to get tickets.
									Each ticket is a chance to win weekly
									prizes! For every 1 Dai you deposit you get
									1 ticket.
								</p>
							</li>
							<li className='is-medium'>
								Interest builds
								<p className='is-small'>
									Deposit Dai into the pool to get tickets.
									Each ticket is a chance to win weekly
									prizes! For every 1 Dai you deposit you get
									1 ticket.
								</p>
							</li>
							<li className='is-medium'>
								Prizes awarded
								<p className='is-small'>
									Deposit Dai into the pool to get tickets.
									Each ticket is a chance to win weekly
									prizes! For every 1 Dai you deposit you get
									1 ticket.
								</p>
							</li>
							<li className='is-medium'>
								Never lose!
								<p className='is-small'>
									Deposit Dai into the pool to get tickets.
									Each ticket is a chance to win weekly
									prizes! For every 1 Dai you deposit you get
									1 ticket.
								</p>
							</li>
						</ol>
					</div>
					<div className='video'>
						<ReactPlayer
							url={Demo}
							playing={true}
							controls={true}
							light={Thumbnail}
							height='100%'
							width='auto'
						/>
					</div>
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
						ONBOARD
					</h2>
				</div>
			</div>
		);
	}
}

export default KnowMore;
