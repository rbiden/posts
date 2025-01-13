import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./Context/AppContext";

import "./App.css";

import Home from "./Pages/Posts/Home";
import Layout from "./Pages/Layout";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Update from "./Pages/Posts/Update";
import Create from "./Pages/Posts/Create";

export default function App() {
	const { token } = useContext(AppContext);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={<Layout />}
				>
					{/* Auth routes */}
					<Route
						path='register'
						element={token ? <Navigate to='/' /> : <Register />}
					></Route>
					<Route
						path='login'
						element={token ? <Navigate to='/' /> : <Login />}
					></Route>

					{/* Public routes */}
					<Route
						index
						element={token ? <Home /> : <Navigate to='/login' />}
					></Route>
					<Route
						path='posts/update'
						element={token ? <Update /> : <Navigate to='/login' />}
					/>
					<Route
						path='posts/create'
						element={token ? <Create /> : <Navigate to='/login' />}
					/>
					{/* <Route
						path='*'
						element={<NotFound />}
					/> */}
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
