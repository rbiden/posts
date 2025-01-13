import { createContext, useState } from "react";

export const PostContext = createContext();

export default function PostProvider({ children }) {
	const [posts, setPosts] = useState([]);

	return (
		<PostContext.Provider value={{ posts, setPosts }}>
			{children}
		</PostContext.Provider>
	);
}
