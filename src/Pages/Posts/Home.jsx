import { useContext, useEffect, useState } from "react";
import { PostContext } from "../../Context/PostContext";
import { getAllPosts } from "../../Controllers/PostController";
import Loading from "../../Components/Loading";
import Posts from "../../Components/Posts";

export default function Home() {
	const { posts, setPosts } = useContext(PostContext);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(async () => {
			try {
				const data = await getAllPosts();
				setPosts(data);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		}, 1000);
	}, []);

	if (loading) return <Loading />;

	return (
		<div>
			<h1 className='font-bold text-5xl mb-5'>All Posts</h1>
			{posts[0] ? (
				<Posts posts={posts} />
			) : (
				<h1 className='text-gray-400'>
					You haven&apos;t created any posts yet. Start by sharing your
					first one!
				</h1>
			)}
		</div>
	);
}
