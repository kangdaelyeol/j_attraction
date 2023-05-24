import Styles from './App.module.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Main from "./components/main/Main";
import Header from './components/header/header';
import Create from './components/create/Create';

function App() {
	return (
		<BrowserRouter>
			<div className={Styles.app}>
				<Header />
        <Routes>
          <Route path='/login' exact={true} element={<Login />} />
          <Route path='/main' exact={true} element={<Main />} />
					<Route path='/create' exact={true} element={<Create />} />
        </Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
