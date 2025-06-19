import React, { useState } from 'react';
import BlogPostForm from './BlogPostForm';

const BlogPostManager = () => {
  const [editingPost, setEditingPost] = useState(null);

  const handleFormSubmit = (formData) => {
    if (editingPost) {
      console.log('Updating post:', formData);
      // Call API to update post
    } else {
      console.log('Creating post:', formData);
      // Call API to create post
    }
    // Reset form or redirect user
  };

  return (
    <div>
      <h2>{editingPost ? '' : 'New Post'}</h2>
      <BlogPostForm post={editingPost} onSubmit={handleFormSubmit} />
      <button type="button" style={{ position: 'absolute', bottom: '10px', right: '10px', width: 220, fontSize: 18, borderRadius: 8, background: '#28a745', color: '#fff', border: 'none', padding: '12px 0', cursor: 'pointer'}} onClick={() => console.log('Create Post clicked')}>Create Post</button>
    </div>
  );
};

export default BlogPostManager;
