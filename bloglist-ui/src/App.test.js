import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, waitForElement } from '@testing-library/react';
jest.mock('./services/blogs');
import App from './App';

afterEach(cleanup);

let savedItems = [];

const localStorageMock = {
    setItem: (key, item) => {
        savedItems[key] = item;
    },
    getItem: (key) => savedItems[key],
    clear: savedItems = {}
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('<App />', () => {
    test('if no user logged in, blog posts are not rendered', async () => {
        const component = render(
            <App />
        );
        component.rerender(<App />);
        await waitForElement(
            () => component.container.querySelector('.toggle-login')
        );

        expect(component.container).not.toHaveTextContent('Blogs');
        expect(component.container).not.toHaveTextContent('Demo blog post for demo purposes');
    });
    test('renders all posts from backend when logged in', async () => {
        const user = {
            username: 'tester',
            token: '1231231214',
            name: 'Donald Tester'
        };
        localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
        const component = render(
            <App />
        );
        component.rerender(<App />);
        await waitForElement(
            () => component.container.querySelector('.post-entry')
        );

        const blogs = component.container.querySelectorAll('.post-entry');
        expect(blogs.length).toBe(3);
        expect(component.container).toHaveTextContent('Just another blog post here');
    });
});