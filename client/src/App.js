import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
// import './App.css';

import MenuBar from './components/MenuBar.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';

function App() {
	return (
		<Router>
			<MenuBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</Router>
	);
}

export default App;
