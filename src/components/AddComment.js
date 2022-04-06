import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { addComment } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

function AddComment(props) {
	const [content, updateContent] = useState("");
	const { post, toggleAddComment, updatePost } = props;
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	function handleAddComment(e) {
		e.preventDefault();
		const comment = {
			id: Math.floor(Math.random() * 10000).toString(),
			postID: post.id,
			date: DateTime.now(),
			author: user.name,
			content,
			score: 0,
		};
		addComment(comment, post.id).then((res) => {
			updateContent("");
			toggleAddComment();
			updatePost(res);
		});
	}

	useEffect(() => {
		if (user.id === "Guest") {
			navigate("/login");
		}
	}, [user, navigate]);

	return (
		<form onSubmit={handleAddComment}>
			<label htmlFor="content">Comment</label>
			<textarea
				name="content"
				id="content"
				value={content}
				onChange={(e) => updateContent(e.target.value)}
			/>
			<button type="submit">Submit</button>
		</form>
	);
}

export default AddComment;
