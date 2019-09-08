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
        <div className="form form__create-blog">
            <h3>Create new post</h3>
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
                    <label>Title</label>
                    <input data-cy="blog-title" id="blog_title" { ...removeReset(title) } />
                </div>
                <div>
                    <label>Author</label>
                    <input data-cy="blog-author" id="blog_author" { ...removeReset(author) } />
                </div>
                <div>
                    <label>Url</label>
                    <input data-cy="blog-url" id="blog_url" { ...removeReset(url) } />
                </div>
                <button className="primary submit" data-cy="create-blog" type="submit">Create</button>
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