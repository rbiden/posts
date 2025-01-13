import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../Components/Loading";

export const AppContext = createContext();

export default function AppProvider({ children }) {
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [user, setUser] = useState([]);
	const [loading, setLoading] = useState(false);

	async function getUser() {
		try {
			const res = await axios.get("/api/user", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			setUser(res.data);
		} catch (error) {
			const errorMsgs = error.response.data;
			toast.error(errorMsgs.message);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		if (token) {
			setLoading(true);
			getUser();
		}
	}, [token]);
	
	if (loading && user) return <Loading />;

	return (
		<AppContext.Provider value={{ token, setToken, user, setUser }}>
			{children}
		</AppContext.Provider>
	);
}
