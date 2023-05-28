import React from 'react';
import Styles from './day.module.css';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import Gmap from './Gmap';

const render = (status) => {
	return <h1>{status}</h1>;
};

const Day = ({ info }) => {
	const { day } = info;
	return (
		<div className='container'>
			<span>this is day {day}</span>
			<input type='text' placeholder='짧은 소개' />
			<div className='map'>
				<span>make your route</span>
				<Wrapper
					apiKey={process.env.REACT_APP_GOOGLEMAP_API_KEY}
					render={render}
				>
					<Gmap />
				</Wrapper>
			</div>
		</div>
	);
};

export default Day;
