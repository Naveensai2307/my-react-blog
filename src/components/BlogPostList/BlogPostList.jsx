import React from 'react';
import { Link } from 'react-router-dom';
import BlogPostItem from '../BlogPostItem/BlogPostItem';
import styles from './BlogPostList.module.css';

const BlogPostList = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p>No blog posts available.</p>;
  }

  return (
    <div className={styles.blogPostList}>
      <div className={styles.topBar}>
        <Link to="/new">
          <button style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 4, fontSize: 16, cursor: 'pointer' }}>
            New Post
          </button>
        </Link>
      </div>
      {posts.map((post) => (
        <div key={post.id} style={{ position: 'relative' }}>
          <BlogPostItem
            id={post.id}
            title={post.title}
            summary={post.summary}
            date={post.date}
            url={post.url}
          />
          <Link to={`/edit/${post.id}`} style={{ position: 'absolute', top: 10, right: 10 }}>
            <button style={{ padding: '6px 12px', background: '#28a745', color: '#fff', border: 'none', borderRadius: 4, fontSize: 14, cursor: 'pointer' }}>
              Edit
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogPostList;
