import React from 'react';
import { connect } from 'react-redux';
import { addComment } from '../reducers/blogReducer';
import { useField } from '../hooks/index';

const CommentForm = (props) => {

    const comment = useField('text');
    const removeReset = ({ reset: _, ...clone }) => clone;

    return (
        <div className="comment__form">
            <form onSubmit={(e) => props.addComment(
                e,
                {
                    content: comment.value,
                    blog_id: props.blog.id
                },
                props.blog
            )}>
                <div>
                    <label>Comment</label>
                    <div><input data-cy="comment" { ...removeReset(comment) } /></div>
                </div>
                <button className="primary" data-cy="add-comment" type="submit">Add comment</button>
            </form>
        </div>
    );
};

const connectedCommentForm = connect(null, { addComment })(CommentForm);
export default connectedCommentForm;