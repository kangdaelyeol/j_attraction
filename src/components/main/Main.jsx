import React, { useState } from 'react';
import Styles from './main.module.css';
import Home from '../home/Home';
import Recommend from '../recommend/Recommend';
import Recent from '../recent/Recent';
import { useNavigate } from 'react-router';
const Main = () => {
	const [info, setInfo] = useState('home');
	const navigate = useNavigate();
	const onInfoClick = (e) => {
		const infoName = e.target.dataset.name;
		if (infoName === info) return;
		else return setInfo(infoName);
	};

	const onNavClick = (e) => {
		const loc = e.target.dataset.name;
		navigate(`/${loc}`);
	};
	
	return (
		<div className={Styles.container}>
			<div className={Styles.nav}>
				<div className={Styles.top}>
					<div onClick={onInfoClick} data-name='home' className={Styles.home}>
						home
					</div>
					<div
						onClick={onInfoClick}
						data-name='recent'
						className={Styles.recent}
					>
						최신 여행
					</div>
					<div
						onClick={onInfoClick}
						data-name='recommend'
						className={Styles.recommend}
					>
						추천 여행
					</div>
				</div>
				<div className={Styles.bottom}>
					<div
						onClick={onNavClick}
						data-name='profile'
						className={Styles.profile}
					>
						내 정보
					</div>
					<div
						onClick={onNavClick}
						data-name='mytrip'
						className={Styles.mytrip}
					>
						내 여행
					</div>
					<div
						onClick={onNavClick}
						data-name='create'
						className={Styles.enroll}
					>
						여행 등록
					</div>
					<div
						onClick={onNavClick}
						data-name='search'
						className={Styles.search}
					>
						여행 검색
					</div>
				</div>
			</div>
			<div className={Styles.main}>
				{info === 'home' ? (
					<Home viewName={info} />
				) : info === 'recent' ? (
					<Recent viewName={info} />
				) : (
					<Recommend viewName={info} />
				)}
			</div>
		</div>
	);
};

export default Main;
