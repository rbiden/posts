import axios from "axios";
import { toast } from "react-toastify";

const token = localStorage.getItem("token");

// Helper function to handle API requests
const apiRequest = async (method, url, data = null) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		let response;
		if (method === "get") {
			response = await axios.get(url, config);
		} else if (method === "delete") {
			response = await axios.delete(url, config);
		} else if (method === "post") {
			response = await axios.post(url, data, config);
		} else if (method === "put") {
			response = await axios.put(url, data, config);
		} else {
			throw new Error({ all: "Unsupported method" });
		}

		return response.data;
	} catch (error) {
		const errorMsgs = error.response.data.errors;
		if (error.response && error.response.status === 429) {
			toast.error("Too many attempts. Please try again later.");
		} else if (errorMsgs && errorMsgs.all) {
			toast.error(errorMsgs.all);
		} else {
			toast.error("There was an error with your request. Try again.");
		}

		throw error.response ? errorMsgs : error;
	}
};

const getAllPosts = () => apiRequest("get", "/api/posts");

const createPost = (formData) => apiRequest("post", "/api/posts", formData);

const getPost = (id) => apiRequest("get", `/api/posts/${id}`);

const updatePost = (formData) =>
	apiRequest("put", `/api/posts/${formData.id}`, formData);

const deletePost = (id) => apiRequest("delete", `/api/posts/${id}`);

export { getAllPosts, createPost, getPost, updatePost, deletePost };
