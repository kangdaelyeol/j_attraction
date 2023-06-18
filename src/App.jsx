import React, {useState} from 'react';
import Styles from './App.module.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Main from './components/main/Main';
import Header from './components/header/header';
import Create from './components/create/Create';

const App = ({firebase, fireStore}) => {
	const [isLogin, setLogin] = useState({
		uid:"12345",
		email: "kdy0510123@gmail.com",
		photoURL: ""
	});
	const onSignOut = async () => {
		const signOut = await firebase.signOut();
		if (signOut)
			setLogin({
				state: false,
			});
	};

	const onGoogleLogin = async () => {
		const info = await firebase.onLogin();
		console.log(info);
		// 	if (info) {
		// 		const {
		// 			user: { uid, email, photoURL },
		// 		} = info;
		// 	console.log('Login.jsx: ', uid);
		// 	setLogin({
		// 		uid,
		// 		email,
		// 		profile: photoURL,
		// 	});
		// }
	};

	
	// Login Logic handle? 
	return (
		<BrowserRouter>
			<div className={Styles.app}>
				<Routes>
					<Route path='/main' exact={true} element={<Main onGoogleLogin={onGoogleLogin} onSignOut={onSignOut} isLogin={isLogin} fireStore={fireStore} />} />
					<Route path='/create' exact={true} element={<Create />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
