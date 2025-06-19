import React, { useState, useEffect } from 'react';
import styles from './BlogPostForm.module.css';
import DeleteButton from '../DeleteButton/DeleteButton';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';

const BlogPostForm = ({ post, onSubmit }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [author, setAuthor] = useState(post?.author || '');
  const [date, setDate] = useState(post?.date || '');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title || '');
      setContent(post.content || '');
      setAuthor(post.author || '');
      setDate(post.date || '');
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!title) newErrors.title = 'Required';
    if (!content) newErrors.content = 'Required';
    if (!author) newErrors.author = 'Required';
    if (!date) newErrors.date = 'Required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setIsSubmitting(true);
      await onSubmit({ title, content, author, date });
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    // Add deletion logic here
    setIsDialogOpen(false);
  };

  return (
    <div>
      <form className={styles.blogPostForm} onSubmit={handleSubmit} noValidate>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            autoComplete="off"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && (
            <p className={styles.error} id="title-error" role="alert">{errors.title}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            autoComplete="off"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            aria-invalid={!!errors.content}
            aria-describedby={errors.content ? 'content-error' : undefined}
            rows={6}
          />
          {errors.content && (
            <p className={styles.error} id="content-error" role="alert">{errors.content}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="author">Author</label>
          <input
            id="author"
            type="text"
            autoComplete="off"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            aria-invalid={!!errors.author}
            aria-describedby={errors.author ? 'author-error' : undefined}
          />
          {errors.author && (
            <p className={styles.error} id="author-error" role="alert">{errors.author}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="date">Publication Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? 'date-error' : undefined}
          />
          {errors.date && (
            <p className={styles.error} id="date-error" role="alert">{errors.date}</p>
          )}
        </div>

        <div className={styles.buttonRow} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="button" onClick={() => console.log('Edit Post clicked')}>
            Edit Post
          </button>
          <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Create Post'}
          </button>
        </div>
      </form>
      <DeleteButton onClick={handleDeleteClick} />
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default BlogPostForm;