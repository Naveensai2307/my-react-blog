import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import SearchBar from '../SearchBar/SearchBar';

const NavBar = ({ onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className={styles.navBar}>
      <Link to="/" className={styles.logo} tabIndex={0}>
        BlogApp
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <SearchBar onSearch={onSearch} isMobile={isMobile} />
        <div className={styles.links}>
          <Link to="/" tabIndex={0}>Home</Link>
          <Link to="/blog" tabIndex={0}>Blog</Link>
          <Link to="/about" tabIndex={0} className={styles.aboutLink}>About</Link>
        </div>
      </div>
      <button
        ref={buttonRef}
        className={styles.hamburger}
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
        tabIndex={0}
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <Link to="/" onClick={toggleMobileMenu} tabIndex={isMobileMenuOpen ? 0 : -1}>Home</Link>
        <Link to="/blog" onClick={toggleMobileMenu} tabIndex={isMobileMenuOpen ? 0 : -1}>Blog</Link>
        <Link to="/about" onClick={toggleMobileMenu} tabIndex={isMobileMenuOpen ? 0 : -1} className={styles.aboutLink}>About</Link>
      </div>
    </nav>
  );
};

export default NavBar;
