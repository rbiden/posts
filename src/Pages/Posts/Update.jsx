import { useLocation } from "react-router-dom";
import { updatePost, deletePost } from "../../Controllers/PostController";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import Input from "../../Components/Input";
import Textarea from "../../Components/Textarea";
import Button from "../../Components/Button";
import Loading from "../../Components/Loading";

export default function Update() {
	const navigate = useNavigate();
	const { state } = useLocation();

	const [errors, setErrors] = useState(null);
	const [loading, setLoading] = useState(false);
	const [deleteClicked, setDeleteClicked] = useState(false);
	const [submitClicked, setSubmitClicked] = useState(false);
	const [buttonClicked, setButtonClicked] = useState(false);

	const [formData, setFormData] = useState({
		title: state.title,
		content: state.content,
		id: state.id,
	});

	const handleDelete = async (e) => {
		setDeleteClicked(false);
		e.preventDefault();

		if (deleteClicked) {
			try {
				await deletePost(state.id);

				toast.success("Post deleted successfully!");
				navigate("/");
			} catch (errorMsgs) {
				setErrors(errorMsgs);
			} finally {
				setSubmitClicked(false);
				setButtonClicked(false);
				setLoading(false);
			}
		}
	};

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();

		try {
			await updatePost(formData);

			toast.success("Post updated successfully!");
			navigate("/");
		} catch (errorMsgs) {
			setErrors(errorMsgs);
		} finally {
			setSubmitClicked(false);
			setButtonClicked(false);
			setLoading(false);
		}
	};

	if (loading) return <Loading />;

	return (
		<div className='mt-16 mb-12 w-3/4 mx-auto'>
			<header className='mb-12'>
				<h1 className='font-bold text-5xl mb-2'>Update Post</h1>
				<p className='text-white'>
					Modify Your Content and Keep It Fresh
				</p>
			</header>
			<main className='mb-6 space-y-6'>
				<fieldset>
					<h1 className='text-sm mb-1'>Title</h1>
					<Input
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
				<fieldset>
					<h1 className='text-sm mb-1'>Content</h1>
					<Textarea
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
				{buttonClicked ? (
					<>
						<Button
							onClick={() => {
								setDeleteClicked(!deleteClicked);
								setButtonClicked(!buttonClicked);
							}}
							className='bg-white/80 text-black text-sm font-normal'
						>
							Cancel
						</Button>
						<Button
							onClick={
								submitClicked ? handleSubmit : handleDelete
							}
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
					<>
						<Button
							onClick={() => {
								setDeleteClicked(!deleteClicked);
								setButtonClicked(!buttonClicked);
							}}
							className='bg-red-900 text-white text-sm font-normal'
						>
							Delete
						</Button>
						<Button
							onClick={() => {
								setSubmitClicked(!submitClicked);
								setButtonClicked(!buttonClicked);
							}}
							className='bg-white text-black text-sm font-normal'
						>
							Submit
						</Button>
					</>
				)}
			</footer>
		</div>
	);
}
