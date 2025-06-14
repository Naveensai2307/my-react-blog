import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogPostList from './components/BlogPostList/BlogPostList'

const samplePosts = [
  {
    id: '1',
    title: 'Getting Started with React',
    summary: 'Learn the basics of React and build your first application.',
    date: '2023-01-01',
    url: '/posts/1',
  },
  {
    id: '2',
    title: 'CSS Grid vs. Flexbox',
    summary: 'A comparison of two powerful layout systems in CSS.',
    date: '2023-02-15',
    url: '/posts/2',
  },
  {
    id: '3',
    title: 'Accessibility in Web Development',
    summary: 'Tips for making your web applications more accessible.',
    date: '2023-03-10',
    url: '/posts/3',
  },
];

// Dummy Post page component for routing
const PostPage = ({ postId }) => {
  return <div>Displaying full content for post {postId}</div>;
};

const App = () => {
  return (
    <Router>
      <div>
        <h1>Blog Posts</h1>
        <Routes>
          <Route path="/" element={<BlogPostList posts={samplePosts} />} />
          {/* Define route for individual post */}
          <Route
            path="/posts/:postId"
            element={<PostWrapper />}
          />
        </Routes>
      </div>
    </Router>
  );
};

// Wrapper to get the postId param
import { useParams } from 'react-router-dom';
const PostWrapper = () => {
  const { postId } = useParams();
  return <PostPage postId={postId} />;
};

export default App;
