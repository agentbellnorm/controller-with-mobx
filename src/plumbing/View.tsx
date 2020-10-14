import React from 'react';
import { createElement as e } from 'react';
import ReactDOM from 'react-dom';
import Bucket from "./Bucket"
import { Observer, observer } from 'mobx-react';

interface Props {
    state: any;
    swap: Function;
}

const viewMaker = ({ store, Component }: { store: Bucket<any>, Component: any }) => {
    const Wrapped = observer(Component);
    return {
        mount: (id: string) => {
            ReactDOM.render(
                <Wrapped state={store.state} swap={store.swap.bind(store)} />,
                document.getElementById(id));
        }
    }
}

export default viewMaker