import React from 'react';
import Styles from './main.module.css';
import Home from '../home/Home';
import Recommend from '../recommend/Recommend';
import Recent from '../recent/Recent';
const Main = () => {
	return (
		<div>
			<div className='nav'>
				<div className='top'>
					<div className='profile'>내 정보</div>
					<div className='mytrip'>내 여행</div>
					<div className='enroll'>여행 등록</div>
					<div className='search'>여행 검색</div>
				</div>
				<div className='bottom'>
					<div className='home'>home</div>
					<div className='recent'>최신 여행</div>
					<div className='recommend'>추천 여행</div>
				</div>
			</div>
			<div className='main'>
				<Home />
				<Recent />
				<Recommend />
			</div>
		</div>
	);
};

export default Main;
