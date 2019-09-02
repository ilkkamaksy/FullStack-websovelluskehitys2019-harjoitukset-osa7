const initialState = '';

export const setUserNotification = ( user = null, loginFail = null, loginout = false, timeInSeconds = 5 ) => {
    return async dispatch => {

        const notice = loginFail
            ? { content: 'Wrong username or password', type: 'error' }
            : user
                ? { content: `Logged in as ${ user.name}`, type: 'success' }
                : loginout
                    ? { content: 'Logged out successfully', type: 'success' }
                    : null;

        dispatch({
            type: 'SET_NOTICE',
            notice,
        });

        await setTimeout(() => {
            dispatch({
                type: 'SET_NOTICE',
                notice: ''
            });
        }, timeInSeconds*1000);
    };
};

export const setBlogNotification = ( actionType, blog, error = null, timeInSeconds = 5) => {
    return async dispatch => {
        let notice = {};

        if ( actionType === 'vote' ) {
            if ( error ) {
                notice = { content: `failed to update post ${blog.title} ${blog.author}`, type: 'success' };
            } else {
                notice = { content: `${blog.title} ${blog.author} liked`, type: 'success' };
            }
        } else if ( actionType === 'add' ) {
            if ( error ) {
                notice = { content: 'error: could not publish post', type: 'error' };
            } else {
                notice = { content: `a new blog post ${blog.title} by ${blog.author}`, type: 'success' };
            }
        } else if ( actionType === 'remove' ) {
            if ( error ) {
                notice = { content: `could not remove blog post ${blog.title} ${blog.author}`, type: 'error' };
            } else {
                notice = { content: `${blog.title} ${blog.author} removed`, type: 'success' };
            }
        } else if ( actionType === 'comment' ) {
            if ( error ) {
                notice = { content: `could not comment on blog ${blog.title} ${blog.author}`, type: 'error' };
            } else {
                notice = { content: `your comment was added on blog ${blog.title} ${blog.author}`, type: 'success' };
            }
        }

        dispatch({
            type: 'SET_NOTICE',
            notice,
        });

        await setTimeout(() => {
            dispatch({
                type: 'SET_NOTICE',
                notice: ''
            });
        }, timeInSeconds*1000);
    };
};

const noticeReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'SET_NOTICE' :
        return action.notice;
    default: return state;
    }
};

export default noticeReducer;