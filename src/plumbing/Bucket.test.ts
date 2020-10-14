import Bucket from './Bucket';

type State = {
    key: string;
}

describe('Bucket' , () => {
    it('reset', () => {
        const bucket = new Bucket<State>({key: 'value'});
        bucket.reset({key: 'value2'});
        expect(bucket.deref().key).toBe('value2');
    });

    it('swap', () => {
        const bucket = new Bucket<State>({key: 'value'});
        const appendFunc = (state: State, a1: string, a2: string): State => {
            state.key = state.key + a1 + a2;
            return state;
        } 

        bucket.swap(appendFunc, ' lol', ' wut');

        expect(bucket.deref().key).toBe('value lol wut');
    });
});

export {};