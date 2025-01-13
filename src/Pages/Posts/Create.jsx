import Input from "../../Components/Input";
import Textarea from "../../Components/Textarea";
import Button from "../../Components/Button";
import Loading from "../../Components/Loading";

import { useState } from "react";
import { createPost } from "../../Controllers/PostController";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Create() {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});
	const [submitClicked, setSubmitClicked] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		content: "",
	});

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();

		try {
			await createPost(formData);

			toast.success("Post created successfully!");
			setFormData({ title: "", content: "" });

			navigate("/");
		} catch (errorMsgs) {
			setErrors(errorMsgs);
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <Loading />;

	return (
		<div
			className='mt-16 mb-12 w-3/4 mx-auto'
		>
			<header className='mb-12'>
				<h1 className='font-bold text-5xl mb-2'>Create Post</h1>
				<p className='text-white'>
					Share Your Thoughts and Ideas with the World
				</p>
			</header>
			<main className='mb-6'>
				<fieldset className='w-1/2 md:w-full mb-6'>
					<h1 className='text-sm mb-1'>Title</h1>
					<Input
						className='mb-2'
						placeholder='e.g. My First React Post'
						value={formData.title}
						onChange={(e) => {
							setFormData({ ...formData, title: e.target.value });
						}}
					/>
					{errors && errors.title && (
						<p className='text-red-500 text-sm'>{errors.title}</p>
					)}
				</fieldset>
				<fieldset className='w-1/2 md:w-full'>
					<h1 className='text-sm mb-1'>Content</h1>
					<Textarea
						className='mb-2'
						placeholder='e.g. This is a brief introduction to React...'
						value={formData.content}
						onChange={(e) => {
							setFormData({
								...formData,
								content: e.target.value,
							});
						}}
					/>
					{errors && errors.content && (
						<p className='text-red-500 text-sm'>{errors.content}</p>
					)}
				</fieldset>
			</main>
			<footer className='flex justify-end gap-3'>
				{submitClicked ? (
					<>
						<Button
							onClick={() => {
								setSubmitClicked(!submitClicked);
							}}
							className='bg-white/80 text-black text-sm font-normal'
						>
							Cancel
						</Button>
						<Button
							onClick={handleSubmit}
							type='submit'
							className='bg-green-500 text-white text-sm font-normal'
						>
							<FontAwesomeIcon
								className='mr-1'
								icon={faCheck}
							/>
							Confirm
						</Button>
					</>
				) : (
					<Button
						onClick={() => {
							setSubmitClicked(!submitClicked);
						}}
						className='bg-white text-black text-sm font-normal'
					>
						Submit
					</Button>
				)}
			</footer>
		</div>
	);
}
