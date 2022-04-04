import { useState, useEffect, useContext } from "react";
import { getPosts, getFilteredPosts } from "../utils/api.js";
import { UserContext } from "../context/UserContext";
import { changeScore } from "../utils/api.js";
import Post from "./Post.js";

function PostDashboard(props) {
	const [posts, updatePosts] = useState([]);
	const { user, updateUser } = useContext(UserContext);
	const { filter } = props;

	useEffect(() => {
		console.log("rerender");
		if (filter !== "") {
			getFilteredPosts(filter).then((data) => updatePosts(data));
		} else {
			getPosts().then((data) => updatePosts(data));
		}
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
