import React from 'react';
import Styles from './home.module.css';
import Content from "../content/Content";

const Home = ({trips}) => {
	// get Trips for contents
	

	// make Logic -> contents -> per 10 infinite scroll
	return (
		<div className={`${Styles.home}`}>
			{trips ? trips.map((trip, ind) => <Content key={ind} trip={trip}/>) : <div className="loadingComp">loading</div>}
		</div>
	);
};

export default Home;