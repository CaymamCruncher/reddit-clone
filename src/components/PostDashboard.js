import { useState, useEffect, useContext } from "react";
import { getPosts } from "../utils/api.js";
import { UserContext } from "../context/UserContext";
import { changeScore } from "../utils/api.js";
import Post from "./Post.js";

function PostDashboard() {
	const [posts, updatePosts] = useState([]);
	const { user } = useContext(UserContext);

	useEffect(() => {
		console.log("rerender");
		getPosts().then((data) => updatePosts(data));
	}, []);

	function handleUpdateScore(post, value) {
		if (user !== "Guest") {
			changeScore(post.id, value, user).then((res) => updatePosts(res));
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
