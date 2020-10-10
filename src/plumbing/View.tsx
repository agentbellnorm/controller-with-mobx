import React from 'react';
import { createElement as e } from 'react';
import ReactDOM from 'react-dom';
import Bucket from "./Bucket"
import { Observer, observer } from 'mobx-react';

interface Props {
    state: any;
    swap: Function;
}

const viewMaker = ({ store, Component }: { store: any, Component: any }) => {
    const Wrapped = observer(({_store}: any) =>
     <Component
        state={_store.state}
        swap={(v: any) => _store.swap(v)}/>
        );

    return {
        mount: (id: string) => {
            ReactDOM.render(
                <Wrapped _store={store}/>,
                document.getElementById(id));
        }
    }
}

export default viewMaker