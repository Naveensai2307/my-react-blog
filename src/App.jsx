import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import BlogPostList from './components/BlogPostList/BlogPostList';
import BlogPostForm from './components/BlogPostForm/BlogPostForm';
import Layout from './components/Layout/Layout';
import Pull from './components/Pull';
import CommentList from './components/Comment/CommentList';
import CommentForm from './components/Comment/CommentForm';
import './App.module.css';

const samplePosts = [
	{
		id: '1',
		title: 'Getting Started with React',
		summary: 'Learn the basics of React and build your first application.',
		content: 'Full content for Getting Started with React.',
		author: 'Alice',
		date: '2023-01-01',
		url: '/posts/1',
	},
	{
		id: '2',
		title: 'CSS Grid vs. Flexbox',
		summary: 'A comparison of two powerful layout systems in CSS.',
		content: 'Full content for CSS Grid vs. Flexbox.',
		author: 'Bob',
		date: '2023-02-15',
		url: '/posts/2',
	},
	{
		id: '3',
		title: 'Accessibility in Web Development',
		summary: 'Tips for making your web applications more accessible.',
		content: 'Full content for Accessibility in Web Development.',
		author: 'Carol',
		date: '2023-03-10',
		url: '/posts/3',
	},
];

const initialComments = {
	'1': [
		{ name: 'Jane', date: new Date(), text: 'Great post!', avatar: '' },
		{ name: 'John', date: new Date(), text: 'Thanks for sharing.', avatar: '' },
	],
	'2': [],
	'3': [],
};

const handleBlogPostSubmit = (data) => {
	alert('Blog post submitted!\n' + JSON.stringify(data, null, 2));
};

const BackToListButton = () => {
    const navigate = useNavigate();
    return (
        <button 
            style={{ 
                backgroundColor: '#007bff', // Match Create Post button color
                color: '#FFFFFF',
                borderRadius: 4,
                padding: '10px 20px',
                fontSize: 16,
                fontWeight: 'bold',
                cursor: 'pointer',
                border: 'none',
                marginBottom: 20,
                width: 'auto',
            }} 
            onClick={() => navigate('/')}
        >
            Back
        </button>
    );
};

const NewPostPage = () => (
	<div>
		<h2>New Post</h2>
		<BackToListButton />
		<BlogPostForm onSubmit={handleBlogPostSubmit} />
	</div>
);

const EditPostPage = () => {
    const { postId } = useParams();
    const post = samplePosts.find((p) => p.id === postId);
    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f4f6fa' }}>
            <div style={{ maxWidth: '900px', width: '100%', background: '#fff', borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', padding: '48px 56px', margin: '0 24px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <span style={{ marginLeft: 'auto' }}><BackToListButton /></span>
                </div>
                <h2 style={{ fontSize: 36, marginBottom: 24, textAlign: 'center', letterSpacing: 1 }}>{post.title}</h2>
                <BlogPostForm post={post} onSubmit={handleBlogPostSubmit} />
            </div>
        </div>
    );
};

const ViewPostPage = () => {
    const { postId } = useParams();
    const post = samplePosts.find((p) => p.id === postId);
    const navigate = useNavigate();
    const [comments, setComments] = useState(initialComments[postId] || []);
    const isLoggedIn = false; // Replace with real auth logic
    const userName = '';
    if (!post) return <div>Post not found.</div>;
    const handleAddComment = (comment) => {
        setComments((prev) => [...prev, { ...comment, date: new Date(), avatar: '' }]);
    };
    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f4f6fa' }}>
            <div style={{ maxWidth: '900px', width: '100%', background: '#fff', borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', padding: '48px 56px', margin: '0 24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  <div style={{ width: '100%', marginBottom: 24 }}>
                    <div style={{ background: '#f8f9fb', borderRadius: 8, padding: '18px 24px', marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <div style={{ fontWeight: 600, color: '#333', marginBottom: 4 }}>Title</div>
                      <div style={{ fontSize: 28, fontWeight: 700, color: '#222', letterSpacing: 1 }}>{post.title}</div>
                    </div>
                    <div style={{ background: '#f8f9fb', borderRadius: 8, padding: '18px 24px', marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <div style={{ fontWeight: 600, color: '#333', marginBottom: 4 }}>Author</div>
                      <div style={{ color: '#555', fontSize: 18 }}>{post.author}</div>
                    </div>
                    <div style={{ background: '#f8f9fb', borderRadius: 8, padding: '18px 24px', marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <div style={{ fontWeight: 600, color: '#333', marginBottom: 4 }}>Publication Date</div>
                      <div style={{ color: '#555', fontSize: 18 }}>{new Date(post.date).toLocaleDateString()}</div>
                    </div>
                    <div style={{ background: '#f8f9fb', borderRadius: 8, padding: '18px 24px', marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <div style={{ fontWeight: 600, color: '#333', marginBottom: 4 }}>Content</div>
                      <div style={{ fontSize: 20, lineHeight: 1.7, color: '#222', whiteSpace: 'pre-line' }}>{post.content}</div>
                    </div>
                    {/* Comment Section */}
                    <h3 style={{ marginTop: 32, marginBottom: 12 }}>Comments</h3>
                    <CommentList comments={comments} />
                    <CommentForm onSubmit={handleAddComment} isLoggedIn={isLoggedIn} userName={userName} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 16, width: '100%' }}>
                    <button style={{width: 220, fontSize: 18, borderRadius: 8, background: '#28a745', color: '#fff', border: 'none', padding: '12px 0', cursor: 'pointer'}} onClick={() => navigate(`/edit/${post.id}`)}>Edit Post</button>
                    <BackToListButton />
                  </div>
                </div>
            </div>
        </div>
    );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<BlogPostList posts={samplePosts} />} />
          <Route path="/new" element={<NewPostPage />} />
          <Route path="/edit/:postId" element={<EditPostPage />} />
          <Route path="/posts/:postId" element={<ViewPostPage />} />
          <Route path="/pull" element={<Pull />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
