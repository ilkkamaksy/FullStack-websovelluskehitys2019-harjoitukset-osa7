import React from 'react';
import { connect } from 'react-redux';
import { voteBlog, removeBlog } from '../reducers/blogReducer';
import Comments from './Comments';

const Blog = (props) => {

    if ( !props.blog ) {
        return null;
    }

    return  (
        <div className="single-post-entry">
            <div className="post-title">
                {props.blog.title} {props.blog.author}
            </div>
            <div className="post-meta">
                <div><a href={props.blog.url}>{props.blog.url}</a></div>
                <div>{props.blog.likes} <button className="secondary" onClick={() => props.voteBlog(props.blog)}>like</button></div>
                <div>Added by: {props.blog.user.name}</div>
                { props.userdata.user.username === props.blog.user.username &&
                    <div><button className="tertiary" onClick={() => props.removeBlog(props.blog)}>remove</button></div>
                }
            </div>
            <Comments blog={props.blog} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userdata: state.user
    };
};

const connectedBlog = connect(
    mapStateToProps,
    {
        removeBlog,
        voteBlog
    }
)(Blog);

export default connectedBlog;