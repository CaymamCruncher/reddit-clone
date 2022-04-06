const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { DateTime } = require("luxon");
const port = process.env.PORT || 5000;
const app = express();
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded());

let postData = [
	{
		id: "axsdfajfkd;as12fj;alkd318",
		title: "Sour Dough",
		date: DateTime.now(),
		author: "YeastOverLord",
		content: "I like sour dough bread",
		type: "text",
		score: 4,
		numOfComments: 1,
	},
	{
		id: "axsdfajfkd;a4241adsfqjbja",
		title: "My first attempt at baking",
		date: DateTime.now(),
		author: "YaBoiBread",
		content: "I tried to make some bread",
		type: "text",
		score: 1,
		numOfComments: 1,
	},
];

let commentData = [
	{
		id: "fdeajdfk;j812094fkfad",
		postID: "axsdfajfkd;as12fj;alkd318",
		date: DateTime.now(),
		author: "PastryChef32",
		content: "Nice",
		score: 0,
	},
	{
		id: "jfajd;sfe71380cmzhyek",
		postID: "axsdfajfkd;a4241adsfqjbja",
		date: DateTime.now(),
		author: "Dough_Fan29",
		content: "Looks great",
		score: 0,
	},
];

// TODO: Add comment functionality

let users = [
	{
		id: "admin_account",
		username: "Admin",
		password: hashPassword("password"),
		posts: 0,
		comments: 0,
		refreshTokens: [],
		votedPosts: {},
	},
	{
		id: "jfajd;sfe71380ceufad;sjk8",
		username: "PastryChef32",
		password: "RisingDough32",
		posts: 0,
		comments: 1,
		refreshTokens: [],
		votedPosts: {},
	},
	{
		id: "jfajd;sfeqfu8a01j2kjfke",
		username: "YaBoiBread",
		password: "Doughness9",
		posts: 0,
		comments: 1,
		refreshTokens: [],
		votedPosts: {},
	},
];

let accessTokenKey = crypto.randomBytes(128).toString("hex");
let refreshTokenKey = crypto.randomBytes(128).toString("hex");

// function for generating password hash

function hashPassword(
	password,
	salt = crypto.randomBytes(128).toString("hex")
) {
	let hash = crypto.createHmac("sha256", salt);
	hash.update(password);
	let hashedPassword = hash.digest("hex");
	return { hash: hashedPassword, salt };
}

// function for comparing hashed passwords
function comparePassword(password, user) {
	const { salt } = user.password;
	let passwordData = hashPassword(password, salt);
	return passwordData.hash === user.password.hash;
}

// function user aunthentication

function authenticateUser(accessToken, refreshToken, ip, res) {
	let { result, reason, data } = authenticateAccessToken(accessToken);
	if (!result && reason === "expired") {
		let status = authenticateRefreshToken(refreshToken, ip);
		if (status.result) {
			let token = generateAccessToken(status.user, accessTokenKey);
			res.cookie(
				"jwt",
				{ accessToken: token, refreshToken },
				{ secure: true, httpOnly: true }
			);
			return { result: true, data: status.data };
		} else {
			return status;
		}
	} else if (!result) {
		return { result: false, reason };
	} else {
		return { result: true, data };
	}
}

function generateAccessToken(user) {
	let tokenCredentials = {
		id: user.id,
		username: user.username,
		votedPosts: user.votedPosts,
	};
	let token = jwt.sign(tokenCredentials, accessTokenKey, {
		expiresIn: 3,
		algorithm: "HS256",
	});
	return token;
}

function generateRefreshToken(user, ip) {
	let tokenCredentials = {
		id: user.id,
		username: user.username,
		votedPosts: user.votedPosts,
		ip,
	};
	let token = jwt.sign(tokenCredentials, refreshTokenKey, {
		expiresIn: 2629746,
		algorithm: "HS256",
	});
	user.refreshTokens.push(token);
	return token;
}

function authenticateAccessToken(token) {
	try {
		let data = jwt.verify(token, accessTokenKey);
		return { result: true, data };
	} catch (error) {
		if (error.toString().includes("expired")) {
			return { result: false, reason: "expired" };
		} else {
			return { result: false, reason: error };
		}
	}
}

function authenticateRefreshToken(refreshToken, ip) {
	try {
		let token = jwt.verify(refreshToken, refreshTokenKey);
		let user = users.find((u) => u.id === token.id);
		if (!user.refreshTokens.includes(refreshToken)) {
			throw new Error("User does not contain refresh token");
		}
		if (token.ip !== ip) {
			user.refreshTokens = user.refreshTokens.filter((t) => t === refreshToken);
			return { result: false, reason: "Different IP" };
		} else {
			return { result: true, data: token, user };
		}
	} catch (error) {
		if (error.toString().includes("expired")) {
			return { result: false, reason: "expired" };
		} else {
			return { result: false, reason: error };
		}
	}
}

app.get("/posts", (req, res) => {
	res.send(postData);
});

app.get("/posts/filtered/:filter", (req, res) => {
	const { filter } = req.params;
	const now = DateTime.now();
	let filteredPosts = [];
	switch (filter) {
		case "popular":
			filteredPosts = postData.sort((a, b) => {
				if (Math.abs(a.date - now) / (60 * 60 * 1000) > 24) {
					console.log(a.title);
					return 2;
				}
				if (a.score > b.score) {
					return -1;
				} else {
					return 1;
				}
			});
			break;
		case "new":
			filteredPosts = postData.sort((a, b) => b.date - a.date);
			break;
		default:
			filteredPosts = postData
				.filter(
					(p) =>
						p.title.includes(filter) ||
						p.content.includes(filter) ||
						p.author.toLowerCase() === filter.toLowerCase()
				)
				.sort((a, b) => b.score - a.score);
			break;
	}
	res.send(filteredPosts);
});

app.get("/posts/:id", (req, res) => {
	const id = req.params.id;
	let post = postData.filter((p) => p.id === id)[0];
	res.send(post);
});

app.post("/posts", (req, res) => {
	const post = req.body;
	const { accessToken, refreshToken } = req.cookies.jwt;
	const authentication = authenticateUser(
		accessToken,
		refreshToken,
		req.socket.remoteAddress,
		res
	);
	if (authentication.result) {
		postData.push(post);
		res.send(post);
	} else {
		res
			.status(401)
			.send({ result: "Failure", reason: authentication.reason.message });
	}
});

app.put("/posts/:id/score", (req, res) => {
	const { id, value, user } = req.body;
	authenticateUser(user);
	let index = postData.findIndex((p) => p.id === id);
	let uIndex = users.findIndex((u) => u.id === user.id);
	let votedPosts = users[uIndex].votedPosts;
	if (Object.keys(votedPosts).includes(id)) {
		postData[index].score -= votedPosts[id];
		if (value !== votedPosts[id]) {
			postData[index].score += value;
			votedPosts[id] = value;
		} else {
			delete votedPosts[id];
		}
	} else {
		postData[index].score += value;
		users[uIndex].votedPosts[id] = value;
	}
	res.send({ posts: postData, user: users[uIndex] });
});

app.get("/posts/:id/comments", (req, res) => {
	const id = req.params.id;
	let comments = commentData.filter((c) => c.postID === id);
	res.send(comments);
});

app.post("/posts/:id/comments", (req, res) => {
	let comment = req.body;
	let post = postData.find((p) => p.id === req.params.id);
	let user = users.find((u) => u.username === comment.author);
	post.numOfComments += 1;
	user.comments += 1;
	commentData.push(comment);
	res.send(post);
});

app.put("/posts/:id", (req, res) => {
	let editedPost = req.body.post;
	let user = req.body.user;
	let author = users.find((u) => u.id === user.id);
	if (author.username === editedPost.author || author.id === "admin_account") {
		postData = postData.map((post) =>
			post.id === editedPost.id ? editedPost : post
		);
	}
	res.send(postData);
});

app.post("/users/check", (req, res) => {
	let cookie = req.cookies.jwt;
	if (!cookie) {
		res.status(404).send({ result: false, reason: "Token not found" });
	} else {
		let { accessToken, refreshToken } = cookie;
		let authentication = authenticateUser(
			accessToken,
			refreshToken,
			req.socket.remoteAddress,
			res
		);
		if (authentication.result) {
			let user = authentication.data;
			res.send({
				result: true,
				user: {
					id: user.id,
					username: user.username,
					votedPosts: user.votedPosts,
				},
			});
		} else {
			res.status(401).send({ result: false, reason: authentication.reason });
		}
	}
});

app.post("/users", (req, res) => {
	let { username, password } = req.body;
	let user = users.find((u) => u.username === username);
	let result = comparePassword(password, user);
	if (result) {
		let accessToken = generateAccessToken(user);
		let refreshToken = generateRefreshToken(user, req.socket.remoteAddress);
		res.cookie(
			"jwt",
			{ accessToken, refreshToken },
			{ secure: true, httpOnly: true }
		);
		res.send({
			result: true,
			user: {
				id: user.id,
				username: user.username,
				votedPosts: user.votedPosts,
			},
		});
	} else {
		res.send({ result: false });
	}
});

app.listen(port, () => console.log("server listening on ", port));
