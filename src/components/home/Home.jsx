import React from 'react';
import Styles from './home.module.css';

const Home = () => {
	return (
		<div className='home'>
			<span>홈</span>
			<div className='list'>
				<div className='comp'>1</div>
				<div className='comp'>2</div>
				<div className='comp'>3</div>
			</div>
		</div>
	);
};

export default Home;
