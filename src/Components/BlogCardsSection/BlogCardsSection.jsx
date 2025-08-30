import styles from "./BlogCardsSection.module.css";
import BlogCard from "../BlogCard/BlogCard";

function BlogCardsSection() {
  return (
    <div className={styles.blogCards}>
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
    </div>
  );
}

export default BlogCardsSection;
