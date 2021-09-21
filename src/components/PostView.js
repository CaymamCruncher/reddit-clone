import { useState, Fragment, useEffect, useContext } from "react";
import { getPost, getComments, changeScore } from "../utils/api";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Post from "./Post";
import Comment from "./Comment";

// TODO: Add update score in here

function PostView(props) {
	const { id } = useParams();
	const [post, updatePost] = useState([]);
	const [comments, updateComments] = useState([]);
	const { user } = useContext(UserContext);

	useEffect(() => {
		getPost(id).then((res) => updatePost(res));
		getComments(id).then((res) => updateComments(res));
	}, [id]);

	function handleUpdateScore(post, value) {
		if (user.id !== "Guest") {
			changeScore(post.id, value, user).then((res) =>
				updatePost(res.filter((p) => p.id === post.id)[0])
			);
		} else {
			alert("Please login to do that");
		}
	}

	return (
		<Fragment>
			{post && <Post post={post} updateScore={handleUpdateScore} />}
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
