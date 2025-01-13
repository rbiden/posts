import Button from "../../Components/Button";
import Input from "../../Components/Input";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	});

	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await axios.post("/api/register", formData);
			toast.success("Successfully registered");
			navigate("/");
		} catch (error) {
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
				Register
			</h1>
			<p className='mb-4 font-light text-center'>
				We just need a handful of details from you
			</p>
			<form
				onSubmit={handleSubmit}
				className='bg-primary rounded-xl px-4 py-6 border-2 border-primary mb-4'
			>
				<main className='mb-8 space-y-4'>
					<fieldset className='mb-2 space-y-1'>
						<h1 className='font-semibold'>Full Name</h1>
						<Input
							value={formData.name}
							onChange={(e) =>
								setFormData({
									...formData,
									name: e.target.value,
								})
							}
						/>
						{errors.name && (
							<p className='text-red-500 text-sm'>
								{errors.name[0]}
							</p>
						)}
					</fieldset>

					<fieldset className='mb-2 space-y-1'>
						<h1 className='font-semibold'>Email Address</h1>
						<Input
							type='email'
							value={formData.email}
							onChange={(e) =>
								setFormData({
									...formData,
									email: e.target.value,
								})
							}
						/>
						{errors.email && (
							<p className='text-red-500 text-sm'>
								{errors.email[0]}
							</p>
						)}
					</fieldset>

					<fieldset className='mb-2 space-y-1'>
						<h1 className='font-semibold'>Password</h1>
						<Input
							type='password'
							value={formData.password}
							onChange={(e) =>
								setFormData({
									...formData,
									password: e.target.value,
								})
							}
						/>
						{errors.password && (
							<p className='text-red-500 text-sm'>
								{errors.password[0]}
							</p>
						)}
					</fieldset>

					<fieldset className='mb-2 space-y-1'>
						<h1 className='font-semibold'>Confirm Password</h1>
						<Input
							type='password'
							value={formData.password_confirmation}
							onChange={(e) =>
								setFormData({
									...formData,
									password_confirmation: e.target.value,
								})
							}
						/>
					</fieldset>
				</main>

				<Button className='w-full bg-white text-black font-bold text-lg hover:bg-white/70 transition-all duration-300'>
					Submit
				</Button>
			</form>
			<p className='text-center text-sm text-gray-300'>
				Already have an account?{" "}
				<a
					href='/login'
					className='font-semibold text-white hover:text-white/80'
				>
					Login
				</a>
			</p>
		</main>
	);
}
