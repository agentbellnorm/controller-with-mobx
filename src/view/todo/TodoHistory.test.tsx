import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import todoHistoryMaker from './TodoHistory';
import Bucket from '../../plumbing/Bucket';
import * as core from './core';

const shallowRender = (element: React.ReactElement<any, any>) => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(element);
    return renderer.getRenderOutput();;
} 

describe('TodoHistory', () => {
    it('renders', () => {
        const store = new Bucket<core.State>(core.getInitialState());
        const TodoHistory = todoHistoryMaker(store);
        expect(shallowRender(<TodoHistory />)).toMatchSnapshot();
    });

    it('items in list', () => {
        const store = new Bucket<core.State>({...core.getInitialState(), doneTodos: ['vacuum', 'get food']});
        const TodoHistory = todoHistoryMaker(store);
        expect(shallowRender(<TodoHistory />)).toMatchSnapshot();
    });
});

export {}