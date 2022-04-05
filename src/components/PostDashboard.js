import { useState, useEffect, useContext } from "react";
import { getPosts, getFilteredPosts } from "../utils/api.js";
import { UserContext } from "../context/UserContext";
import { changeScore } from "../utils/api.js";
import { useLocation } from "react-router-dom";
import Post from "./Post.js";

function PostDashboard() {
	const [posts, updatePosts] = useState([]);
	const { user, updateUser } = useContext(UserContext);
	const location = useLocation();
	const filter = location.state;

	useEffect(() => {
		console.log(filter);
		if (filter) {
			getFilteredPosts(filter).then((data) => updatePosts(data));
			console.log(posts);
		} else {
			getPosts().then((data) => updatePosts(data));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter]);

	function handleUpdateScore(post, value) {
		if (user.id !== "Guest") {
			changeScore(post.id, value, user).then((res) => {
				updatePosts(res.posts);
				updateUser({
					id: res.user.id,
					name: res.user.username,
					votedPosts: res.user.votedPosts,
				});
			});
		} else {
			alert("Please login to do that");
		}
	}

	return (
		<ul>
			{posts.map((post) => (
				<li key={post.id}>
					<Post post={post} updateScore={handleUpdateScore} />
				</li>
			))}
		</ul>
	);
}

export default PostDashboard;
