import styles from "./Comment.module.css";

function Comment({
  username,
  createdAt,
  content,
  commentId,
  deleteComment,
  turnCommentUpdate,
}) {
  return (
    <div className={styles.comment}>
      <div className={styles.commentInfo}>
        <div className={styles.commentUserInfo}>
          <div className={styles.commentAuthor}>{username}</div>
          <div className={styles.commentDot}></div>
          <div className={styles.commentCreatedAt}>
            {createdAt}.
          </div>
        </div>
        {localStorage.getItem("username") === username ? (
          <div className={styles.commentActions}>
            <button
              onClick={() => {
                deleteComment(commentId);
              }}
              className={styles.commentDeleteBtn}
            >
              Delete
            </button>
            <button
              onClick={() => {
                turnCommentUpdate(commentId);
              }}
              className={styles.commentEditBtn}
            >
              Edit
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.commentContent}>{content}</div>
    </div>
  );
}

export default Comment;
