import Bucket from './Bucket';
import { autorun } from 'mobx';

type State = {
    key: string;
}

describe('Bucket', () => {
    it('reset', () => {
        const bucket = new Bucket<State>({ key: 'value' });
        bucket.reset({ key: 'value2' });
        expect(bucket.deref().key).toBe('value2');
    });

    it('swap', () => {
        const bucket = new Bucket<State>({ key: 'value' });
        const appendFunc = (state: State, a1: string, a2: string): State => {
            state.key = state.key + a1 + a2;
            return state;
        }

        bucket.swap(appendFunc, ' lol', ' wut');

        expect(bucket.deref().key).toBe('value lol wut');
    });

    it('triggers onchange on swap', () => {
        const bucket = new Bucket<State>({ key: 'value' });
        const appendFunc = (state: State, a1: string, a2: string): State => {
            state.key = state.key + a1 + a2;
            return state;
        }

        const spy = jest.fn()
        bucket.onChange(spy);
        bucket.swap(appendFunc, ' lol', ' wut');
        expect(spy).toHaveBeenNthCalledWith(1, { key: 'value lol wut' });
    })

    it('multiple swaps are batched', () => {
        type DigitState = { digit: number };
        const setNumber = (state: DigitState, number: number): DigitState => {
            state.digit = number;
            return state;
        }

        const bucket = new Bucket<DigitState>({ digit: -1 });

        const spy = jest.fn()
        bucket.onChange(spy);

        for (let i = 0; i <= 1000; i++) {
            bucket.swap(setNumber, i);
        }

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ digit: 1000 });
    })

    it('calling function that accesses array deep in state causes reaction', () => {
        type DeepState = { step1: { step2: { items: Array<number> } } };

        const getEven = (state: DeepState): Array<number> => state.step1.step2.items.filter(item => item % 2 === 0);
        const addItem = (state: DeepState, item: number): DeepState => {
            state.step1.step2.items.push(item);
            return state;
        }

        const bucket = new Bucket<DeepState>({ step1: { step2: { items: [1, 2, 3, 4, 5] } } });
        const spy = jest.fn()

        const disposer = autorun(() => spy(getEven(bucket.state)))

        bucket.swap(addItem, 6)

        disposer();

        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenNthCalledWith(1, [2, 4]);
        expect(spy).toHaveBeenNthCalledWith(2, [2, 4, 6]);
    });

    it('calling function that accesses string deep in state causes reaction', () => {
        type DeepState = { step1: { step2: { value: string } } };

        const getTwice = (state: DeepState): string => state.step1.step2.value.repeat(2);
        const addToDeepValue = (state: DeepState, v: string): DeepState => {
            state.step1.step2.value = `${state.step1.step2.value}${v}`;
            return state;
        }

        const bucket = new Bucket<DeepState>({ step1: { step2: { value: 'hej' } } });
        const spy = jest.fn()

        const disposer = autorun(() => spy(getTwice(bucket.state)))

        bucket.swap(addToDeepValue, 'då')

        disposer();

        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenNthCalledWith(1, 'hejhej');
        expect(spy).toHaveBeenNthCalledWith(2, 'hejdåhejdå');
    });

    it('calling function that does not access updated part of state does not cause reaction', () => {
        type State = {
            fruits: {
                banana: Preference,
            },
            vegetables: {
                tomato: Preference,
            }
        }

        type Preference = 'yum' | 'yuck';

        const setBananaPreference = (state: State, p: Preference): State => {
            state.fruits.banana = p;
            return state;
        }

        const getBananaPreference = (state: State): Preference => state.fruits.banana
        const getTomatoPreference = (state: State): Preference => state.vegetables.tomato

        const bananaSpy = jest.fn();
        const tomatoSpy = jest.fn();

        const bucket = new Bucket<State>({
            fruits: {
                banana: 'yuck',
            },
            vegetables: {
                tomato: 'yuck',
            }
        })

        const bananaDisposer = autorun(() => bananaSpy(getBananaPreference(bucket.state)));
        const tomatoDisposer = autorun(() => tomatoSpy(getTomatoPreference(bucket.state)));
        
        bucket.swap(setBananaPreference, 'yum');

        expect(bananaSpy).toHaveBeenNthCalledWith(1, 'yuck');
        expect(bananaSpy).toHaveBeenNthCalledWith(2, 'yum');

        expect(tomatoSpy).toHaveBeenNthCalledWith(1, 'yuck');
        expect(tomatoSpy).toHaveBeenCalledTimes(1);

    });
});

export { };