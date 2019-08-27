import React from 'react';
import Blog from './Blog';
import PropTypes from 'prop-types';

const BlogList = ({
    blogs,
    handleLike,
    handleRemove,
    user
}) => {

    const sortDesc = (a,b) => {
        if ( a.likes < b.likes ) {
            return 1;
        } else if ( a.likes > b.likes ) {
            return -1;
        } else {
            return 0;
        }
    };

    const sortedBlogs = blogs.sort(sortDesc);

    return (
        <div>
            <h2>Blog posts</h2>
            {sortedBlogs.map(post => {
                return <Blog
                    key={post.id}
                    blog={post}
                    handleLike={handleLike}
                    handleRemove={handleRemove}
                    user={user}
                />;
            })}
        </div>
    );
};

BlogList.propTypes = {
    blogs: PropTypes.array.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default BlogList;