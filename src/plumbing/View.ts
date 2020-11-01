import React from 'react';
import ReactDOM from 'react-dom';

const viewMaker = ({ Component }: { Component: any }) => {
    let container: HTMLElement | null;
    return {
        mount: (id: string) => {
            container = document.getElementById(id);
            ReactDOM.render(React.createElement(Component), container);
        },
        unmount: () => {
            if (!container) {
                return;
            }
            ReactDOM.unmountComponentAtNode(container);
        },
    }
}

export default viewMaker