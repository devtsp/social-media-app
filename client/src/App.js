import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import MenuBar from './components/MenuBar';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';

function App() {
	return (
		<Router>
			<Routes>
				<MenuBar />
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</Router>
	);
}

export default App;
