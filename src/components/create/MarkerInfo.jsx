import React, { useState } from 'react';
import Styles from './day.module.css';

const MarkerInfo = ({ currentMarker, index, onMarkerDelete }) => {

  

	return (
		<div className={Styles.target__info}>
			<input
				type='text'
				className='placename'
				placeholder='지역 이름'
				value={currentMarker?.name || ""}
			/>
			<input
				type='text'
				className='time'
				placeholder='시간'
				value={currentMarker?.time || ""}
			/>
			<input
				type='text'
				className='cost'
				placeholder='비용'
				value={currentMarker?.cost || ""}
			/>
			<textarea
				placeholder='설명'
				name='description'
				id='description'
				cols='30'
				rows='10'
				value={currentMarker?.description || ""}
			></textarea>
			<button onClick={() => onMarkerDelete(currentMarker)}>
				removecurrnet
			</button>
		</div>
	);
};

export default MarkerInfo;
