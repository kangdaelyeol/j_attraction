import React, {useState} from 'react';
import Styles from './day.module.css';


const Marker = ({info}) => {
	
}


const Day = ({ info }) => {
	const [markers, setMarkers] = useState([]);
	const { day } = info;
	return (
		<div className='container'>
			<span>this is day {day}</span>
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
