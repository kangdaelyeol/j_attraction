import React, { useEffect } from 'react';
import Styles from './header.module.css';
import { useNavigate } from 'react-router';

const Header = ({ isLogin, setLogin, firebase }) => {
	const navigate = useNavigate();
	useEffect(() => {
		if (!isLogin) {
			firebase.checkLoginState(setLogin);
		}
	}, [isLogin, setLogin, firebase, navigate]);

	const onTitleClick = () => {
		navigate('/main');
	};
	return (
		<div className={Styles.container}>
			<div className={Styles.logo}>logo</div>
			<div onClick={onTitleClick} className={Styles.title}>
				JAT
			</div>
			<div className='right'>
				{isLogin ? <div className={Styles.login}>Sign in</div> : <div className={Styles.login}>Sign out</div>}
			</div>
		</div>
	);
};

export default Header;
