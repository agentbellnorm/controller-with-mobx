import React from 'react';
import Bucket from '../../plumbing/Bucket';
import * as core from './core'
import TodoHistory from './TodoHistory';

type TodoProps = {
    store: Bucket<core.State>;
}

function Todo({ store }: TodoProps) {
    console.log('Todo render');
    return (
        <>
            <h2>{store.state.header}</h2>
            <input value={store.state.todoInputValue} onChange={(e) => {
                store.swap(core.handleNewInputValue, e.currentTarget.value);
            }} />
            <button onClick={() => store.swap(core.addItem)}>Add Item</button>
            <ul>
                {store.state.todos.map((todo: string) => (
                    <li key={todo}>
                        {todo}
                        <button onClick={() => store.swap(core.markAsDone, todo)}><span role="img" aria-label="check">✅</span></button>
                    </li>
                ))}
            </ul>
{            <TodoHistory store={store}/>}
        </>);
}

export default Todo;