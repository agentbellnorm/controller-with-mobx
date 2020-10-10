import React from 'react';

type TodoProps = {
    state: any;
    swap: any;
}

function Todo({ state, swap }: TodoProps) {
    return (
        <>
            <ul>
                {state.todos.map((todo: string) => (
                    <li key={todo}>{todo}</li>
                ))}
            </ul>
            <button onClick={() => swap({
                todos: ['diska', 'damsug'],
            })}>Ändra state</button>
        </>);
}

export default Todo;