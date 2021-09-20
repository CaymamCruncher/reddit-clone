const express = require("express");
const cors = require("cors");
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

let users = [
	{
		id: "admin_account",
		username: "Admin",
		password: "Password",
		posts: 0,
		comments: 0,
		votedPosts: [],
	},
	{
		id: "jfajd;sfe71380ceufad;sjk8",
		username: "PastryChef32",
		password: "RisingDough32",
		posts: 0,
		comments: 1,
		votedPosts: [],
	},
	{
		id: "jfajd;sfeqfu8a01j2kjfke",
		username: "YaBoiBread",
		password: "Doughness9",
		posts: 0,
		comments: 1,
		votedPosts: [],
	},
];

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

app.put("/posts/:id", (req, res) => {
	const { id, value, user } = req.body;
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
	res.send(postData);
});

app.get("/posts/:id/comments", (req, res) => {
	const id = req.params.id;
	let comments = commentData.filter((c) => c.postID === id);
	res.send(comments);
});

app.post("/users", (req, res) => {
	let { username, password } = req.body;
	let user = users.find((u) => u.username === username);
	if (user && user.password === password) {
		res.send({ result: true, user: user });
	} else {
		res.send({ result: false });
	}
});

app.listen(port, () => console.log("server listening on ", port));
