import Todo from './Todo';
import Bucket from '../../plumbing/Bucket';
import viewMaker from '../../plumbing/View';
import * as core from './core';

type Controller = {
    render: () => void;
}

export default ({ id }: { id: string }): Controller => {
    const store = new Bucket<core.State>(core.getInitialState());
    store.onChange((state: core.State) => console.log('state change', state));
    
    const view = viewMaker({
        store,
        Component: Todo,
    });

    return {
        render: () => {
            view.mount(id);
        }
    };
};
