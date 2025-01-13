import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

import NavLink from "../Components/NavLink";
import axios from "axios";
import { toast } from "react-toastify";

export default function Layout() {
	const pathname = useLocation().pathname;
	const { token, user, setUser } = useContext(AppContext);
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			const res = await axios.post(
				"/api/logout",
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			localStorage.removeItem("token");
			toast.success(res.data.message);
			setUser({});

			navigate("/login");
		} catch (error) {
			toast.error("An error occurred.");
			console.error(error);
		}
	};

	return (
		<>
			<header>
				<nav className='border-b border-secondary pl-8 pr-6 py-4 flex justify-between'>
					<NavLink
						to='/'
						text='Home'
					/>
					{user.id ? (
						<div className='flex items-center gap-5'>
							<NavLink
								to='/posts/create'
								text='New Post'
							/>
							<button onClick={handleLogout}>
								<FontAwesomeIcon
									className='text-red-500 mt-1 text-2xl hover:text-red-700'
									icon={faPowerOff}
								/>
							</button>
						</div>
					) : (
						pathname !== "/login" &&
						pathname !== "/register" && (
							<div className='flex items-center'>
								<NavLink
									to='/login'
									text='Login'
								/>
								<NavLink
									to='/register'
									text='Register'
								/>
							</div>
						)
					)}
				</nav>
			</header>

			<main className='py-6 px-12 md:px-20 text-white'>
				<Outlet />
			</main>
		</>
	);
}
