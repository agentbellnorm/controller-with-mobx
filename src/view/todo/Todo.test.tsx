import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import todoMaker from './Todo';
import Bucket from '../../plumbing/Bucket';
import * as core from './core';

const shallowRender = (element: React.ReactElement<any, any>) => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(element);
    return renderer.getRenderOutput();;
}

describe('Todo', () => {
    it('renders', () => {
        const store = new Bucket<core.State>(core.getInitialState());
        const Todo = todoMaker(store);
        expect(shallowRender(<Todo />)).toMatchSnapshot();
    });

    it('reacts to swap', () => {
        const initialState = {
            ...core.getInitialState(),
            todos: ['a', 'b'],
        };
        const store = new Bucket<core.State>(initialState);
        const Todo = todoMaker(store);

        render(<Todo />);

        expect(screen.getAllByRole('todo-item').length).toBe(2);
        expect(screen.queryByRole('done-item')).not.toBeInTheDocument();

        store.swap(core.markAsDone, 'a');

        expect(screen.getAllByRole('todo-item').length).toBe(1);
        expect(screen.getAllByRole('done-item').length).toBe(1);
    });
});

export { }