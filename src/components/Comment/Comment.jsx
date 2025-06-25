import React from 'react';
import styles from './Comment.module.css';

const Comment = ({ name, date, text, avatar }) => {
  const formattedDate = new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  return (
    <div className={styles.commentBox}>
      <div className={styles.profileSection}>
        <div className={styles.avatarLarge}>
          {avatar ? (
            <img
              src={avatar}
              alt={name + ' avatar'}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <svg
              width="64"
              height="64"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="24" fill="#e0e0e0" />
              <circle cx="24" cy="18" r="8" fill="#bdbdbd" />
              <ellipse cx="24" cy="34" rx="12" ry="8" fill="#bdbdbd" />
            </svg>
          )}
        </div>
        <span className={styles.name} style={{ marginTop: 12, fontWeight: 700, fontSize: 18 }}>
          Alice
        </span>
        <span className={styles.date} style={{ marginTop: 4, color: '#888', fontSize: 15 }}>
          {formattedDate}
        </span>
        <div
          className={styles.text}
          style={{
            marginTop: 12,
            textAlign: 'center',
            fontSize: 16,
            color: '#333',
          }}
        >
          Great introduction to React
        </div>
      </div>
    </div>
  );
};

export default Comment;
