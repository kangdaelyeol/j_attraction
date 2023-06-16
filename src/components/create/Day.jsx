import React from 'react';
import Styles from './day.module.css';

const Day = ({ info, index, markers, currnetMarker, setCurrentMarker }) => {
	const onRouteClick = (id) => {
		setCurrentMarker(id);
	};
	return (
		<div className={Styles.container}>
			<span className={Styles.title}>경로 </span>
			<div className={Styles.route__box}>
				{markers.map((m, ind) => {
					return (
						<div key={ind} className={Styles.route}>
							<div
								className={`${Styles.route__btn} ${m.id === currnetMarker ? Styles.route__focus : ""}`}
								onClick={() => {
									onRouteClick(m.id);
								}}
							>
								{m.name}
							</div>
							{ind < markers.length - 1 ? <div className={Styles.next}> -{'>'} </div> : "" }
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Day;
