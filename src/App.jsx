import Styles from './App.module.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Main from "./components/main/Main";
import Header from './components/header/header';

function App() {
	return (
		<BrowserRouter>
			<div className={Styles.app}>
				<Header />
        <Routes>
          <Route path='/login' exact={true} element={<Login />} />
          <Route path='/main' exact={true} element={<Main />} />
        </Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
