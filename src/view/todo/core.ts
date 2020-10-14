
export type State = {
    todos: Array<string>;
    todoInputValue: string;
    header: string,
}

export const getInitialState = (): State => {
    return { 
        todos: ['tvätta', 'diska'],
        todoInputValue: '',
        header: 'Attgöra'
     };
}

export const handleNewInputValue = (state: State, v: string): State => {
    console.log('core', v);
    state.todoInputValue = v;
    return state;
}

export const reverse = (state: State): State => {
    state.todos = state.todos.reverse();
    return state;
}