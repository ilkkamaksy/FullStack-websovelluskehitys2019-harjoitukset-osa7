import React from 'react';
import { connect } from 'react-redux';
import { addBlog } from '../reducers/blogReducer';
import { useField } from '../hooks/index';

const CreateBlogForm = (props) => {

    const title = useField('text');
    const author = useField('text');
    const url = useField('text');

    const removeReset = ({ reset: _, ...clone }) => clone;

    return (
        <div>
            <h2>Create new post</h2>
            <form onSubmit={(e) => props.addBlog(
                e,
                {
                    title: title.value,
                    author: author.value,
                    url: url.value
                },
                props.userdata.user
            )}>
                <div>
                    Title
                    <input { ...removeReset(title) } />
                </div>
                <div>
                    Author
                    <input { ...removeReset(author) } />
                </div>
                <div>
                    Url
                    <input { ...removeReset(url) } />
                </div>
                <button className="primary" type="submit">create</button>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        newTitle: state.blogs.newTitle,
        newAuthor: state.blogs.newAuthor,
        newUrl: state.blogs.newUrl,
        userdata: state.user
    };
};

const connectedCreateBlogForm = connect(
    mapStateToProps,
    {
        addBlog
    }
)(CreateBlogForm);

export default connectedCreateBlogForm;