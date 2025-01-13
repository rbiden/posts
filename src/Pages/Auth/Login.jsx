import Button from "../../Components/Button";
import Input from "../../Components/Input";
import axios from "axios";

import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
	const navigate = useNavigate();
	const { token, setToken } = useContext(AppContext);
	

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post("/api/login", formData);

			toast.success("Logged in successfully!");
			localStorage.setItem("token", res.data.token);
			setToken(res.data.token);

			navigate("/");
		} catch (error) {
			if (error.status === 429) {
				toast.error("Too many attempts. Please try again later.");
				return;
			}

			const errorMsgs = error.response.data.errors;
			setErrors(errorMsgs);

			if (errorMsgs && errorMsgs.all) {
				toast.error(errorMsgs.all);
			}
		}
	};

	return (
		<main className='w-1/2 mx-auto mt-6 mb-12'>
			<h1 className='font-bold text-6xl text-white mb-4 text-center'>
				Login
			</h1>
			<p className='mb-4 font-light text-center'>
				Enter your details to access your account
			</p>
			<form
				onSubmit={handleSubmit}
				className='bg-primary rounded-xl px-4 py-6 border-2 border-primary mb-4'
			>
				<main className='mb-8 space-y-4'>
					<fieldset className='mb-2 space-y-1'>
						<h1 className='font-semibold'>Email Address</h1>
						<Input
							value={formData.email || ""}
							onChange={(e) =>
								setFormData({
									...formData,
									email: e.target.value,
								})
							}
						/>
						{errors && errors.email && (
							<p className='text-red-500 text-sm'>
								{errors.email[0]}
							</p>
						)}
					</fieldset>

					<fieldset className='mb-2 space-y-1'>
						<h1 className='font-semibold'>Password</h1>
						<Input
							type='password'
							value={formData.password || ""}
							onChange={(e) =>
								setFormData({
									...formData,
									password: e.target.value,
								})
							}
						/>
						{errors && errors.password && (
							<p className='text-red-500 text-sm'>
								{errors.password[0]}
							</p>
						)}
					</fieldset>
				</main>

				<Button className='w-full bg-white text-black font-bold text-lg hover:bg-white/70 transition-all duration-300'>
					Submit
				</Button>
			</form>
			<p className='text-center text-sm text-gray-300'>
				Don&apos;t have an account?{" "}
				<a
					href='/register'
					className='font-semibold text-white hover:text-white/80'
				>
					Register
				</a>
			</p>
		</main>
	);
}
