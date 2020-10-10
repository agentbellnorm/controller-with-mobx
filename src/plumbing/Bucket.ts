import { makeAutoObservable, reaction , observable} from 'mobx';

export default class Bucket {
    state: any = {};

    constructor(initialState: any) {
        makeAutoObservable(this);
        this.state = initialState
    }

    swap(newState: any) {
        console.log('oldstate', this.state);
        console.log('newstate', newState);
        this.state = newState;
    }

    onChange(effect?: Function) {
        reaction(() => this.state,
            state => {
                if (effect) {
                    effect(state);
                }
            },
            { fireImmediately: true });
    }
}
