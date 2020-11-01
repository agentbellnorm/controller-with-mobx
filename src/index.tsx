import { configure } from "mobx"
import './index.css';
import * as serviceWorker from './serviceWorker';
import todoControllerMaker from './view/todo/Controller';

configure({
    useProxies: "never",
    enforceActions: 'always',
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
})

const rootElementId = 'root';

const todoController = todoControllerMaker({id: rootElementId});
todoController.render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
