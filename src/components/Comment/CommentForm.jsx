import React, { useState } from 'react';
import styles from './CommentForm.module.css';

const CommentForm = ({ onSubmit, isLoggedIn, userName }) => {
  const [name, setName] = useState(userName || '');
  const [text, setText] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((!isLoggedIn && !name.trim()) || !text.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    onSubmit({ name: isLoggedIn ? userName : name, text, avatar });
    setText('');
    setAvatar('');
    if (!isLoggedIn) setName('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} aria-label="Add a comment">
      <div className={styles.formGroup} style={{marginBottom: 8}}>
        {/* Name heading and input with avatar in heading */}
        <label htmlFor="comment-name" style={{ fontWeight: 600, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {/* Small avatar in heading */}
            <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#e0e0e0', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginRight: 6 }}>
              {avatar ? (
                <img src={avatar} alt="avatar preview" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="24" fill="#e0e0e0" />
                  <circle cx="24" cy="18" r="8" fill="#bdbdbd" />
                  <ellipse cx="24" cy="34" rx="12" ry="8" fill="#bdbdbd" />
                </svg>
              )}
            </span>
            Name
          </span>
        </label>
        {!isLoggedIn && (
          <input
            id="comment-name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="name"
            placeholder="Your name"
            style={{ marginBottom: 8, width: '100%' }}
          />
        )}
        {isLoggedIn && (
          <span style={{ marginBottom: 8, fontWeight: 600 }}>{userName}</span>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="comment-avatar">Avatar URL <span style={{fontWeight:400, color:'#888'}}>(Optional)</span></label>
        <input
          id="comment-avatar"
          type="url"
          value={avatar}
          onChange={e => setAvatar(e.target.value)}
          placeholder="https://example.com/avatar.jpg"
          autoComplete="url"
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="comment-text">Comment</label>
        <textarea
          id="comment-text"
          value={text}
          onChange={e => setText(e.target.value)}
          rows={3}
        />
      </div>
      {error && <div className={styles.error} role="alert">{error}</div>}
      <button type="submit" className={styles.submitBtn}>Submit</button>
    </form>
  );
};

export default CommentForm;
