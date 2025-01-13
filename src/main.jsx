import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";

import React from "react";
import App from "./App.jsx";
import AppProvider from "./Context/AppContext.jsx";
import PostProvider from "./Context/PostContext.jsx";
import ErrorBoundary from "./Components/ErrorBoundary.jsx";

import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<PostProvider>
			<AppProvider>
				<ToastContainer
					theme='colored'
					autoClose={3000}
					position='bottom-right'
				/>
				<ErrorBoundary>
					<App />
				</ErrorBoundary>
			</AppProvider>
		</PostProvider>
	</React.StrictMode>
);
