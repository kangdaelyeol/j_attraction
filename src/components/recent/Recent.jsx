import React from 'react';
import Styles from './recent.module.css';

const Recent = () => {
	return (
		<div className='recent'>
			<span>최신 등록 정보</span>
			<div className='list'>
				<div className='comp'>1</div>
				<div className='comp'>2</div>
				<div className='comp'>3</div>
			</div>
		</div>
	);
};

export default Recent;
