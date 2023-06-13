import React, { useState } from 'react';
import Styles from './create.module.css';
import Day from './Day';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import Gmap from './Gmap';
import { Trip, Date } from '../../schema.js';
/** required
 * google Map
 * title
 * summary(people, location, days, weather, budget, category)
 * Day[1, 2, 3]
 * * route (locations of places)
 * * place (spendingTime, price, des), moving(way, spendingtime, tips), pictures[]
 */
const render = (status) => {
	return <h1>{status}</h1>;
};

const Create = () => {
	// for storing in db
	const [trip, setTrip] = useState(new Trip());

	// for change each day for editing
	const [dayIndex, setDayIndex] = useState(0);
	const [markers, setMarkers] = useState([]);

	// value for reducing duplicated code -> to access rapidly
	const markerst = trip.days[dayIndex]?.markers;
	const currentDay = trip.days[dayIndex];

	const addMarker = (marker) => {
		const newMarkers = [...markerst, marker];
		currentDay.markers = newMarkers;
		setTrip((current) => {
			current[dayIndex].markers = newMarkers;
			return current;
		});
	};

	// for editing marker info
	const [currentMarker, setCurrentMarker] = useState(null);

	// for Google map API
	const [map, setMap] = useState();

	// To remove currentMarker when you click remove button
	const onMarkerDelete = (marker) => {
		// 구글 맵 api를 통한 마커 제거
		marker.setMap(null);
		// state상의 marker 제거, 정렬
		setTrip((current) => {
			const newMarkers = [];
			markerst.forEach((m) => {
				if (marker !== m) newMarkers.push(m);
			});
			const newTrip = { ...current };
			newTrip.days[dayIndex].markers = newMarkers;
			return newTrip;
		});
	};

	const onDayClick = (index) => {
		return setDayIndex(index);
	};

	const onAddDayClick = () => {
		// create new Day;
		const newDay = new Date();
		// setTrip => add push new day into days;
		return setTrip((current) => {
			const newTrip = { ...current };
			newTrip.days.push(newDay);
			return newTrip;
		});
	};

	const onRemoveDayClick = (rmIndex) => {
		const newDays = [];
		trip.days.forEach((v, index) => {
			if (Number(rmIndex) !== index) newDays.push({ ...v });
		});
		if (newDays.length === 0) newDays.push(new Date());

		return setTrip((current) => {
			const newTrip = { ...current };
			newTrip.days = newDays;
			return newTrip;
		});
	};

	return (
		<div className={Styles.container}>
			<div className='title'>Create</div>
			<input type='text' placeholder='Title' />
			<div className='summary'>
				<select name='season' id='season'>
					<option value=''>계절</option>
					<option value='spring'>봄</option>
					<option value='summer'>여름</option>
					<option value='autumn'>가을</option>
					<option value='winter'>겨울</option>
				</select>
				<input type='text' placeholder='Budget' />
				<input type='text' placeholder='Duration' />
			</div>
			<textarea
				name='introduction'
				id='introduction'
				cols='30'
				rows='10'
				placeholder='간단한 여행 소개'
			></textarea>
			<div className='daybox'>
				{trip.days.map((v, index) => {
					return (
						<div key={index} className='day'>
							<div
								className='dayset'
								data-index={index}
								onClick={() => {
									onDayClick(index);
								}}
							>
								day{index + 1}
							</div>
							<button
								onClick={(e) => {
									onRemoveDayClick(index);
								}}
							>
								remove day {index + 1}
							</button>
						</div>
					);
				})}
				<div onClick={onAddDayClick} className={Styles.add_day}>
					addDay
				</div>
			</div>
			<div className={Styles.map__top}>
				<Wrapper
					apiKey={process.env.REACT_APP_GOOGLEMAP_API_KEY}
					render={render}
					libraries={['places']}
				>
					<Gmap
						markers={markers}
						setMarkers={setMarkers}
						currentMarker={currentMarker}
						setCurrentMarker={setCurrentMarker}
						map={map}
						setMap={setMap}
					/>
				</Wrapper>
			</div>
			<div className={Styles.map__bottom}>
				<Day info={currentDay} index={dayIndex} />
				<div className={Styles.target__info}>
					<input type='text' className='placename' placeholder='지역 이름' />
					<input type='text' className='address' placeholder='주소' />
					<textarea
						placeholder='설명'
						name='description'
						id='description'
						cols='30'
						rows='10'
					></textarea>
					<button onClick={() => onMarkerDelete(currentMarker)}>
						removecurrnet
					</button>
				</div>
			</div>

			<button className='save'>save!</button>
		</div>
	);
};

export default Create;
