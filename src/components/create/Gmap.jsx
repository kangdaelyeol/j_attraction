import React, { useCallback, useEffect, useRef, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { Marker } from '../../schema.js';
function getDetailsPromise(service, request) {
	return new Promise((resolve, reject) => {
		service.getDetails(request, (result, status) => {
			if (status === window.google.maps.places.PlacesServiceStatus.OK) {
				resolve(result);
			} else {
				reject(status);
			}
		});
	});
}

const InfoViewForMarker = ({ marker }) => {
	return (
		<div className='info__view'>
			<div className='h3'>{marker.getTitle()} 123412</div>
		</div>
	);
};

const Gmap = ({
	addMarker,
	setCurrentMarker,
	map,
	setMap,
}) => {
	const ref = useRef(null);

	// return mapName
	const getDetails = async (map, placeId) => {
		const request = {
			placeId: placeId,
			fields: ['name', 'rating', 'formatted_address', 'opening_hours'],
		};

		try {
			const service = new window.google.maps.places.PlacesService(map);
			const result = await getDetailsPromise(service, request);
			const { name } = result;

			return name;
		} catch (error) {
			console.error('Error occurred:', error);
		}
	};

	const onMapClick = useCallback(
		async (e) => {
			const lat = e.latLng.lat();
			const lng = e.latLng.lng();
			const placename = e.placeId ? await getDetails(map, e.placeId) : 'place';
			const myLatlng = new window.google.maps.LatLng(lat, lng);
			const marker = new window.google.maps.Marker({
				position: myLatlng,
				title: placename,
			});

			const newMarker = new Marker(marker);

			const infoViewContent = <InfoViewForMarker marker={marker} />;
			const infoWindow = new window.google.maps.InfoWindow({
				content: '<h1>dPdkf</h1>',
			});

			newMarker.marker.addListener('click', (e) => {
				infoWindow.open(map, marker);
				setCurrentMarker(newMarker.id);
			});

			newMarker.onDelete = () => {
				newMarker.marker.setMap(null);
			}
			newMarker.onAppear =() => {
				newMarker.marker.setMap(map);
			}
			infoWindow.setContent(renderToString(infoViewContent));
			newMarker.marker.setMap(map);

			addMarker(newMarker);
			setCurrentMarker(newMarker.id);
		},
		[addMarker, map, setCurrentMarker]
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
				window.google.maps.event.clearInstanceListeners(map);
			}
		};
	}, [ref, map, setMap, onMapClick]);
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
