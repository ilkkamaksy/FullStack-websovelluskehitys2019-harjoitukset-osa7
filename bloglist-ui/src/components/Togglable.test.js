import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Togglable from './Togglable';

afterEach(cleanup);

describe('<Togglable />', () => {
    let component;

    beforeEach(() => {
        component = render(
            <Togglable buttonLabel="login">
                <div className="testDiv"></div>
            </Togglable>
        );
    });

    test('renders children', () => {
        component.container.querySelector('.testDiv');
    });

    test('by default children are not displayed', () => {
        const div = component.container.querySelector('.togglableContent');
        expect(div).toHaveStyle('display: none');
    });

    test('children are visible after clicking on the button', () => {
        const button = component.getByText('login');
        fireEvent.click(button);

        const div = component.container.querySelector('.togglableContent');
        expect(div).not.toHaveStyle('display: none');
    });

    test('toggled content can be closed', () => {
        const button = component.getByText('login');
        fireEvent.click(button);

        const closeButton = component.getByText('cancel');
        fireEvent.click(closeButton);

        const div = component.container.querySelector('.togglableContent');
        expect(div).toHaveStyle('display: none');
    });
});