import { makeAutoObservable, autorun, runInAction } from 'mobx';

export interface SwapFunction<G> {
    (state: G, ...rest: any[]): G
}

export default class Bucket<T> {
    state!: T;

    constructor(initialState: T) {
        makeAutoObservable(this, {}, { deep: true });
        runInAction(() => {
            this.reset(initialState);
        });
    }

    reset(newValue: T): T {
        this.state = newValue;
        return this.state;
    }

    swap(swapFunction: SwapFunction<T>, ...args: any[]): T {
        const newState = swapFunction.apply(null, [this.state, ...args]);
        return this.reset(newState);
    }

    deref(): T {
        return this.state;
    }

    onChange(listener: (state: T) => void) {
        autorun(() => listener(this.state));
    }
}
