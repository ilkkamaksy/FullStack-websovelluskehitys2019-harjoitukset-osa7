import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({
    blog,
    handleLike,
    handleRemove,
    user
}) => {

    const [visible, setVisible] = useState(false);
    const showWhenVisible = { display: visible ? '' : 'none' };

    const setVisibility = () => {
        setVisible(!visible);
    };

    return  (
        <div className="post-entry">
            <div className="post-title" onClick={setVisibility}>
                {blog.title} {blog.author}
            </div>
            <div className="post-meta" style={showWhenVisible}>
                <div><a href={blog.url}>{blog.url}</a></div>
                <div>{blog.likes} <button onClick={() => handleLike(blog)}>like</button></div>
                <div>Added by: {blog.user.name}</div>
                { user.username === blog.user.username && <div><button onClick={() => handleRemove(blog)}>remove</button></div> }
            </div>
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleRemove: PropTypes.func,
    user: PropTypes.object.isRequired
};

export default Blog;