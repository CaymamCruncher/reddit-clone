import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Post(props) {
	const { post, updateScore } = props;
	const { user } = useContext(UserContext);
	return (
		<article className="container post">
			<h2>
				<Link to={`/posts/${post.id}`}>{post.title}</Link>
			</h2>
			{post.type === "img" && <img alt={post.title} src="/placeholder.jpg" />}
			<small>
				Posted by {post.author} on {post.date}{" "}
			</small>
			<p>{post.content}</p>
			<small>Number of Comments {post.numOfComments}</small>
			<small>
				{user.votedPosts[post.id] === 1 ? (
					<button
						className="active-upvote"
						onClick={() => updateScore(post, 1)}
					>
						Upvote
					</button>
				) : (
					<button onClick={() => updateScore(post, 1)}>Upvote</button>
				)}
				{post.score}
				{user.votedPosts[post.id] === -1 ? (
					<button
						className="active-downvote"
						onClick={() => updateScore(post, -1)}
					>
						Downvote
					</button>
				) : (
					<button onClick={() => updateScore(post, -1)}>Downvote</button>
				)}
			</small>
		</article>
	);
}

export default Post;
