import React, { useEffect, useRef, useState } from 'react';
const Gmap = () => {
	const ref = useRef(null);
	const [map, setMap] = useState();

	const onMapClick = (e) => {
		console.log(e);
	};


	useEffect(() => {
		if (ref.current && !map) {
			setMap(
				new window.google.maps.Map(ref.current, {
					center: { lat: 37.569227, lng: 126.9777256 },
					zoom: 16,
				})
			);
		}

    if (map) {
      map.addListener("click", onMapClick);
    }

    return () => {
      if (map) {
        map.removeListener("click", onMapClick);
      }
    }
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
