import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BlogPostItem.module.css';

const BlogPostItem = ({ id, title, summary, date, url }) => {
  // Format date to "Month Day, Year"
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={styles.blogPostItem} key={id}>
      <Link to={url} className={styles.title}>
        <h2>{title}</h2>
      </Link>
      <p className={styles.summary}>{summary}</p>
      <p className={styles.date}>Published on {formattedDate}</p>
    </div>
  );
};

export default BlogPostItem;
