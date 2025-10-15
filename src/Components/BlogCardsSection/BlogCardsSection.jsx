import styles from "./BlogCardsSection.module.css";
import BlogCard from "../BlogCard/BlogCard";
import { useState } from "react";
import { useEffect } from "react";

function BlogCardsSection() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let ignore = false;

    fetch("http://localhost:3000/api/posts", {
      mode: "cors",
    })
      .then((result) => result.json())
      .then((data) => {
        if (!ignore) {
          setPosts(data.posts);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className={styles.blogCards}>
      {posts.map((post) =>
        post.published ? (
          <BlogCard
            key={post.id}
            postId={post.id}
            title={post.title}
            createdAt={post.createdAt}
          />
        ) : (
          <></>
        )
      )}
    </div>
  );
}

export default BlogCardsSection;
