export type State = {
    todos: Array<string>;
    todoInputValue: string;
    header: string,
    doneTodos: Array<string>;
}

export const getInitialState = (): State => {
    return { 
        todos: ['tvätta', 'diska'],
        todoInputValue: '',
        header: 'Att Göra',
        doneTodos: [],
     };
}

export const handleNewInputValue = (state: State, v: string): State => {
    console.log('core', v);
    state.todoInputValue = v;
    return state;
}

export const addItem = (state: State): State => {
    state.todos.push(state.todoInputValue);
    state.todoInputValue = '';
    return state;
};

export const reverse = (state: State): State => {
    state.todos = state.todos.reverse();
    return state;
}

export const markAsDone = (state: State, done: string): State => {
    state.todos = state.todos.filter((item: string) => item !== done);
    state.doneTodos.push(done);
    return state;
}

export const removeDone = (state: State, done: string): State => {
    state.doneTodos = state.doneTodos.filter((item: string) => item !== done);
    return state
}