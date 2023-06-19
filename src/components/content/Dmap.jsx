import React, {useRef, useEffect} from "react";


const Dmap = ({
	map,
	setMap,
  trip
}) => {
	const ref = useRef(null);


	useEffect(() => {
		if (ref.current && !map) {
			setMap(
				new window.google.maps.Map(ref.current, {
					center: { lat: 35.681135123999454, lng: 139.7646548648397 },
					zoom: 14,
					mapTypeControl: true,
					mapTypeControlOptions: {
						style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU,
						mapTypeIds: ['roadmap', 'terrain'],
					},
				})
			);
		}
		return () => {
			if (map) {
				window.google.maps.event.clearInstanceListeners(map);
			}
		};
	}, [ref, map, setMap]);
	return (
		<div className='map'>
			<div
				ref={ref}
				style={{
          width: '500px',
					height: '250px'
				}}
			></div>
		</div>
	);
};

export default Dmap;
