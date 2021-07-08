function Comment(props) {
  const {comment} = props;
  return (
    <li>
      <small>{comment.author} on {comment.date}</small>
      <p>{comment.content}</p>
    </li>
  )
}

export default Comment;