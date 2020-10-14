import { makeAutoObservable, autorun, action, runInAction} from 'mobx';

export default class Bucket<T> {
    state!: T; 

    constructor(initialState: T) {
        makeAutoObservable(this, {}, {deep: true});
        runInAction(() => {
            this.state = initialState;
        });
    }

    @action
    reset(newValue: T): T {
        this.state = newValue;
        return this.state;
    }

    swap(swapFunction: (state: T, ...rest: any[]) => T, ...args: any[]) {
        return this.reset(swapFunction.apply(null, [this.state, ...args]));
    }

    deref(): T {
        return this.state;
    }

    onChange(listener: (state: T) => void) {
        autorun(() => listener(this.state));
    }
}
