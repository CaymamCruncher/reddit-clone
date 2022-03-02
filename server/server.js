const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

let postData = [
	{
		id: "axsdfajfkd;as12fj;alkd318",
		title: "Sour Dough",
		date: new Date().toLocaleString(),
		author: "YeastOverLord",
		content: "I like sour dough bread",
		type: "text",
		score: 0,
		numOfComments: 1,
	},
	{
		id: "axsdfajfkd;a4241adsfqjbja",
		title: "My first attempt at baking",
		date: new Date().toLocaleString(),
		author: "YaBoiBread",
		content: "I tried to make some bread",
		type: "text",
		score: 0,
		numOfComments: 1,
	},
];

let commentData = [
	{
		id: "fdeajdfk;j812094fkfad",
		postID: "axsdfajfkd;as12fj;alkd318",
		date: new Date().toLocaleString(),
		author: "PastryChef32",
		content: "Nice",
		score: 0,
	},
	{
		id: "jfajd;sfe71380cmzhyek",
		postID: "axsdfajfkd;a4241adsfqjbja",
		date: new Date().toLocaleString(),
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
		votedPosts: {},
	},
	{
		id: "jfajd;sfe71380ceufad;sjk8",
		username: "PastryChef32",
		password: "RisingDough32",
		posts: 0,
		comments: 1,
		votedPosts: {},
	},
	{
		id: "jfajd;sfeqfu8a01j2kjfke",
		username: "YaBoiBread",
		password: "Doughness9",
		posts: 0,
		comments: 1,
		votedPosts: {},
	},
];

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
	console.log(passwordData);
	console.log(user.password);
	return passwordData.hash === user.password.hash;
}

// function user aunthentication

function authenticateUser(user, password) {
	let validUser = users.find((u) => u.id === user.id);
	return { result: comparePassword(password, validUser), user: validUser };
}

app.get("/posts", (req, res) => {
	res.send(postData);
});

app.get("/posts/:id", (req, res) => {
	const id = req.params.id;
	let post = postData.filter((p) => p.id === id)[0];
	res.send(post);
});

app.post("/posts", (req, res) => {
	const post = req.body;
	postData.push(post);
	res.send(post);
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

app.post("/users", (req, res) => {
	let { id, password } = req.body;
	let { result, user } = authenticateUser(id, password);
	if (result) {
		res.send({ result: true, user: user });
	} else {
		res.send({ result: false });
	}
});

app.listen(port, () => console.log("server listening on ", port));
