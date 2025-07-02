import React, { useState, useRef, useEffect } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch, isMobile }) => {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(!isMobile);
  const inputRef = useRef(null);

  useEffect(() => {
    if (expanded && isMobile && inputRef.current) {
      inputRef.current.focus();
    }
  }, [expanded, isMobile]);

  const handleInput = (e) => {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  const handleExpand = () => setExpanded(true);
  const handleCollapse = () => {
    setExpanded(false);
    setQuery('');
    if (onSearch) onSearch('');
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit} role="search" aria-label="Search blog posts">
      {isMobile && !expanded ? (
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Open search"
          onClick={handleExpand}
        >
          <span role="img" aria-label="search">🔍</span>
        </button>
      ) : (
        <>
          <label htmlFor="search-input" className={styles.srOnly}>Search posts</label>
          <div className={styles.inputWrapper}>
            <input
              id="search-input"
              ref={inputRef}
              className={styles.input}
              type="text"
              value={query}
              onChange={handleInput}
              placeholder="Search posts..."
              autoComplete="off"
              aria-live="polite"
            />
            {/* Removed clear (cross) button, only search icon remains */}
            <button type="submit" className={styles.iconButtonInBox} aria-label="Search">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="8" stroke="#1976d2" strokeWidth="2" />
                <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          {isMobile && (
            <button type="button" className={styles.cancelButton} onClick={handleCollapse}>
              Cancel
            </button>
          )}
        </>
      )}
    </form>
  );
};

export default SearchBar;
