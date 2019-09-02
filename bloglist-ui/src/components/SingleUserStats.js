import React from 'react';

const SingleUserStats = ({ user }) => {

    if ( !user ) {
        return null;
    }

    return (
        <div>
            <h2>{user.name}</h2>
            <div className="user-stats__wrapper">
                { user.blogs.map(blog => {
                    return (
                        <div className="user-stats__row" key={blog.id}>
                            {blog.title}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SingleUserStats;