import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { ReactComponent as Comment } from "../images/comment.svg";
import { ReactComponent as Upvote } from "../images/upvote.svg";
import { ReactComponent as Downvote } from "../images/downvote.svg";

function Post(props) {
	const { post, updateScore, toggleAddComment } = props;
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
			{post.edited && (
				<small>
					Edited by {post.edited} on {post.editedOn}
				</small>
			)}
			<p>{post.content}</p>
			<Link to={`/posts/${post.id}/comment`} className="post-icon">
				<Comment />
			</Link>
			<small>{post.numOfComments}</small>
			<button
				className={
					user.votedPosts[post.id] === 1
						? "active-upvote upvote post-icon"
						: "upvote post-icon"
				}
				onClick={() => updateScore(post, 1)}
			>
				<Upvote />
			</button>
			<small>{post.score}</small>
			<button
				className={
					user.votedPosts[post.id] === -1
						? "active-downvote downvote post-icon"
						: "downvote post-icon"
				}
				onClick={() => updateScore(post, -1)}
			>
				<Downvote />
			</button>
			{toggleAddComment && (
				<button onClick={toggleAddComment}>Add Comment</button>
			)}
			{(user.name === post.author || user.id === "admin_account") && (
				<Link to={`/posts/${post.id}/edit`}>Edit Post</Link>
			)}
		</article>
	);
}

export default Post;
