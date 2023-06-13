import React, {useState} from 'react';
import Styles from './day.module.css';



const Day = ({ info, index }) => {
	return (
		<div className='container'>
			<span>this is day {Number(index) + 1}</span>
			<input type='text' placeholder='짧은 소개' />
			<div className="markers">
				<span>places info</span>
			</div>
			<div className='map'>
				<span>make your route</span>
			</div>
		</div>
	);
};

export default Day;
