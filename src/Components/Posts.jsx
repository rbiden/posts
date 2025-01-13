import Post from "./Post";

export default function Posts({ posts }) {
	return (
		<main className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{posts.map((post, index) => (
				<Post
					key={index}
					post={post}
				/>
			))}
		</main>
	);
}
