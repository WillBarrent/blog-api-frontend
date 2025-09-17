import styles from "./Post.module.css";
import parse from "html-react-parser";
import "prismjs"; // Import Prism.js
import "prismjs/themes/prism.css"; // Import Prism.js default styles
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "../../assets/avatar.jpeg";

function Post() {
  const [post, setPost] = useState("");

  const params = useParams();
  const postId = params.postId;

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

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    Prism.highlightAll();
  }, [post]);

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
        <div className={styles.commentsTitle}>Comments (0)</div>
        <div className={styles.commentsEditor}>
            <textarea className={styles.commentsEditorTextArea} name="" id=""></textarea>
            <button className={styles.commentsEditorSubmitBtn}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Post;
