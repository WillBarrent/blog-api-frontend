import styles from "./BlogCard.module.css";
import { MessageCircle } from "lucide-react";

function BlogCard() {
  return (
    <div className={styles.blogCard}>
      <div className={styles.blogCardContent}>
        <div className={styles.blogCardAuthor}>Will Barrent</div>
        <div className={styles.blogCardCreatedAt}>Aug 24, 2025</div>
        <div className={styles.blogCardTitle}>
        I Tried 20+ Python Courses on Udemy: Here are 5 Courses I recommend
        </div>
        <div className={styles.blogCardComment}>
          <MessageCircle size={16}/>
          <div className={styles.blogCardCommentPage}>Add Comment</div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
