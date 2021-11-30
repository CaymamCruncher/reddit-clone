import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { addComment } from "../utils/api";
import { useHistory } from "react-router-dom";

function AddComment(props) {
	const [content, updateContent] = useState("");
	const { post, toggleAddComment, updatePost } = props;
	const { user } = useContext(UserContext);
	const history = useHistory();

	function handleAddComment(e) {
		e.preventDefault();
		const comment = {
			id: Math.floor(Math.random() * 10000).toString(),
			postID: post.id,
			date: new Date().toLocaleString(),
			author: user.name,
			content,
			score: 0,
		};
		addComment(comment, post.id).then((res) => {
			updateContent("");
			toggleAddComment();
			console.log(res);
			updatePost(res);
		});
	}
	if (user.id === "Guest") {
		history.push("/login");
	}
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
