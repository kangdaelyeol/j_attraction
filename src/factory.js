// ISOString 형태를 client에 맞게 변형
// return data: Object{ relative, absolute }
const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const month = day * 30;
const year = day * 365;

export const modifyTime = (ISOString) => {
	const receivedTime = new Date(ISOString);
	const timeNow = new Date();
	const timeGapSec = Math.floor((timeNow - receivedTime) / 1000);

	// make Time Value to return
	const absolute = ISOString.slice(0, 10).replaceAll('-', '. ') + '.';
	let relative;

	let timeUnit;
	if (timeGapSec < minute) timeUnit = 'second';
	else if (timeGapSec < hour) timeUnit = 'minute';
	else if (timeGapSec < day) timeUnit = 'hour';
	else if (timeGapSec < month) timeUnit = 'day';
	else if (timeGapSec < year) timeUnit = 'month';
	else timeUnit = 'year';

	switch (timeUnit) {
		case 'second':
			if (timeUnit < 1000) relative = `방금 전`;
			else relative = `${timeGapSec}초 전`;
			break;
		case 'minute':
			relative = `${Math.floor(timeGapSec / minute)}분 전`;
			break;
		case 'hour':
			relative = `${Math.floor(timeGapSec / hour)}시간 전`;
			break;
		case 'day':
			relative = `${Math.floor(timeGapSec / day)}일 전`;
			break;
		case 'month':
			relative = `${Math.floor(timeGapSec / month)}개월 전`;
			break;
		case 'year':
			relative = `${Math.floor(timeGapSec / year)}년 전`;
			break;
		default:
			throw Error('time logic Error');
			break;
	}

	return {
		absolute,
		relative,
	};
};

// Method - modyfyTimeInComment / Recipe
// change ISOString of Time into format for client
export const modifyTimeInComment = (comments) => {
	for (let i = 0; i < comments.length; i++) {
		comments[i].createdAt = modifyTime(comments[i].createdAt);
		comments[i].updatedAt = modifyTime(comments[i].updatedAt);
	}
};

export const modifyTimeInTrip = (trips) => {
	for (let i = 0; i < trips.length; i++) {
		trips[i].createdAt = modifyTime(trips[i].createdAt);
	}
};

export const getNewTrip = (trip, info) => {
	// trip -> make new days (day[]);
	const newTrip = { ...trip, ...info };
	newTrip.picture = [...newTrip.picture];
	// day -> make new markers (marker[])
	const newDays = [...newTrip.days];

	// marker -> make new pictures (String[])

	// fix prev markers to new markers
	newDays.forEach((v, dayIndex) => {
		newDays[dayIndex].markers = [...v.markers];
		console.log(newDays[dayIndex].markers);
		// renew marker.picture([]) every time renew markers -> travasal markers
		newDays[dayIndex].markers.forEach((marker, markerIndex) => {
			newDays[dayIndex].markers[markerIndex] = { ...marker };
			newDays[dayIndex].markers[markerIndex].picture = [
				...newDays[dayIndex].markers[markerIndex].picture,
			];
		});
	});
	newTrip.days = newDays;
	return newTrip;
};

export const drawPath = (markers, map) => {
	let bounds = new window.google.maps.LatLngBounds();
	let pathCoordinates = [];
	markers.forEach((m) => {
		console.log(m.marker);
		m.onAppear();
		bounds.extend(m.marker.getPosition());
		pathCoordinates.push(m.marker.getPosition());
		console.log(m.marker.getPosition());
	});

	const newPath = new window.google.maps.Polyline({
		path: pathCoordinates,
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 0.2,
		strokeWeight: 6,
	});

	newPath.setMap(map);
	map.fitBounds(bounds);
	return newPath;
};

export const convertMarkers = (trip, map) => {
	const newTrip = { ...trip };
	console.log(newTrip);
	newTrip.days.forEach((day, dindex) => {
		day.markers.forEach((marker, mindex) => {
			const lat = marker.marker.lat;
			const lng = marker.marker.lng;
			console.log(lat, lng);
			const myLatlng = new window.google.maps.LatLng(lat, lng);
			console.log(myLatlng);
			const newM = new window.google.maps.Marker(
				{position: myLatlng}
			);
			newTrip.days[dindex].markers[mindex].marker = newM;
			newTrip.days[dindex].markers[mindex].onAppear = () => {
				newM.setMap(map);
			};
			newTrip.days[dindex].markers[mindex].onDelete = () => {
				newM.setMap(null);
			};
		});
	});
	return newTrip;
};

export const getMarkers = (trip, map) => {
	const newMarkers = [];
	trip?.days?.forEach((day) => {
		map && newMarkers.push([...day.markers]);
	});
	newMarkers.forEach((markers, msindex) => {
		markers.forEach((marker, mindex) => {
			const lat = marker.marker.lat;
			const lng = marker.marker.lng;
			console.log(lat, lng);
			const myLatlng = new window.google.maps.LatLng(lat, lng);
			console.log(myLatlng);
			const newM = new window.google.maps.Marker(
				{position: myLatlng}
			);

			newMarkers[msindex][mindex] = {...marker};
			newMarkers[msindex][mindex].onAppear = () => {
				newM.setMap(map);
			}
			newMarkers[msindex][mindex].onDelete = () => {
				newM.setMap(null);
			}
			newMarkers[msindex][mindex].marker = newM;
		})
	})

	return newMarkers;
}
