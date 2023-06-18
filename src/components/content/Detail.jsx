import React, { useEffect, useState } from 'react';
import Styles from './detail.module.css';
import { Wrapper } from '@googlemaps/react-wrapper';
import Dmap from './Dmap';
import { drawPath, convertMarkers } from '../../factory.js';
const render = (status) => {
	return <h1>{status}</h1>;
};
const Detail = ({ trip, setDetail }) => {
	const [map, setMap] = useState();
  const [currentDay, setCurrentDay] = useState(0);

	// markers 변환
  const newTrip = map && convertMarkers(trip);
  const dayMarkers = [];
  newTrip?.days?.forEach(day => {
    map && dayMarkers.push(day.markers);
  })
  console.log(dayMarkers)

  // 매 currentDay 바뀔 때 마다 호출
  useEffect(() => {
    let path;
    if(map){  
        path = drawPath(dayMarkers[currentDay], map);
    }
    return () => {
      path?.setMap(null);
    }
  }, [map, currentDay, dayMarkers])

	// days -> addeventListener(받아온 map객체에다가) -> markers색칠, location 셋팅

	return (
		<div className='container'>
			<div className='map__container'>
				<Wrapper
					apiKey={process.env.REACT_APP_GOOGLEMAP_API_KEY}
					render={render}
					libraries={['places']}
				>
					<Dmap
						map={map}
						setMap={setMap}
            trip={trip}
					/>
				</Wrapper>
			</div>
		</div>
	);
};

export default Detail;
