import React, { useCallback, useEffect, useRef, useState } from 'react';
import { renderToString } from 'react-dom/server';
import ReactDOM from 'react-dom';

const InfoViewForMarker = ({ marker, removeMarker }) => {
	
	return (
		<div className='info__view'>
			<div className='h3'>{marker.getTitle()}</div>
			<button className='rm' onClick={(e) => removeMarker(e)}>
				remove 제발 십라
			</button>
		</div>
	);
};

const Gmap = ({markers, setMarkers, currentMarker, setCurrentMarker, map, setMap}) => {
	const ref = useRef(null);
	
	
	
	
	const getDetails = async (map, placeId) => {
		const request = {
			placeId: placeId,
			fields: ['name', 'rating', 'formatted_address', 'opening_hours'],
		};

			new window.google.maps.places.PlacesService(map).getDetails(
				request,
				(result, _) => {
					console.log(result, _);
          const {formatted_address, name} = result;
          const placeInfo = {formatted_address, name};
				}
			);
	};
	
	console.log("currentMarker:",currentMarker, markers.indexOf(currentMarker));

	const onMapClick = useCallback(
		async (e) => {
			console.log(e);
			const lat = e.latLng.lat();
			const lng = e.latLng.lng();
			const myLatlng = new window.google.maps.LatLng(lat, lng);
			const marker = new window.google.maps.Marker({
				position: myLatlng,
				title: 'Hello World!',
			});

			// getDetails
			if (e.placeId) await getDetails(map, e.placeId);

			const removeMarker = () => {
				marker.setMap(null);
				setMarkers((markers) => markers.filter((m) => m !== marker));
			};

			const infoViewContent = (
				<InfoViewForMarker marker={marker} removeMarker={removeMarker} />
			);
			const infoWindow = new window.google.maps.InfoWindow({
				content: '',
			});

			marker.addListener('click', (e) => {
				console.log(e);
				infoWindow.open(map, marker);
				setCurrentMarker(marker);
			});

			infoWindow.setContent(renderToString(infoViewContent));
			marker.label = '123';
			console.log(marker);
			marker.setMap(map);

			setMarkers((markers) => {
				const newMarker = [...markers, marker];
				return newMarker;
			});
		},
		[map]
	);

	const onMouseMove = (e) => {
		console.log(e);
	};

	useEffect(() => {
		if (ref.current && !map) {
			setMap(
				new window.google.maps.Map(ref.current, {
					center: { lat: 37.569227, lng: 126.9777256 },
					zoom: 16,
					mapTypeControl: true,
					mapTypeControlOptions: {
						style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU,
						mapTypeIds: ['roadmap', 'terrain'],
					},
				})
			);
		}
		let listenerMarker1;
		let listenerMarker2;
		if (map) {
			listenerMarker1 = map.addListener('click', onMapClick);
			listenerMarker2 = map.addListener('dblclick', onMouseMove);
		}

		return () => {
			if (map) {
				window.google.maps.event.clearListeners(listenerMarker1);
				window.google.maps.event.clearListeners(listenerMarker2);
			}
		};
	}, [ref, map]);
	return (
		<div className='map'>
			<div
				ref={ref}
				style={{
					height: '400px',
					width: '800px',
				}}
			></div>
		</div>
	);
};

export default Gmap;
