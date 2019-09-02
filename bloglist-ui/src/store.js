import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import noticereducer from './reducers/noticeReducer';
import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';
import userStatsReducer from './reducers/userStatsReducer';

const reducer = combineReducers({
    notice: noticereducer,
    blogs: blogReducer,
    userStats: userStatsReducer,
    user: userReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;