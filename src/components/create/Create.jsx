import React, { useState } from 'react';
import Styles from './create.module.css';
import Day from './Day';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import Gmap from './Gmap';
import { Trip, DateInfo, Marker } from '../../schema.js';
import MarkerInfo from './MarkerInfo';
import { getNewTrip } from '../../factory.js';
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

	// for change, to access each elements or state with key value
	const [dayIndex, setDayIndex] = useState(0);
	const [currentMarker, setCurrentMarker] = useState(null);
	const [path, setPath] = useState(null);

	// value for reducing duplicated code -> to access rapidly
	const currentDay = trip.days[dayIndex];
	const markers = currentDay?.markers;

	const addMarker = (marker) => {
		//기존 path 지우기
		if (path) path.setMap(null);
		const newMarkers = [];
		markers?.forEach((v) => {
			newMarkers.push({ ...v });
		});
		console.log('ADDMARKER');
		newMarkers.push({ ...marker });
		const newTrip = getNewTrip(trip);
		newTrip.days[dayIndex].markers = newMarkers;

		// 새로운 path 생성
		const pathCoordinates = [];
		newMarkers.forEach((m) => {
			pathCoordinates.push(m.marker.getPosition());
		});

		const newPath = new window.google.maps.Polyline({
			path: pathCoordinates,
			geodesic: true,
			strokeColor: '#FF0000',
			strokeOpacity: 0.2,
			strokeWeight: 6,
		});

		newPath.setMap(map);
		setPath(newPath);
		return setTrip(newTrip);
	};

	// for editing marker info
	console.log('current Marker: ', currentMarker);

	const markerNow = markers?.find((v) => {
		return v.id === currentMarker;
	});
	// for Google map API
	const [map, setMap] = useState();

	// To remove currentMarker when you click remove button
	const onMarkerDelete = (markerId) => {
		//기존 path 지우기
		if (path) {
			path.setMap(null);
		}
		// 구글 맵 api를 통한 마커 제거
		markers.forEach((v) => {
			if (markerId === v.id) {
				v.onDelete();
			}
		});
		// state상의 marker 제거, 정렬
		const newMarkers = [];
		markers.forEach((m) => {
			if (markerId !== m.id) newMarkers.push({ ...m });
		});
		// 새로운 path 생성
		const pathCoordinates = [];
		newMarkers.forEach((m) => {
			pathCoordinates.push(m.marker.getPosition());
		});

		const newPath = new window.google.maps.Polyline({
			path: pathCoordinates,
			geodesic: true,
			strokeColor: '#FF0000',
			strokeOpacity: 0.2,
			strokeWeight: 6,
		});

		newPath.setMap(map);

		const newTrip = getNewTrip(trip);
		newTrip.days[dayIndex].markers = newMarkers;
		setPath(newPath);
		return setTrip(newTrip);
	};

	const imgChange = (src, index, markerIndex) => {
		const newCurrentMarker = { ...currentMarker };
		newCurrentMarker.picture[index] = src;
		const newTrip = getNewTrip(trip);
		newTrip.days[dayIndex].markers[markerIndex] = newCurrentMarker;
		setTrip(newTrip);
	};

	const infoChange = (val, markerId) => {
		const newMarker = { ...markerNow, ...val };
		console.log(newMarker);
		const newMarkers = [];
		markers.forEach((v) => {
			if (v.id !== markerId) newMarkers.push(v);
			else newMarkers.push(newMarker);
		});
		const newTrip = getNewTrip(trip);
		newTrip.days[dayIndex].markers = newMarkers;
		setTrip(newTrip);
	};

	const onDayClick = (index) => {
		const changeDayMarkers = trip.days[index].markers;
		// 기존 marker, path지우기
		if (path) {
			path.setMap(null);
		}
		markers.forEach((m) => {
			m.onDelete();
		});
		let bounds = new window.google.maps.LatLngBounds();
		let pathCoordinates = [];
		changeDayMarkers.forEach((m) => {
			m.onAppear();
			bounds.extend(m.marker.getPosition());
			pathCoordinates.push(m.marker.getPosition());
		});

		// draw path
		const newPath = new window.google.maps.Polyline({
			path: pathCoordinates,
			geodesic: true,
			strokeColor: '#FF0000',
			strokeOpacity: 0.2,
			strokeWeight: 6,
		});

		newPath.setMap(map);
		setPath(newPath);
		return setDayIndex(index);
	};

	const onAddDayClick = () => {
		// create new Day;
		const newDay = new DateInfo();
		// setTrip => add push new day into days;
		const newTrip = getNewTrip(trip);
		newTrip.days.push(newDay);

		return setTrip(newTrip);
	};

	const onRemoveDayClick = (rmIndex) => {
		if (rmIndex === 0) return;
		if (path) path.setMap(null);
		markers.forEach((m) => {
			m.marker.setMap(null);
		});
		const newDays = [];
		trip.days.forEach((v, index) => {
			if (Number(rmIndex) !== index) newDays.push({ ...v });
		});
		if (newDays.length === 0) newDays.push(new DateInfo());
		const newTrip = getNewTrip(trip);
		newTrip.days = newDays;
		onDayClick(0);
		return setTrip(newTrip);
	};
	return (
		<div className={Styles.container}>
			<div className={Styles.title}>Create</div>
			<input type='text' placeholder='Title' />
			<div className={Styles.summary}>
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
			<div className={Styles.daybox}>
				{trip.days.map((v, index) => {
					return (
						<div key={index} className={Styles.day}>
							<div
								className={Styles.day__btn}
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
				{markerNow && (
					<MarkerInfo
						currentMarker={markerNow}
						markerId={currentMarker}
						onMarkerDelete={onMarkerDelete}
						imgChange={imgChange}
						infoChange={infoChange}
					/>
				)}
			</div>

			<button className={Styles.save__btn}>save!</button>
		</div>
	);
};

export default Create;
