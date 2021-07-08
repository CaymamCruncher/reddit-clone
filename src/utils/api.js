const headers = {
	'Accept': 'application/json',
	'Content-Type': 'application/json'
}
const url = 'http://localhost:5000';


export function getPosts() {
  return (
    fetch(`${url}/posts`, { headers })
    .then((res) => res.json())
    .catch((err) => console.warn(err))
  );
}

export function getPost(id) {
  return (
    fetch(`${url}/posts/${id}`, { headers })
    .then((res) => res.json())
    .catch((err) => console.warn(err))
  );
}

export function getComments(id) {
  return (
    fetch(`${url}/posts/${id}/comments`, { headers })
    .then((res) => res.json())
    .catch((err) => console.warn(err))
  );
}

// TODO: Add users for change score functionality
export function changeScore(post, value) {
  post.score += value;
  return post;
}