import React from 'react';
import ReactDOM from 'react-dom';
import magic from './Magic';

const viewMaker = ({ Component }: { Component: any }) => {
    const MagicComponent = magic(Component);

    return {
        mount: (id: string) => {
            ReactDOM.render(
                <MagicComponent />,
                document.getElementById(id));
        },
    }
}

export default viewMaker