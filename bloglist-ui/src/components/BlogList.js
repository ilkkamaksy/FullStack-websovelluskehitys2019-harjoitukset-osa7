import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const BlogList = (props) => {

    if ( props.blogs.postdata.length === 0 ) {
        return null;
    }

    const sortDesc = (a,b) => {
        if ( a.likes < b.likes ) {
            return 1;
        } else if ( a.likes > b.likes ) {
            return -1;
        } else {
            return 0;
        }
    };

    const sortedBlogs = props.blogs.postdata.sort(sortDesc);

    return (
        <div>
            <h2>Blog posts</h2>
            {sortedBlogs.map((post, index) => {
                return (
                    <div data-cy="blog-link" key={post.id} className="list-post-entry">
                        <Link to={`/blogs/${post.id}`} >
                            <div className="post-title">
                                {post.title} {post.author}
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

BlogList.propTypes = {
    blogs: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        userdata: state.user
    };
};

const connectedBlogList = connect(mapStateToProps)(BlogList);
export default connectedBlogList;