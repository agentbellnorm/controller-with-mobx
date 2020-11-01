import React from 'react';
import Bucket from '../../plumbing/Bucket';
import magic from '../../plumbing/Magic';
import * as core from './core';
import todoHistoryMaker from './TodoHistory';

const todoMaker = (store: Bucket<core.State>) => {
    const TodoHistory = todoHistoryMaker(store);

    const Todo = () => {
        return (
            <>
                <h2>{store.state.header}</h2>
                <input value={store.state.todoInputValue} onChange={(e) => {
                    store.swap(core.handleNewInputValue, e.currentTarget.value);
                }} />
                <button onClick={() => store.swap(core.addItem)}>Add Item</button>
                <ul>
                    {store.state.todos.map((todo: string) => (
                        <li role="todo-item" key={todo}>
                            {todo}
                            <button onClick={() => store.swap(core.markAsDone, todo)}><span role="img" aria-label="check">✅</span></button>
                        </li>
                    ))}
                </ul>
                <TodoHistory />
            </>);
    }

    return magic(Todo);
}

export default todoMaker;