import { useState } from "react";
import FormErrors from "../FormErrors/FormErrors";
import styles from "./CommentEditor.module.css";

function CommentEditor({ turnCommentUpdate, content, errors }) {
  const [comment, setComment] = useState(content);

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
            turnCommentUpdate(comment.id);
          }}
          className={styles.commentsEditorCancelBtn}
        >
          Cancel
        </button>
        <button className={styles.commentsEditorSubmitBtn}>Update</button>
      </div>
    </div>
  );
}

export default CommentEditor;
