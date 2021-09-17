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

export function authenticateUser(username, password) {
  return (
    fetch(`${url}/users`, { method: 'POST', body: JSON.stringify({username, password}), headers })
    .then((res) => res.json())
    .catch((err) => console.warn(err))
  );
}

// TODO: Add users for change score functionality
export function changeScore(id, value, user) {
  return (
    fetch(`${url}/posts/${id}`, { method: 'PUT', body: JSON.stringify({id, value, user}), headers })
    .then((res) => res.json())
    .catch((err) => console.warn(err))
  );
}