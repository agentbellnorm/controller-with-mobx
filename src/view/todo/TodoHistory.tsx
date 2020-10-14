import React from 'react';
import magic from '../../plumbing/Magic'
import * as core from './core';

const TodoHistory = ({ store }: { store: any }) => {
    console.log('TodoHistory, render');
    
    return (
        <>
            <h2>Färdiga</h2>
            <ul>
                {store.state.doneTodos.map((done: string) => 
                <li key={done}>
                    {done}
                    <button onClick={() => store.swap(core.removeDone, done)}>
                        <span role="img" aria-label="remove">❌</span>
                    </button>
                </li>)}
            </ul>
        </>
    );
}

export default magic(TodoHistory);