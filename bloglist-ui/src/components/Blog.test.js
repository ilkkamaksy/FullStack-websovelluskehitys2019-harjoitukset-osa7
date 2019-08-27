import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent } from '@testing-library/react';
// import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';

afterEach(cleanup);

const blog = {
    title: 'Testing blog post title',
    likes: 5,
    author: 'Erkki Esimerkki',
    id: 1,
    url: 'url-here',
    user: {
        username: 'testuser',
        name: 'Test User',
        id: 2
    }
};

const user = {
    id: 3,
    username: 'testuser',
    name: 'Test User'
};

test('renders initially only title and author', () => {
    const mockHandler = jest.fn();
    const component = render(
        <Blog blog={blog} user={user} handleLike={mockHandler} />
    );

    // const post = component.container.querySelector('.post-entry');
    // console.log(prettyDOM(post));
    expect(component.container).toHaveTextContent('Testing blog post title Erkki Esimerkki');
    const postMeta = component.container.querySelector('.post-meta');
    expect(postMeta).toHaveStyle('display: none');
});

test('blog meta shown after click on title', () => {
    const mockHandler = jest.fn();
    const component = render(
        <Blog blog={blog} user={user} handleLike={mockHandler} />
    );

    const postMeta = component.container.querySelector('.post-meta');
    const title = component.container.querySelector('.post-title');
    fireEvent.click(title);

    expect(postMeta).not.toHaveStyle('display: none');
});

test('blog meta hidden after second click on title', () => {
    const mockHandler = jest.fn();
    const component = render(
        <Blog blog={blog} user={user} handleLike={mockHandler} />
    );

    const postMeta = component.container.querySelector('.post-meta');
    const title = component.container.querySelector('.post-title');
    fireEvent.click(title);
    fireEvent.click(title);

    expect(postMeta).toHaveStyle('display: none');
});

test('clicking like button calls event handler once', async () => {
    const mockHandler = jest.fn();
    const { getByText } = render(
        <Blog blog={blog} user={user} handleLike={mockHandler} />
    );

    const button = getByText('like');
    fireEvent.click(button);

    expect(mockHandler.mock.calls.length).toBe(1);
});