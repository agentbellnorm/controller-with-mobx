import Todo from './Todo';
import Bucket from '../../plumbing/Bucket';
import viewMaker from '../../plumbing/View';

type Controller = {
    render: Function;
}



export default ({ id }: { id: string }): Controller => {
    const store = new Bucket({ todos: ['tvätta'] });
    store.onChange((state: any) => console.log('state change', state));
    
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
