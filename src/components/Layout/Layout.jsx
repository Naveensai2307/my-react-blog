import React from 'react';
import NavBar from '../NavBar/NavBar';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <NavBar />
      </header>
      <div style={{ minHeight: '60px' }} /> {/* Spacer for fixed NavBar */}
      <section style={{ textAlign: 'center', margin: '32px 0', color: '#003366', fontWeight: 600, fontSize: '1.25rem' }}>
        {/* You can replace this with any content you want */}
        Welcome to BlogApp! Share your thoughts and read the latest posts below.
      </section>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>&copy; 2025 BlogApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
