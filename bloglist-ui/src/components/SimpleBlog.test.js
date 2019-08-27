import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

afterEach(cleanup);

test('renders content', () => {
    const blog = {
        title: 'Testing blog post title',
        likes: 5,
        author: 'Jane Doe',
        id: 1,
        url: 'url-here'
    };

    const mockHandler = jest.fn();

    const component = render(
        <SimpleBlog blog={blog} onClick={mockHandler} />
    );

    expect(component.container).toHaveTextContent('Testing blog post title');
    expect(component.container).toHaveTextContent('Jane Doe');
    expect(component.container).toHaveTextContent('Blog has 5 likes');
});

test('clicking like button calls event handler once', async () => {
    const blog = {
        title: 'Testing blog post title',
        likes: 5,
        author: 'Jane Doe',
        id: 1,
        url: 'url-here'
    };

    const mockHandler = jest.fn();

    const component = render(
        <SimpleBlog blog={blog} onClick={mockHandler} />
    );

    const button = component.getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls.length).toBe(2);

});