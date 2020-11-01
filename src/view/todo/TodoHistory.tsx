import React from 'react';
import magic from '../../plumbing/Magic'
import Bucket from '../../plumbing/Bucket';
import * as core from './core';

const todoHistoryMaker = (store: Bucket<core.State>) => {
    const TodoHistory = () => {
        return (
            <>
                <h2>Färdiga</h2>
                <ul>
                    {store.state.doneTodos.map((done: string) => 
                    <li role="done-item" key={done}>
                        {done}
                        <button onClick={() => store.swap(core.removeDone, done)}>
                            <span role="img" aria-label="remove">❌</span>
                        </button>
                    </li>)}
                </ul>
            </>
        );
    }
    return magic(TodoHistory);
}

export default todoHistoryMaker;