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
        <div key={post.id} className={styles.blogPostCard}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', marginBottom: 4, paddingTop: 8, paddingRight: 8 }}>
            <Link to={`/edit/${post.id}`}>
              <button style={{ padding: '6px 16px', background: '#28a745', color: '#fff', border: '0.5px solid #1976d2', borderRadius: 6, fontSize: 15, cursor: 'pointer', fontWeight: 600, boxShadow: '0 2px 8px rgba(40,167,69,0.08)' }}>
                Edit
              </button>
            </Link>
          </div>
          <BlogPostItem
            id={post.id}
            title={post.title}
            summary={post.summary}
            date={post.date}
            url={post.url}
          />
        </div>
      ))}
    </div>
  );
};

export default BlogPostList;
