import React, { useState, useEffect } from 'react';
// import blogService from './services/blogs';
import loginService from './services/login';
import BlogList from './components/BlogList';
import Notification from './components/Notification';
import CreateBlogForm from './components/CreateBlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';

import { useField, useResource } from './hooks/index';

import './App.css';

const App = () => {
    const [blogs, blogService] = useResource('http://localhost:3003/api/blogs');
    const [notice, setNoticeMessage] = useState(null);
    const [user, setUser] = useState(null);

    const usernameInput = useField('text');
    const passwordInput = useField('password');

    const blogTitle = useField('text');
    const blogAuthor = useField('text');
    const blogUrl = useField('text');

    useEffect(() => {
        blogService.getAll();
    }, []);

    useEffect(() => {
        const loggedInUserJSON = window.localStorage.getItem('loggedBlogAppUser');
        if ( loggedInUserJSON ) {
            const user = JSON.parse(loggedInUserJSON);
            blogService.setToken(user.token);
            setUser(user);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const username = usernameInput.value;
            const password = passwordInput.value;
            const user = await loginService.login({ username, password });
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));

            blogService.setToken(user.token);
            setUser(user);
            setNotice({ message: `Logged in as ${user.name}`, type: 'success' });
            usernameInput.reset();
            passwordInput.reset();
        } catch (exception) {
            usernameInput.reset();
            passwordInput.reset();
            setNotice({ message: 'Wrong username or password', type: 'error' });
        }
    };

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogAppUser');
        setUser(null);
        setNotice({ message: 'Logged out successfully', type: 'success' });
    };

    const handleCreateBlog = async (e) => {
        e.preventDefault();
        blogFormRef.current.toggleVisibility();
        const newBlogPost = {
            title: blogTitle.value,
            author: blogAuthor.value,
            url: blogUrl.value
        };

        try {
            blogService.create(newBlogPost);
            setNotice({ message: `a new blog post ${newBlogPost.title} by ${newBlogPost.author}`, type: 'success' });
            blogTitle.reset();
            blogAuthor.reset();
            blogUrl.reset();
        } catch ( exception ) {
            setNotice({ message: 'error: could not publish post', type: 'error' });
        }
    };

    const handleLike = async blog => {
        try {
            const postToUpdate = {
                ...blog,
                likes: blog.likes + 1,
            };
            blogService.update(blog.id, postToUpdate);
        } catch (exception) {
            setNotice({ message: 'error: could not update post', type: 'error' });
        }
    };

    const handleRemove = async blog => {
        if ( window.confirm(`remove blog ${blog.title} by ${blog.author}?`) ) {
            try {
                blogService.remove(blog.id);
                setNotice({ message: `${blog.title} ${blog.author} removed`, type: 'success' });
            } catch (exception) {
                setNotice({ message: 'error: could not delete post', type: 'error' });
            }
        }
    };

    const setNotice = ( notice ) => {
        setNoticeMessage(notice);
        setTimeout(() => {
            setNoticeMessage(null);
        }, 5000);
    };

    const blogFormRef = React.createRef();

    const removeReset = ({ reset: _, ...clone }) => clone;

    return (
        <div className="App">

            { notice && <Notification notice={notice} /> }

            {user === null
                ?
                <Togglable buttonLabel="login">
                    <LoginForm
                        usernameInput={removeReset(usernameInput)}
                        passwordInput={removeReset(passwordInput)}
                        handleSubmit={handleLogin}
                    />
                </Togglable>
                :
                <div>

                    <h1>Blogs</h1>
                    <p>
                        {user.name} logged in
                        <button onClick={handleLogout}>Logout</button>
                    </p>

                    <Togglable buttonLabel="Create a new blog post" ref={blogFormRef}>
                        <CreateBlogForm
                            blogTitle={removeReset(blogTitle)}
                            blogAuthor={removeReset(blogAuthor)}
                            blogUrl={removeReset(blogUrl)}
                            handleCreateBlog={handleCreateBlog}
                        />
                    </Togglable>

                    <BlogList
                        blogs={blogs}
                        handleLike={handleLike}
                        handleRemove={handleRemove}
                        user={user}
                    />

                </div>
            }
        </div>
    );
};

export default App;
