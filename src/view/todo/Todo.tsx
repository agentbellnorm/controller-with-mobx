import React from 'react';
import * as core from './core'

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
            <ul>
                {state.todos.map((todo: string) => (
                    <li key={todo}>{todo}</li>
                ))}
            </ul>
            <button onClick={() => swap(core.reverse)}>Ändra state</button>
        </>);
}

export default Todo;