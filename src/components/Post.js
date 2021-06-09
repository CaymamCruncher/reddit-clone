import {useContext} from 'react';
import {UserContext} from '../context/UserContext';

function Post(props) {
  const {post, updateScore} = props;
  const User = useContext(UserContext);
  function handleUpdateScore(value) {
    if (User !== 'guest') {
      updateScore(value);
    } else {
      alert('Please login to do that');
    }
  }
  return (
    <article className="container post">
      <h2>{post.title}</h2>
      {post.type === 'img' && (
        <img alt={post.title} src="/placeholder.jpg" />
      )}
      <small>Posted by {post.author} on {post.date} </small>
      <p>{post.content}</p>
      <small>Number of Comments {post.numOfComments}</small>
      <small>
        <button onClick={() => handleUpdateScore(1)}>Upvote</button>
        {post.score}
        <button onClick={() => handleUpdateScore(-1)}>Downvote</button>
      </small>
    </article>
  )
}

export default Post