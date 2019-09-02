import loginService from '../services/login';
import blogService from '../services/blogs';

export const loginUser = ( e, credentials = null ) =>  {
    e.preventDefault();
    return async dispatch => {

        await dispatch({
            type: 'INIT_LOGIN',
        });

        try {
            const user = await loginService.login(credentials);
            if ( user ) {
                window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
                blogService.setToken(user.token);
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    user
                });
            }
        } catch(exception) {
            dispatch({
                type: 'LOGIN_FAIL',
            });
        }

        dispatch({
            type: 'LOGIN_DONE'
        });
    };
};

export const setUsername = (e) => {
    return dispatch => {
        dispatch({
            type: 'SET_USERNAME',
            username: e.target.value
        });
    };
};

export const setPassword = (e) => {
    return dispatch => {
        dispatch({
            type: 'SET_PASSWORD',
            password: e.target.value
        });
    };
};

export const authenticationCheck = () => {
    return async dispatch => {
        const loggedInUserJSON = await window.localStorage.getItem('loggedBlogAppUser');
        let user = null;
        if ( loggedInUserJSON ) {
            user = JSON.parse(loggedInUserJSON);
            blogService.setToken(user.token);
        }
        dispatch({
            type: 'CHECK_IF_ALREADY_AUTHENTICATED',
            user
        });
        dispatch({
            type: 'AUTHENTICATION_CHECK_DONE',
        });
    };
};

export const logoutUser = () => {
    return async dispatch => {
        await window.localStorage.removeItem('loggedBlogAppUser');
        blogService.setToken('');
        dispatch({
            type: 'LOGING_OUT'
        });
        dispatch({
            type: 'LOGOUT_DONE'
        });
    };
};

const initialState = {
    username: '',
    password: '',
    user: null,
    loginFail: false,
    fetching: false,
    loginout: false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'SET_USERNAME' :
        return {
            ...state,
            username: action.username
        };
    case 'SET_PASSWORD' :
        return {
            ...state,
            password: action.password
        };
    case 'INIT_LOGIN' :
        return {
            ...state,
            fetching: true
        };
    case 'LOGIN_SUCCESS' :
        return {
            ...state,
            user: action.user,
            loginFail: false
        };
    case 'LOGIN_FAIL' :
        return {
            ...state,
            loginFail: true
        };
    case 'LOGIN_DONE' :
        return {
            ...state,
            fetching: false
        };
    case 'CHECK_IF_ALREADY_AUTHENTICATED' :
        return {
            ...state,
            user: action.user ? action.user : null,
            fetching: true
        };
    case 'AUTHENTICATION_CHECK_DONE' :
        return {
            ...state,
            fetching: false
        };
    case 'LOGING_OUT' :
        return {
            ...state,
            user: null,
            loginout: true
        };
    case 'LOGOUT_DONE' :
        return {
            ...state,
            loginout: false
        };
    default: return state;
    }
};

export default userReducer;