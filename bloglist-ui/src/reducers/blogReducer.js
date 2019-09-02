import blogService from '../services/blogs';
import commentService from '../services/comments';

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll();
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        });
    };
};

export const voteBlog = (blog) => {
    return async dispatch => {

        const postToUpdate = {
            ...blog,
            likes: blog.likes + 1,
        };

        const result = await blogService.update(blog.id, postToUpdate);
        const updatedBlog = {
            ...result,
            user: postToUpdate.user
        };
        dispatch({
            type: 'VOTE_BLOG',
            data: updatedBlog,
            name: 'vote'
        });

        if ( updatedBlog.likes === postToUpdate.likes ) {
            dispatch({
                type: 'ACTION_SUCCESS',
                name: 'vote',
                data: updatedBlog
            });
        } else {
            dispatch({
                type: 'ACTION_FAIL',
                data: postToUpdate
            });
        }
    };
};

export const addComment = (e, comment, blog) => {
    return async dispatch => {
        e.preventDefault();
        const result = await commentService.create(comment);

        const newBlog = {
            ...blog,
            comments: blog.comments.concat(result)
        };

        dispatch({
            type: 'ADD_COMMENT',
            name: 'comment',
            data: newBlog
        });
        if ( result ) {
            dispatch({
                type: 'ACTION_SUCCESS',
                name: 'comment',
                data: newBlog
            });
        } else {
            dispatch({
                type: 'ACTION_FAIL',
                name: 'comment',
                data: newBlog
            });
        }
    };
};

export const addBlog = (e, blog, user) => {
    return async dispatch => {
        e.preventDefault();

        const result = await blogService.create(blog);
        const newBlog = {
            ...result,
            user: {
                name: user.name,
                username: user.username
            }
        };

        dispatch({
            type: 'ADD_BLOG',
            data: newBlog,
            name: 'add'
        });

        if ( result ) {
            dispatch({
                type: 'ACTION_SUCCESS',
                name: 'add',
                data: newBlog
            });
        } else {
            dispatch({
                type: 'ACTION_FAIL',
                data: blog,
                name: 'add'
            });
        }
    };
};

export const removeBlog = (blog) => {
    return async dispatch => {
        if ( window.confirm(`remove blog ${blog.title} by ${blog.author}?`) ) {

            await blogService.remove(blog.id);

            dispatch({
                type: 'REMOVE_BLOG',
                id: blog.id,
                name: 'remove',
                data: blog
            });

            dispatch({
                type: 'ACTION_SUCCESS',
                name: 'remove',
                data: blog
            });
        }
    };
};


const initialState = {
    postdata: [],
    processing: null,
    blogProcessed: null,
    error: null
};

const blogReducer = (state = initialState, action) => {
    // console.log('state now: ', state);
    // console.log('action', action);
    switch (action.type) {
    case 'INIT_BLOGS':
        return {
            ...state,
            postdata: action.data
        };
    case 'ADD_BLOG':
        return {
            ...state,
            postdata: [...state.postdata, action.data],
            processing: action.name,
            blogProcessed: action.data,
            newTitle: '',
            newAuthor: '',
            newUrl: ''
        };
    case 'ADD_COMMENT':
        return {
            ...state,
            postdata: state.postdata.map(blog => blog.id !== action.data.id ? blog : action.data),
            processing: action.name,
            blogProcessed: action.data
        };
    case 'VOTE_BLOG':
        return {
            postdata: state.postdata.map(blog => blog.id !== action.data.id ? blog : action.data),
            processing: action.name,
            blogProcessed: action.data
        };
    case 'REMOVE_BLOG':
        return {
            ...state,
            postdata: state.postdata.filter(blog => blog.id !== action.id),
            processing: action.name,
            blogProcessed: action.data,
        };
    case 'ACTION_SUCCESS':
        return {
            ...state,
            [action.name]: false,
            blogProcessed: null,
            processing: null,
            error: null
        };
    case 'ACTION_FAIL':
        return {
            ...state,
            error: action.name
        };
    default: return state;
    }
};

export default blogReducer;