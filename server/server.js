const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

let postData = [
  {
    'id': 'axsdfajfkd;as12fj;alkd318',
    'title': 'Sour Dough',
    'date': new Date().toLocaleString(),
    'author': 'YeastOverLord',
    'content': 'I like sour dough bread',
    'type': 'text',
    'score': 0,
    'numOfComments': 0
  },
  {
    'id': 'axsdfajfkd;a4241adsfqjbja',
    'title': 'My first attempt at baking',
    'date': new Date().toLocaleString(),
    'author': 'YaBoiBread',
    'content': 'I tried to make some bread',
    'type': 'img',
    'img': '/src/placeholder.jpg',
    'score': 0,
    'numOfComments': 0
  }
];

let commentData = [
  {
    'id': 'fdeajdfk;j812094fkfad',
    'postID': 'axsdfajfkd;as12fj;alkd318',
    'date': new Date().toLocaleString(),
    'author': 'PastryChef32',
    'content': 'Nice',
    'score': 0
  },
  {
    'id': 'jfajd;sfe71380cmzhyek',
    'postID': 'axsdfajfkd;a4241adsfqjbja',
    'date': new Date().toLocaleString(),
    'author': 'Dough_Fan29',
    'content': 'Looks great',
    'score': 0
  }
];

app.get('/posts', (req, res) => {
  res.send(postData);
});

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  let post = postData.filter((p) => p.id === id)[0];
  res.send(post);
});

app.get('/posts/:id/comments', (req, res) => {
  const id = req.params.id;
  let comments = commentData.filter((c) => c.postID === id);
  res.send(comments);
})

app.listen(port, () => console.log('server listening on ', port));