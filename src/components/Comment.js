import { useState, useEffect } from "react";
import { calculateTime } from "../utils/api";
function Comment(props) {
	const { comment } = props;
	const [time, updateTime] = useState({ type: "", value: "" });
	useEffect(() => {
		updateTime(calculateTime(comment.date));
	}, [comment]);
	return (
		<li>
			<small>
				{comment.author} {time.value} {time.type} ago
			</small>
			<p>{comment.content}</p>
		</li>
	);
}

export default Comment;
