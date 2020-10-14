import React from 'react';
import ReactDOM from 'react-dom';
import Bucket from "./Bucket"
import magic from './Magic';

interface Props {
    state: any;
    swap: Function;
}

const viewMaker = ({ store, Component }: { store: Bucket<any>, Component: any }) => {
    const MagicComponent = magic(Component);
    
    return {
        mount: (id: string) => {
            ReactDOM.render(
                <MagicComponent store={store} />,
                document.getElementById(id));
        }
    }
}

export default viewMaker