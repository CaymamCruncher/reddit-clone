import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { calculateTime } from "../utils/api";
import { ReactComponent as Comment } from "../images/comment.svg";
import { ReactComponent as Upvote } from "../images/upvote.svg";
import { ReactComponent as Downvote } from "../images/downvote.svg";
import { ReactComponent as Edit } from "../images/edit.svg";

function Post(props) {
	const { post, updateScore, toggleAddComment } = props;
	const [time, updateTime] = useState({ value: "", type: "" });
	const [editTime, updateEditTime] = useState({ value: "", type: "" });
	const { user } = useContext(UserContext);
	const location = useLocation();
	useEffect(() => {
		updateTime(calculateTime(post.date));
		if (post.editedOn) {
			updateEditTime(calculateTime(post.editedOn));
		}
	}, [post]);
	useEffect(() => {
		try {
			let toggleComment = location.state;
			if (toggleComment) {
				toggleAddComment();
			}
		} catch {
			console.log("No comment");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<article className="post">
			<h2>
				<Link to={`/posts/${post.id}`}>{post.title}</Link>
			</h2>
			{post.type === "img" && <img alt={post.title} src="/placeholder.jpg" />}
			<small>
				Posted by {post.author} {time.value} {time.type} ago
			</small>
			{post.edited && (
				<small>
					Edited by {post.edited} {editTime.value} {editTime.type} ago
				</small>
			)}
			<p>{post.content}</p>
			<Link
				to={{ pathname: `/posts/${post.id}`, state: { showComments: true } }}
				onClick={toggleAddComment}
				className="post-icon"
			>
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
			{(user.name === post.author || user.id === "admin_account") && (
				<Link to={`/posts/${post.id}/edit`} className="post-icon">
					<Edit />
				</Link>
			)}
		</article>
	);
}

export default Post;
