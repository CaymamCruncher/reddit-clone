import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { addPost } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

function AddPost() {
	const [title, updateTitle] = useState("");
	const [type, updateType] = useState("text");
	const [content, updateContent] = useState("");
	const [postStatus, updatePostStatus] = useState("");
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	function handleAddPost(e) {
		e.preventDefault();
		const post = {
			id: Math.floor(Math.random() * 10000).toString(),
			title,
			date: DateTime.now(),
			author: user.name,
			content,
			type,
			score: 0,
			numOfComments: 0,
		};
		addPost(post)
			.then((res) => {
				console.log(res);
				navigate(`/posts/${post.id}`);
			})
			.catch((err) => {
				console.error(err.message);
				updatePostStatus("Sorry something went wrong. Please try again later.");
			});
	}

	useEffect(() => {
		if (user.id === "Guest") {
			navigate("/login");
		}
	}, [user, navigate]);

	return (
		<article className="container">
			<h2>Add Post</h2>
			<p>{postStatus}</p>
			<form onSubmit={handleAddPost} className="two-col">
				<div>
					<label htmlFor="title">Title</label>
					<input
						name="title"
						id="title"
						value={title}
						onChange={(e) => updateTitle(e.target.value)}
					/>
				</div>
				<div>
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
				</div>
				<div className="full-col">
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
				</div>
				<button type="submit">Submit</button>
			</form>
		</article>
	);
}

export default AddPost;
