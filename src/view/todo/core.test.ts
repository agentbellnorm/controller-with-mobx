import * as core from './core';
import { objectContaining } from 'expect';

describe('todo/core', () => {
    it('addItem', () => {
        const state = {
            ...core.getInitialState(),
            todoInputValue: 'banana',
            todos: [],
        };

        expect(core.addItem(state))
            .toEqual(objectContaining({
                todos: ['banana'],
                todoInputValue: '',
            }));
    });

    it('markAsDone', () => {
        const state = {
            ...core.getInitialState(),
            todos: ['apple', 'banana', 'orange'],
            doneTodos: ['kiwi'],
        };

        expect(core.markAsDone(state, 'banana'))
            .toEqual(objectContaining({
                todos: ['apple', 'orange'],
                doneTodos: ['kiwi', 'banana']
            }));
    });

    it('receiveTodosResponse', () => {
        const state = {
            ...core.getInitialState(),
            todos: [],
            shouldFetchTodos: true,
        };

        const todosResponse = [{ title: 'apple' }, { title: 'banana' }];

        expect(core.receiveTodosResponse(state, todosResponse))
            .toEqual(objectContaining({
                todos: ['apple', 'banana'],
                shouldFetchTodos: false,
            }));
    });
});

export { };