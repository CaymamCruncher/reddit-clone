export function getPosts() {
  return Promise.all([
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
  ])
}

// TODO: Add users for change score functionality
export function changeScore(post, value) {
  post.score += value;
  return post;
}