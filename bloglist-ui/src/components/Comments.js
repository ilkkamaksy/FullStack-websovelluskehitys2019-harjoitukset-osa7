import React from 'react';
import { connect } from 'react-redux';
import CommentForm from './CommentForm';

const Comments = (props) => {

    if ( !props.blog.comments ) {
        return null;
    }

    return (
        <div className="comments-section">
            <h3 className="comments__heading">Comments</h3>
            <CommentForm blog={props.blog} />
            <ul className="comments_list">
                { props.blog.comments.map(comment => {
                    return (
                        <li key={comment.id} className="comment__item">
                            <div className="comment__content">{comment.content}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    };
};

const connectedComments = connect(mapStateToProps)(Comments);

export default connectedComments;
