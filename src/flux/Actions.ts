import { AppDispatcher } from './Dispatcher';
import { State } from './Store';

export const CounterActionTypes = {
    INCREMENT_COUNT: 'INCREMENT_COUNT',
    DECREMENT_COUNT: 'DECREMENT_COUNT'
};

export const StoreActionTypes = {
    LOAD_STATE: 'LOAD_STATE',
};

export const PlantActionTypes = {
    SAVE_PLANT: 'SAVE_PLANT',
};

export const StoreActions = {
    loadState: (state: State) => {
        AppDispatcher.dispatch({
            type: StoreActionTypes.LOAD_STATE,
            payload: state,
        });
    },
};

export const CounterActions = {
    increment: (value: number) => {
        AppDispatcher.dispatch({
            type: CounterActionTypes.INCREMENT_COUNT,
            payload: value,
        });
    },
    decrement: (value: number) => {
        AppDispatcher.dispatch({
            type: CounterActionTypes.DECREMENT_COUNT,
            payload: value,
        });
    },
};

export const PlantActions = {
    savePlant: (plant: { name: string; age: number }) => {
        AppDispatcher.dispatch({
            type: PlantActionTypes.SAVE_PLANT,
            payload: plant,
        });
    },
};