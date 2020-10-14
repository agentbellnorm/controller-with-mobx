import React from 'react';
import * as core from './core'
import TodoHistory from './TodoHistory';

type TodoProps = {
    state: core.State;
    swap: any;
}

function Todo({ state, swap }: TodoProps) {
    return (
        <>
            <h2>{state.header}</h2>
            <input value={state.todoInputValue} onChange={(e) => {
                swap(core.handleNewInputValue, e.currentTarget.value);
            }} />
            <button onClick={() => swap(core.addItem)}>Add Item</button>
            <ul>
                {state.todos.map((todo: string) => (
                    <li key={todo}>
                        {todo}
                        <button onClick={() => swap(core.markAsDone, todo)}><span role="img" aria-label="check">✅</span></button>
                    </li>
                ))}
            </ul>
{            <TodoHistory state={state} swap={swap}/>}
        </>);
}

export default Todo;