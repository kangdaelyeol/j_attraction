import React, { useState } from 'react';
import Styles from './create.module.css';
import Day from './Day';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import Gmap from './Gmap';
import { Trip, DateInfo, Marker } from '../../schema.js';
import MarkerInfo from './MarkerInfo';
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

	// value for reducing duplicated code -> to access rapidly
	const currentDay = trip.days[dayIndex];
	const markers = currentDay?.markers;

	const addMarker = (marker) => {
		const newMarkers = [...markers, marker];
		setTrip(() => {
			const newTrip = { ...trip };
			newTrip.days[dayIndex].markers = newMarkers;
			return newTrip;
		});
	};

	// for editing marker info
	const [currentMarker, setCurrentMarker] = useState(null);

	const markerNow = markers.find(v => {
		return v.id === currentMarker;
	})
	// for Google map API
	const [map, setMap] = useState();

	// To remove currentMarker when you click remove button
	const onMarkerDelete = (markerId) => {
		// 구글 맵 api를 통한 마커 제거
		const DeleteMarker = markers.find(v => {
			console.log(v.id, markerId);
			return v.id === markerId;
		});
		console.log("DeleteMarker:", DeleteMarker)
		DeleteMarker.marker.setMap(null);
		console.log(markerNow.marker);
		// state상의 marker 제거, 정렬
		setTrip((current) => {
			const newMarkers = [];
			markers.forEach((m) => {
				if (markerId !== m.id) newMarkers.push(m);
			});
			const newTrip = { ...current };
			newTrip.days[dayIndex].markers = newMarkers;
			return newTrip;
		});
	};

	const imgChange = (src, index, markerIndex) => {
		const newCurrentMarker = {...currentMarker};
		newCurrentMarker.picture[index] = src;
		setTrip((current) => {
			const newTrip = {...current};
			newTrip.days[dayIndex].markers[markerIndex] = newCurrentMarker;
			return newTrip;
		})
	}

	const infoChange = (val, markerId) => {
		const newMarker = {...markerNow, ...val};
		console.log(newMarker);
		const newMarkers = [];
		markers.forEach(v => {
			if(v.id !== markerId) newMarkers.push(v);
			else newMarkers.push(newMarker);
		});

		console.log(newMarkers);
		setTrip((current) => {
			const newTrip = {...current};
			newTrip.days[dayIndex].markers = newMarkers;
			return newTrip;
		})
	}

	const onDayClick = (index) => {
		return setDayIndex(index);
	};

	const onAddDayClick = () => {
		// create new Day;
		const newDay = new DateInfo();
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
		if (newDays.length === 0) newDays.push(new DateInfo());

		return setTrip((current) => {
			const newTrip = { ...current };
			newTrip.days = newDays;
			return newTrip;
		});
	};
	console.log("currentMarker(ID)", currentMarker)
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
						addMarker={addMarker}
						currentMarker={currentMarker}
						setCurrentMarker={setCurrentMarker}
						map={map}
						setMap={setMap}
					/>
				</Wrapper>
			</div>
			<div className={Styles.map__bottom}>
				<Day info={currentDay} index={dayIndex} />
				{markerNow && <MarkerInfo
					currentMarker={markerNow}
					markerId={currentMarker}
					onMarkerDelete={onMarkerDelete}
					imgChange={imgChange}
					infoChange={infoChange}
				/> }
				
			</div>

			<button className='save'>save!</button>
		</div>
	);
};

export default Create;
