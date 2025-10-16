import styles from "./Post.module.css";
import parse from "html-react-parser";
import "prismjs"; // Import Prism.js
import "prismjs/themes/prism.css"; // Import Prism.js default styles
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "../../assets/avatar.jpeg";

function Post() {
  const [post, setPost] = useState("");
  const [comments, setComments] = useState("");

  const params = useParams();
  const postId = params.postId;

  const [comment, setComment] = useState();

  const token = localStorage.getItem("token");

  useEffect(() => {
    let ignore = false;

    fetch("http://localhost:3000/api/posts/" + postId, {
      mode: "cors",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((result) => result.json())
      .then((data) => {
        if (!ignore) {
          setPost(data.post);
        }
      });

    fetch("http://localhost:3000/api/comments/" + postId, {
      mode: "cors",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((result) => result.json())
      .then((data) => {
        if (!ignore) {
          console.log(data.comments);
          setComments(data.comments);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    Prism.highlightAll();
  }, [post]);

  async function createComment() {
    const username = localStorage.getItem("username");

    await fetch(`http://localhost:3000/api/comments/${postId}`, {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: comment, username: username }),
    });

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
  }

  return (
    <div className={styles.post}>
      <div className={styles.postWrapper}>
        <div className={styles.postUser}>
          <div className={styles.postAvatar}>
            <img className={styles.postAvatarImg} src={Avatar} alt="" />
          </div>
          <div className={styles.postUserInfo}>
            <div className={styles.postUsername}>Will Barrent</div>
            <div className={styles.postCreatedAt}>17.09.2025</div>
          </div>
        </div>
        <h1 className={styles.postTitle}>
          {parse(post === "" ? "" : post.title)}
        </h1>
        <div className={styles.postContent}>
          {parse(post === "" ? "" : post.content)}
        </div>
      </div>
      <div className={styles.commentWrapper}>
        <div className={styles.commentsTitle}>Comments ({comments.length})</div>
        {token ? (
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
            <button
              onClick={() => createComment()}
              className={styles.commentsEditorSubmitBtn}
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

                return (
                  <div className={styles.comment}>
                    <div className={styles.commentInfo}>
                      <div className={styles.commentAuthor}>{username}</div>
                      <div className={styles.commentDot}></div>
                      <div className={styles.commentCreatedAt}>
                        {`${date} ${monthName[getMonth]}`}.
                      </div>
                    </div>
                    <div className={styles.commentContent}>{content}</div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default Post;
