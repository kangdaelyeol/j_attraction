import React, { useCallback, useEffect, useRef, useState } from 'react';
const Gmap = () => {
	const ref = useRef(null);
	const [map, setMap] = useState();
  const [markers, setMarkers] = useState([]);

	const onMapClick = useCallback ((e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const myLatlng = new window.google.maps.LatLng(lat, lng);
    const marker = new window.google.maps.Marker({
			position: myLatlng,
			title: 'Hello World!',
		});
    console.log(marker);
    marker.setMap(map);
    setMarkers(markers => {
      const newMarker = [...markers, marker];
      console.log(markers);
      if(newMarker.length > 5){
        newMarker[1].setMap(null);
        newMarker.shift();
      }
      return newMarker;
    })
	}, [map]);

  const onMouseMove = (e) => {
    console.log(e);
  }

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
      listenerMarker2 = map.addListener("dblclick", onMouseMove);
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
