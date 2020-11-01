import todoMaker from './Todo';
import { SwapFunction } from '../../plumbing/Bucket';
import TodoStore from './TodoStore';
import viewMaker from '../../plumbing/View';
import * as core from './core';

type ControllerMakerArgs = {
    id: string;
}

type Controller = {
    render: () => void;
}


export default ({ id }: ControllerMakerArgs): Controller => {
    const store = new TodoStore(core.getInitialState());

    const handleFetchReponse = async (response: Promise<Response>, receiveFunction: SwapFunction<core.State>) => {
        const r = await response;
        if (r.ok) {
            const body = await r.json()
            store.swap(receiveFunction, body);
        }
    }

    const maybeDoSideEffects = async (state: core.State): Promise<void> => {
        if (core.shouldFetchTodos(state)) {
            handleFetchReponse(fetch('/todos'), core.receiveTodosResponse);
        }
    }

    store.onChange(maybeDoSideEffects);

    const Todo = todoMaker(store);

    const view = viewMaker({
        Component: Todo,
    });

    return {
        render: () => {
            view.mount(id);
        }
    };
};
