import React, { useEffect, useRef, useState } from 'react';
import Styles from './detail.module.css';
import { Wrapper } from '@googlemaps/react-wrapper';
import Dmap from './Dmap';
import { drawPath, convertMarkers, getMarkers } from '../../factory.js';
const render = (status) => {
	return <h1>{status}</h1>;
};
const Detail = ({ trip, setDetail }) => {
	const [map, setMap] = useState();
	const [currentDay, setCurrentDay] = useState(0);
	const [markers, setMarkers] = useState(null);
	const [pindex, setPindex] = useState(0);
	const onDayClick = (dindex) => {
		setCurrentDay(dindex);
	};
	// markers 변환
	// eslint-disable-next-line no-mixed-operators
	// const newTrip = map && convertMarkers(trip, map) || null;
	// const dayMarkers = [];
	// newTrip?.days?.forEach((day) => {
	// 	map && dayMarkers.push([...day.markers]);
	// });
	// console.log(newTrip);

	// 매 currentDay 바뀔 때 마다 호출 -> path
	useEffect(() => {
		// 초기 마커 셋팅
		if (!markers && map) {
			const newMarkers = getMarkers(trip, map);
			setMarkers(newMarkers);
		}

		let path;
		if (map && markers) {
			path = drawPath(markers[currentDay], map);
		}

		// setLocation

		return () => {
			if (map && markers) {
				path?.setMap(null);
				markers[currentDay].forEach((m) => {
					m.onDelete();
				});
			}
		};
	}, [map, markers, currentDay]);

	const onPathClick = (ind) => {
		if (ind === pindex) return;
		setPindex(ind);
	};

	const boxRef = useRef();
	const [boxPosition, setBoxPosition] = useState(0);
	const LEFTUNIT = 300;
	const MAXLEFT =
		(markers?.[currentDay][pindex]?.picture.length - 1) * LEFTUNIT;
	const onLeftClick = () => {
		if (-MAXLEFT < boxPosition) return;
		boxRef.current.style.left = `${boxPosition + LEFTUNIT}px`;
		setBoxPosition((c) => c + LEFTUNIT);
	};

	const onRightClick = () => {
		if (-MAXLEFT >= boxPosition) return;
		boxRef.current.style.left = `${boxPosition - LEFTUNIT}px`;
		setBoxPosition((c) => c - LEFTUNIT);
	};
	useEffect(() => {
		boxRef.current.style.left = '0px';
	}, []);

	return (
		<div className={Styles.container}>
			<div className={Styles.detail}>
				<div className={Styles.map__container}>
					<div className={Styles.top}>
						<Wrapper
							apiKey={process.env.REACT_APP_GOOGLEMAP_API_KEY}
							render={render}
							libraries={['places']}
						>
							<Dmap map={map} setMap={setMap} trip={trip} />
						</Wrapper>
						<div className={Styles.day__detail}>
							<div className={Styles.daybox}>
								{trip?.days?.map((v, index) => {
									return (
										<div key={index} className={Styles.day}>
											<div
												className={`${Styles.day__btn} ${
													currentDay === index ? Styles.day__focus : ''
												}`}
												data-index={index}
												onClick={() => {
													onDayClick(index);
												}}
											>
												<span>Day {index + 1}</span>
											</div>
										</div>
									);
								})}
							</div>
							<div className={Styles.pathbox}>
								{markers?.[currentDay].map((m, ind) => {
									console.log(m);
									return (
										<div
											className={`${Styles.path} ${
												ind === pindex ? Styles.path__focus : ''
											}`}
											key={ind + 'path'}
											onClick={() => {
												onPathClick(ind);
											}}
										>
											{m.name}
										</div>
									);
								})}
							</div>
						</div>
					</div>
					<div className={Styles.info__detail}>
						<div className={Styles.body}>
							<div ref={boxRef} className={Styles.picture__box}>
								{markers?.[currentDay][pindex]?.picture.map((url, ind) => {
									return <img src={url} key={ind} alt='thumb' />;
								})}
							</div>
							<div className={Styles.left} onClick={onLeftClick}>
								{' '}
							</div>
							<div className={Styles.right} onClick={onRightClick}>
								{' '}
							</div>
						</div>

						<div className={Styles.path__info}>
              <span>{markers?.[currentDay][pindex]?.name}</span>
              <span>{markers?.[currentDay][pindex]?.time}, {markers?.[currentDay][pindex]?.cost}</span>
              <span>{markers?.[currentDay][pindex]?.description}</span>
            </div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Detail;
