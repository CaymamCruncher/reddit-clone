import { DateTime } from "luxon";

const headers = {
	Accept: "application/json",
	"Content-Type": "application/json",
};
const url = "http://localhost:5000";

export function getPosts() {
	return fetch(`${url}/posts`, { headers })
		.then((res) => res.json())
		.catch((err) => console.warn(err));
}

export function getFilteredPosts(filter) {
	return fetch(`${url}/posts/filtered/${filter}`, { headers })
		.then((res) => res.json())
		.catch((err) => console.warn(err));
}

export function getPost(id) {
	return fetch(`${url}/posts/${id}`, { headers })
		.then((res) => res.json())
		.catch((err) => console.warn(err));
}

export function getComments(id) {
	return fetch(`${url}/posts/${id}/comments`, { headers })
		.then((res) => res.json())
		.catch((err) => console.warn(err));
}

export function addPost(post) {
	console.log(post);
	return fetch(`${url}/posts`, {
		method: "POST",
		body: JSON.stringify(post),
		credentials: "include",
		headers,
	}).then((res) => {
		if (res.ok) {
			return res.json();
		} else {
			throw new Error(res.statusText);
		}
	});
}

export function editPost(post, user) {
	return fetch(`${url}/posts/${post.id}`, {
		method: "PUT",
		body: JSON.stringify({ post, user }),
		credentials: "include",
		headers,
	})
		.then((res) => res.json())
		.catch((err) => console.warn(err));
}

export function calculateTime(time) {
	let now = DateTime.now();
	now.setLocale("en-US");
	let diff = now.diff(DateTime.fromISO(time), ["seconds"]);
	if (diff.as("years") >= 1) {
		diff = { type: "years", value: parseInt(diff.as("years")) };
	} else if (diff.as("months") >= 1) {
		diff = { type: "months", value: parseInt(diff.as("months")) };
	} else if (diff.as("weeks") >= 1) {
		diff = { type: "weeks", value: parseInt(diff.as("weeks")) };
	} else if (diff.as("days") >= 1) {
		diff = { type: "days", value: parseInt(diff.as("days")) };
	} else if (diff.as("hours") >= 1) {
		diff = { type: "hours", value: parseInt(diff.as("hours")) };
	} else if (diff.as("minutes") >= 1) {
		diff = { type: "minutes", value: parseInt(diff.as("minutes")) };
	} else {
		diff = { type: "seconds", value: parseInt(diff.as("seconds")) };
	}
	return diff;
}

export function checkForUser() {
	return fetch(`${url}/users/check`, {
		method: "POST",
		credentials: "include",
		headers,
	}).then((res) => {
		if (res.ok) {
			return res.json();
		} else {
			throw new Error(res.statusText);
		}
	});
}

export function authenticateUser(username, password) {
	return fetch(`${url}/users`, {
		method: "POST",
		body: JSON.stringify({ username, password }),
		credentials: "include",
		headers,
	})
		.then((res) => res.json())
		.catch((err) => console.warn(err));
}

export function changeScore(id, value, user) {
	return fetch(`${url}/posts/${id}/score`, {
		method: "PUT",
		body: JSON.stringify({ id, value, user }),
		credentials: "include",
		headers,
	})
		.then((res) => res.json())
		.catch((err) => console.warn(err));
}

export function addComment(comment, id) {
	return fetch(`${url}/posts/${id}/comments`, {
		method: "POST",
		body: JSON.stringify(comment),
		credentials: "include",
		headers,
	})
		.then((res) => res.json())
		.catch((err) => console.warn(err));
}
