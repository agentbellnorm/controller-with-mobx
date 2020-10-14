import React from 'react';
import * as core from './core';

const TodoHistory = ({ state, swap }: { state: core.State, swap: Function }) => {
    return (
        <>
            <h2>Färdiga</h2>
            <ul>
                {state.doneTodos.map((done: string) => 
                <li key={done}>
                    {done}
                    <button onClick={() => swap(core.removeDone, done)}>
                        <span role="img" aria-label="remove">❌</span>
                    </button>
                </li>)}
            </ul>
        </>
    );
}

export default TodoHistory