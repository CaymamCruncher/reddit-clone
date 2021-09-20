import { useState, Fragment, useEffect } from "react";
import { getPost, getComments } from "../utils/api";
import { useParams } from "react-router-dom";
import Post from "./Post";
import Comment from "./Comment";

// TODO: Add update score in here

function PostView(props) {
	const { id } = useParams();
	const [post, updatePost] = useState([]);
	const [comments, updateComments] = useState([]);
	useEffect(() => {
		getPost(id).then((res) => updatePost(res));
		getComments(id).then((res) => updateComments(res));
	}, [id]);
	return (
		<Fragment>
			{post && <Post post={post} />}
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
