import styles from "./Post.module.css";
import parse from "html-react-parser";
import "prismjs"; // Import Prism.js
import "prismjs/themes/prism.css"; // Import Prism.js default styles
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "../../assets/avatar.jpeg";
import Comments from "../../Components/Comments/Comments";

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

  function postCreatedAt() {
    if (post === "") {
      return "";
    }

    const date = new Date(post.createdAt);
    const month = date.getMonth();
    const createdAt = `${date.getDate()}.${
      month % 10 === month ? "0" + month : month
    }.${date.getFullYear()}`;

    return createdAt;
  }

  return (
    <div className={styles.post}>
      <div className={styles.postWrapper}>
        <div className={styles.postUser}>
          <div className={styles.postAvatar}>
            <img className={styles.postAvatarImg} src={Avatar} alt="" />
          </div>
          <div className={styles.postUserInfo}>
            <div className={styles.postUsername}>
              {parse(post && post.author.username)}
            </div>
            <div className={styles.postCreatedAt}>{postCreatedAt()}</div>
          </div>
        </div>
        <h1 className={styles.postTitle}>{parse(post && post.title)}</h1>
        <div className={styles.postContent}>{parse(post && post.content)}</div>
      </div>
      <Comments postId={post && post.id}/>
    </div>
  );
}

export default Post;
