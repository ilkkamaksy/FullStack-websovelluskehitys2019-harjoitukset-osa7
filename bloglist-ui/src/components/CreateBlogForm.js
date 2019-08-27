import React from 'react';
import PropTypes from 'prop-types';

const CreateBlogForm = ({
    handleCreateBlog,
    blogTitle,
    blogAuthor,
    blogUrl,
}) => {

    return (
        <div>
            <h2>Create new post</h2>
            <form onSubmit={handleCreateBlog}>
                <div>
                    Title
                    <input {...blogTitle} />
                </div>
                <div>
                    Author
                    <input {...blogAuthor} />
                </div>
                <div>
                    Url
                    <input {...blogUrl} />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

CreateBlogForm.propTypes = {
    handleCreateBlog: PropTypes.func.isRequired,
};

export default CreateBlogForm;