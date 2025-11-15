import { useEffect, useState } from "react";
import styles from "./Comments.module.css";
import CommentEditor from "../CommentEditor/CommentEditor";
import FormErrors from "../FormErrors/FormErrors";
import Comment from "../Comment/Comment";

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [errors, setErrors] = useState([]);
  const [comment, setComment] = useState();

  const token = localStorage.getItem("token");

  useEffect(() => {
    let ignore = false;

    fetch("http://localhost:3000/api/comments/" + postId, {
      mode: "cors",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        if (!ignore) {
          setComments(
            data.comments.map((comment) => {
              return {
                ...comment,
                isUpdating: false,
              };
            })
          );
        }
      });

    return () => {
      ignore = true;
    };
  }, [postId]);

  async function createComment() {
    const username = localStorage.getItem("username");

    const postComment = await fetch(
      `http://localhost:3000/api/comments/${postId}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: comment, username: username }),
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
      setComment("");
    } else {
      setErrors(commentData.errors);
    }
  }

  async function deleteComment(commentId) {
    await fetch("http://localhost:3000/api/comments/" + commentId, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    const updatedComments = comments.filter((comment) => {
      if (comment.id !== commentId) {
        return comment;
      }
    });

    setComments(updatedComments);
  }

  function turnCommentUpdate(commentId) {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isUpdating: !comment.isUpdating,
        };
      }

      return {
        ...comment,
        isUpdating: false,
      };
    });

    setComments(updatedComments);
  }

  return (
    <div className={styles.commentWrapper}>
      <div className={styles.commentsTitle}>Comments ({comments.length})</div>
      {token ? (
        <div className={styles.commentsCreator}>
          <textarea
            className={styles.commentsCreatorTextArea}
            name=""
            id=""
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></textarea>
          <FormErrors path="content" errors={errors} />
          <button
            onClick={() => createComment()}
            className={styles.commentsCreatorSubmitBtn}
          >
            Submit
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className={styles.comments}>
        {comments === ""
          ? ""
          : comments.map((comment) => {
              const content = comment.content;
              const createdAt = new Date(comment.createdAt);
              const date = createdAt.getDate();
              const getMonth = createdAt.getMonth();
              const username = comment.username;

              const monthName = [
                "jan",
                "feb",
                "mar",
                "apr",
                "may",
                "jule",
                "june",
                "aug",
                "sep",
                "oct",
                "nov",
                "dec",
              ];

              return comment.isUpdating ? (
                <CommentEditor
                  content={comment.content}
                  turnCommentUpdate={turnCommentUpdate}
                  commentId={comment.id}
                  postId={postId}
                  setComments={setComments}
                />
              ) : (
                <Comment
                  username={username}
                  commentId={comment.id}
                  content={content}
                  createdAt={`${date} ${monthName[getMonth]}`}
                  deleteComment={deleteComment}
                  turnCommentUpdate={turnCommentUpdate}
                />
              );
            })}
      </div>
    </div>
  );
}

export default Comments;
