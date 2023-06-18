import React, { useState, useRef } from 'react';
import Styles from './create.module.css';
import Day from './Day';
import { Wrapper } from '@googlemaps/react-wrapper';
import Gmap from './Gmap';
import { Trip, DateInfo, DBModel } from '../../schema.js';
import MarkerInfo from './MarkerInfo';
import { getNewTrip } from '../../factory.js';
import { cloudinaryService } from '../../service.js';
/** required
 * google Map
 * title
 * summary(people, location, days, weather, budget, category)
 * Day[1, 2, 3]
 * * route (locations of places)
 * * place (spendingTime, price, des), moving(way, spendingtime, tips), pictures[]
 */

const cloudinary = new cloudinaryService();
const dbModel = new DBModel();

//for GoogleMap
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
	const [pictures, setPicture] = useState([]);
	const [currentPicture, setCurrentPicture] = useState(null);
	// value for reducing duplicated code -> to access rapidly
	const currentDay = trip?.days[dayIndex];
	const markers = currentDay?.markers;
	const fileRef = useRef();
	const markerNow = markers?.find((v) => {
		return v.id === currentMarker;
	});

	const addMarker = (marker) => {
		//기존 path 지우기
		if (path) path.setMap(null);
		const newMarkers = [];
		markers?.forEach((v) => {
			newMarkers.push({ ...v });
		});
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

	const markerPicturesChange = (pictures) => {
		// get new trip -> renew pictures info
		const newTrip = getNewTrip(trip);

		// change trip: getNewTrip -> setTrip;
		const m_index = markers.indexOf(markerNow);
		newTrip.days[dayIndex].markers[m_index].picture = pictures;
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

	// ************* for File Input *********************
	const onUploadClick = (e, ind) => {
		// e.preventDefault();
		fileRef.current.click({ ind });
	};

	const onFileInput = async () => {
		const files = fileRef.current.files;
		const imgIndex = currentPicture || pictures.length;
		setPicture((current) => {
			const newPictures = [...current];
			newPictures[imgIndex] = 'loading';
			return newPictures;
		});

		// 클라우드서비스 파일 인풋 await -> url 받아오기
		try {
			const fileInfo = await cloudinary.uploadFile(files);
			const newFileUrl = fileInfo.url;

			// url 셋팅
			setPicture((current) => {
				const newPictures = [...current];
				newPictures[imgIndex] = newFileUrl;
				return newPictures;
			});
		} catch (e) {
			console.log(e);
			setPicture((current) => {
				const newPictures = [...current];
				newPictures.splice(imgIndex + 1, 1);
				return newPictures;
			});
		}
	};

	const onPictureClick = (ind) => {
		setCurrentPicture(ind);
	};

	const onPictureOver = () => {
		if (currentPicture !== null) setCurrentPicture(null);
	};

	const onEditPicture = () => {
		// index - currentPicture
		fileRef.current.click();
	};

	const onRmPicture = () => {
		const newPicture = [...pictures];
		newPicture.splice(currentPicture, 1);
		setPicture(newPicture);
	};

	const onSaveClick = () => {
		dbModel.createTripInDB(trip, 'rkdeofuf', pictures);
	};

	return (
		<div className={Styles.container}>
			<div className={Styles.title}>Create</div>
			<div className={Styles.title__input}>
				<span>제목: </span>
				<input type='text' placeholder='Title' />
			</div>
			<div className={Styles.summary}>
				<span>정보: </span>
				<select name='season' id='season'>
					<option className={Styles.season__tag} value=''>
						계절
					</option>
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
				className={Styles.introduction}
				cols='30'
				rows='4'
				placeholder='간단한 여행 소개'
			></textarea>
			<span>사진</span>
			<div className={Styles.picture__box}>
				{pictures.map((v, ind) => {
					return (
						<div
							className={Styles.picture}
							onClick={(e) => {
								onPictureClick(ind);
							}}
							data-index={ind}
							key={ind}
						>
							<div
								className={`${Styles.picture__img} ${
									currentPicture === ind ? Styles.img__focus : ''
								}`}
							>
								<button className={Styles.picture__ed} onClick={onEditPicture}>
									Edit
								</button>
								<button className={Styles.picture__rm} onClick={onRmPicture}>
									Remove
								</button>
								{v === 'loading' ? (
									<div className={Styles.loading}></div>
								) : (
									<img
										className={Styles.picture__content}
										src={v}
										alt='thumb'
									/>
								)}
							</div>
						</div>
					);
				})}
				<div
					className={Styles.picture}
					onMouseMove={onPictureOver}
					onClick={onUploadClick}
				>
					<div className={Styles.picture__img}> + </div>
				</div>
				<input
					className={Styles.upload}
					ref={fileRef}
					type='file'
					accept='image/*'
					onInput={onFileInput}
				/>
			</div>
			<span>일정</span>
			<div className={Styles.daybox}>
				{trip.days.map((v, index) => {
					return (
						<div key={index} className={Styles.day}>
							<div
								className={`${Styles.day__btn} ${
									dayIndex === index ? Styles.day__focus : ''
								}`}
								data-index={index}
								onClick={() => {
									onDayClick(index);
								}}
							>
								<span>Day {index + 1}</span>
							</div>
							<button
								onClick={(e) => {
									onRemoveDayClick(index);
								}}
							>
								<span>Remove day {index + 1}</span>
							</button>
						</div>
					);
				})}
				<div onClick={onAddDayClick} className={Styles.day}>
					Add Day
				</div>
			</div>
			<div className={Styles.map__bottom}>
				<Day
					info={currentDay}
					index={dayIndex}
					markers={markers}
					currnetMarker={currentMarker}
					setCurrentMarker={setCurrentMarker}
				/>
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
				<div className='marker__info'>
					{markerNow && (
						<MarkerInfo
							currentMarker={markerNow}
							markerId={currentMarker}
							onMarkerDelete={onMarkerDelete}
							imgChange={imgChange}
							infoChange={infoChange}
							markerPicturesChange={markerPicturesChange}
						/>
					)}
				</div>
			</div>

			<button onClick={onSaveClick} className={Styles.save__btn}>
				save!
			</button>
		</div>
	);
};

export default Create;
