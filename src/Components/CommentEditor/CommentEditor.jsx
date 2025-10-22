import { useState } from "react";
import FormErrors from "../FormErrors/FormErrors";
import styles from "./CommentEditor.module.css";

function CommentEditor({ turnCommentUpdate, content, commentId, postId, setComments }) {
  const [comment, setComment] = useState(content);
  const [errors, setErrors] = useState([]);

  async function updateComment() {
    const username = localStorage.getItem("username");

    const postComment = await fetch(
      `http://localhost:3000/api/comments/${commentId}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: comment }),
      }
    );

    const commentData = await postComment.json();

    if (!commentData.errors) {
      const comments = await fetch(
        "http://localhost:3000/api/comments/" + postId,
        {
          mode: "cors",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const commentsJson = await comments.json();

      setComments(commentsJson.comments);
    } else {
      setErrors(commentData.errors);
    }
  }

  return (
    <div className={styles.commentsEditor}>
      <textarea
        className={styles.commentsEditorTextArea}
        name=""
        id=""
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      ></textarea>
      <FormErrors path="content" errors={errors} />
      <div className={styles.commentsEditorActions}>
        <button
          onClick={() => {
            turnCommentUpdate(commentId);
          }}
          className={styles.commentsEditorCancelBtn}
        >
          Cancel
        </button>
        <button onClick={updateComment} className={styles.commentsEditorSubmitBtn}>Update</button>
      </div>
    </div>
  );
}

export default CommentEditor;
