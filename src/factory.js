export const getNewTrip = (trip) => {
	// trip -> make new days (day[]);
	const newTrip = { ...trip };
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
