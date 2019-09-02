import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { initBlogs } from './reducers/blogReducer';
import { setBlogNotification, setUserNotification } from './reducers/noticeReducer';
import { authenticationCheck } from './reducers/userReducer';
import { getUserStats } from './reducers/userStatsReducer';

import Navmenu from './components/Navmenu';
import BlogList from './components/BlogList';
import Blog from './components/Blog';
import UserStats from './components/UserStats';
import SingleUserStats from './components/SingleUserStats';
import Notification from './components/Notification';
import CreateBlogForm from './components/CreateBlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';

import './App.css';

const App = (props) => {

    useEffect(() => {
        props.authenticationCheck();
    }, []);

    useEffect(() => {

        const {
            user,
            fetching,
            loginFail,
            loginout
        } = props.userdata;

        if ( fetching || loginout ) {
            props.setUserNotification( user, loginFail, loginout );
        }

        if ( props.userdata.user !== null && props.userdata.fetching ) {
            props.initBlogs();
            props.getUserStats();
        }

        const {
            processing,
            blogProcessed,
            error
        } = props.blogs;

        if ( (processing && blogProcessed) || (error && processing) ) {
            props.setBlogNotification(processing, blogProcessed, error);
        }

    });

    const userById = (id) =>
        props.userStatsData.userStats.find(a => a.id === id);

    const blogById = (id) =>
        props.blogs.postdata.find(a => a.id === id);

    const blogFormRef = React.createRef();

    return (
        <div className="App">

            <Router>

                <Navmenu />
                <Notification />

                { props.userdata.user === null
                    ?
                    <Togglable buttonLabel="login">
                        <LoginForm />
                    </Togglable>
                    :
                    <div>

                        <h1>Blogs</h1>

                        <Togglable buttonLabel="Create a new blog post" ref={blogFormRef}>
                            <CreateBlogForm />
                        </Togglable>

                        <Route exact path="/users" render={ () =>
                            <UserStats />
                        }
                        />

                        <Route exact path="/users/:id" render={({ match }) =>
                            <SingleUserStats user={ userById(match.params.id) } />
                        }
                        />
                        <Route exact path="/" render={() =>
                            <BlogList />
                        }
                        />

                        <Route exact path="/blogs/:id" render={({ match }) =>
                            <Blog blog={ blogById(match.params.id) } />
                        }
                        />

                    </div>
                }
            </Router>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        notice: state.notice,
        blogs: state.blogs,
        userdata: state.user,
        userStatsData: state.userStats
    };
};

const connectedApp = connect(
    mapStateToProps,
    {
        initBlogs,
        setBlogNotification,
        setUserNotification,
        getUserStats,
        authenticationCheck
    })(App);
export default connectedApp;
