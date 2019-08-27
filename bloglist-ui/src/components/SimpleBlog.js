import React from 'react';

const SimpleBlog = ({ blog, onClick }) => (
    <div>
        <div>{blog.title} {blog.author}</div>
        <div>Blog has {blog.likes} likes</div>
        <button onClick={onClick}>like</button>
    </div>
);

export default SimpleBlog;