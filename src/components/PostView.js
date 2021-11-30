import { useState, Fragment, useEffect, useContext } from "react";
import { getPost, getComments, changeScore } from "../utils/api";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Post from "./Post";
import Comment from "./Comment";
import AddComment from "./AddComment";

function PostView(props) {
	const { id } = useParams();
	const [post, updatePost] = useState([]);
	const [comments, updateComments] = useState([]);
	const [addComment, updateAddComment] = useState(false);
	const { user, updateUser } = useContext(UserContext);

	useEffect(() => {
		getPost(id).then((res) => updatePost(res));
		getComments(id).then((res) => updateComments(res));
	}, [id, post]);

	function handleUpdateScore(post, value) {
		if (user.id !== "Guest") {
			changeScore(post.id, value, user).then((res) => {
				updatePost(res.posts.filter((p) => p.id === post.id)[0]);
				updateUser(res.user);
			});
		} else {
			alert("Please login to do that");
		}
	}

	function toggleAddComment() {
		updateAddComment(!addComment);
	}

	return (
		<Fragment>
			{post && (
				<Post
					post={post}
					updateScore={handleUpdateScore}
					toggleAddComment={toggleAddComment}
				/>
			)}
			{addComment && (
				<AddComment
					post={post}
					toggleAddComment={toggleAddComment}
					updatePost={updatePost}
				/>
			)}
			{comments && (
				<ul>
					{comments.map((comment) => (
						<Comment key={comment.id} comment={comment} />
					))}
				</ul>
			)}
		</Fragment>
	);
}

export default PostView;
