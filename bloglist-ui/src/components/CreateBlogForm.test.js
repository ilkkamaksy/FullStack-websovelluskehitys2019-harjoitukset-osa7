import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, cleanup } from '@testing-library/react';
// import { prettyDOM } from '@testing-library/dom';
import CreateBlogForm from './CreateBlogForm';

afterEach(cleanup);

const Wrapper = (props) => {
    const onChangeTitle = (value) => {
        props.state.title = value;
    };

    const onChangeAuthor = (value) => {
        props.state.author = value;
    };

    const onChangeUrl = (value) => {
        props.state.url = value;
    };

    return (
        <CreateBlogForm
            handleCreateBlog={props.onSubmit}
            blogTitle={props.state.title}
            blogAuthor={props.state.author}
            blogUrl={props.state.url}
            setBlogTitle={onChangeTitle}
            setBlogAuthor={onChangeAuthor}
            setBlogUrl={onChangeUrl}
        />
    );
};

test('<CreateBlogForm /> updates parent state and calls onSubmit', () => {
    const onSubmit = jest.fn();
    const state = {
        title: '',
        author: '',
        url: ''
    };
    const component = render(
        <Wrapper onSubmit={onSubmit} state={state} />
    );

    const titleInput = component.container.querySelector('[name="title"]');
    const authorInput = component.container.querySelector('[name="author"]');
    const urlInput = component.container.querySelector('[name="url"]');
    const form = component.container.querySelector('form');

    fireEvent.change(titleInput, { target: { value: 'testing title' } });
    fireEvent.change(authorInput, { target: { value: 'Pekka Puupää' } });
    fireEvent.change(urlInput, { target: { value: 'https://www.example.com' } });
    fireEvent.submit(form);

    expect(onSubmit.mock.calls.length).toBe(1);
    expect(state.title).toBe('testing title');
    expect(state.author).toBe('Pekka Puupää');
    expect(state.url).toBe('https://www.example.com');
});