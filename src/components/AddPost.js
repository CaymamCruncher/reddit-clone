import { Fragment, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { addPost } from "../utils/api";
import { useHistory } from "react-router-dom";

function AddPost() {
	const [title, updateTitle] = useState("");
	const [type, updateType] = useState("text");
	const [content, updateContent] = useState("");
	const { user } = useContext(UserContext);
	const history = useHistory();

	function handleAddPost(e) {
		e.preventDefault();
		const post = {
			id: Math.floor(Math.random() * 10000).toString(),
			title,
			date: new Date().toLocaleString(),
			author: user.name,
			content,
			type,
			score: 0,
			numOfComments: 0,
		};
		addPost(post).then((res) => {
			console.log(res);
			history.push(`/posts/${post.id}`);
		});
	}
	if (user.id === "Guest") {
		history.push("/login");
	}
	return (
		<Fragment>
			<h2>Add Post</h2>
			<form onSubmit={handleAddPost}>
				<label htmlFor="title">Title</label>
				<input
					name="title"
					id="title"
					value={title}
					onChange={(e) => updateTitle(e.target.value)}
				/>
				<label htmlFor="type">Type</label>
				<select
					name="type"
					id="type"
					onChange={(e) => updateType(e.target.value)}
				>
					<option value="text" default>
						Text
					</option>
					<option value="img">Image</option>
					<option value="video">Video</option>
				</select>
				<label htmlFor="content">Content</label>
				{type === "text" ? (
					<textarea
						name="content"
						id="content"
						value={content}
						onChange={(e) => updateContent(e.target.value)}
					/>
				) : (
					<input
						type="file"
						name="content"
						id="content"
						value={content}
						onChange={(e) => updateContent(e.target.value)}
					/>
				)}
				<button type="submit">Submit</button>
			</form>
		</Fragment>
	);
}

export default AddPost;
