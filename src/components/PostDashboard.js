import {useState, useEffect} from 'react';
import { getPosts, changeScore } from '../utils/api.js';
import Post from './Post.js';

function PostDashboard() {
  const [posts, updatePosts] = useState([]);
  useEffect(() => {
    getPosts().then((data) => updatePosts(data));
  }, []);

  function updateScore(post, value) {
    updatePosts(posts.map((p) => p.id === post.id ? changeScore(post, value) : p));
  }

  return (
    <ul>
      {posts.map((post) => (
        <li>
          <Post post={post} key={post.id} updateScore={updateScore} />
        </li>
      ))}
    </ul>
  )
}

export default PostDashboard