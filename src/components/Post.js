import {Link} from 'react-router-dom';

function Post(props) {
  const {post, updateScore} = props;
  return (
    <article className="container post">
      <h2><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
      {post.type === 'img' && (
        <img alt={post.title} src="/placeholder.jpg" />
      )}
      <small>Posted by {post.author} on {post.date} </small>
      <p>{post.content}</p>
      <small>Number of Comments {post.numOfComments}</small>
      <small>
        <button onClick={() => updateScore(post, 1)}>Upvote</button>
        {post.score}
        <button onClick={() => updateScore(post, -1)}>Downvote</button>
      </small>
    </article>
  )
}

export default Post