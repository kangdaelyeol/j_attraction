import React from 'react';
import Styles from './day.module.css';



const Day = ({ info }) => {
	const { day } = info;
	return (
		<div className='container'>
			<span>this is day {day}</span>
			<input type='text' placeholder='짧은 소개' />
			<div className='map'>
				<span>make your route</span>
			</div>
		</div>
	);
};

export default Day;
