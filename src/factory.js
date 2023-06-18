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
			if(timeUnit < 1000)
			relative = `방금 전`;
			else
			relative = `${timeGapSec}초 전`;
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
}

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


