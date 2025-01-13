import { Link } from "react-router-dom";

export default function Post({ post }) {
	return (
		<div className='bg-secondary rounded-xl border-2 border-primary py-5 px-3 flex-1 min-h-56 flex flex-col'>
			<h1 className='text-2xl font-bold mb-2'>{post.title}</h1>
			<p className='font-light text-sm'>
				{post.content.substring(0, 80) +
					(post.content.length > 80 ? "..." : "")}
			</p>
			<div className='flex justify-end gap-2 mt-auto'>
				<Link
					state={post}
					to='posts/update'
					className='bg-primary hover:bg-violet-700/50 text-xs font-normal py-2 px-3 rounded'
				>
					More
				</Link>
			</div>
		</div>
	);
}
