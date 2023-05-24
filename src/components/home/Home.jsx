import React from 'react';
import Styles from './home.module.css';

const Home = () => {
	return (
		<div className={`${Styles.home}`}>
			<span>홈</span>
			<div className={Styles.list}>
				<div className={Styles.comp}>1</div>
				<div className={Styles.comp}>2</div>
				<div className={Styles.comp}>3</div>
			</div>
		</div>
	);
};

export default Home;
