import { Fragment, useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { editPost, getPost } from "../utils/api";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

function EditPost(props) {
	const { id } = useParams();
	const [post, updatePost] = useState([]);
	const [title, updateTitle] = useState("");
	const [content, updateContent] = useState("");
	const { user } = useContext(UserContext);
	const history = useHistory();

	function handleEditPost(e) {
		e.preventDefault();
		const editedPost = {
			id: post.id,
			title,
			date: post.date,
			author: post.author,
			content,
			type: post.type,
			score: post.score,
			numOfComments: post.numOfComments,
			edited: user.name,
			editedOn: new Date().toLocaleString(),
		};
		editPost(editedPost, user).then((res) => {
			console.log(res);
			history.push(`/posts/${post.id}`);
		});
	}

	useEffect(() => {
		let isMounted = true;
		getPost(id).then((res) => {
			if (user.id === "Guest") {
				history.push("/login");
			} else if (user.name !== res.author && user.id !== "admin_account") {
				history.goBack();
			}
			if (isMounted) {
				updatePost(res);
				updateTitle(res.title);
				updateContent(res.content);
			}
		});
		return () => {
			isMounted = false;
		};
	}, [user, history, id]);

	return (
		<Fragment>
			<h2>Edit Post</h2>
			<form onSubmit={handleEditPost}>
				<label htmlFor="title">Title</label>
				<input
					name="title"
					id="title"
					value={title}
					onChange={(e) => updateTitle(e.target.value)}
				/>
				<label htmlFor="content">Content</label>
				<textarea
					name="content"
					id="content"
					value={content}
					onChange={(e) => updateContent(e.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>
		</Fragment>
	);
}

export default EditPost;
