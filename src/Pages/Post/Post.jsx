import styles from './Post.module.css';
import parse from 'html-react-parser';
import "prismjs"; // Import Prism.js
import "prismjs/themes/prism.css"; // Import Prism.js default styles
import { useEffect, useState } from 'react';

function Post() {
    const [post, setPost] = useState("");

    

    useEffect(() => {
        let ignore = false;

        fetch("http://localhost:3000/api/posts/8", {
            mode: "cors",
            headers: {
                "Authorization": localStorage.getItem('token'),
            },
        }).then(result => result.json()).then((data) => {
            if (!ignore) {
                setPost(data.post);
            }
        });

        return () => {
            ignore = true;
        }
    }, []);

    useEffect(() => {
        Prism.highlightAll();
    }, [post]);


    return <div className={styles.post}><div className={styles.postContent}>{parse(post === "" ? "" : post.content)}</div></div>;
}

export default Post;

