import { AppDispatcher, Action } from './Dispatcher';
import { CounterActionTypes, StoreActionTypes, PlantActions } from './Actions';

export type Plant = {
    name: string;
    name2: number;
};

export type State = {
    count: number;
    Plant: Plant | null;
};

type Listener = (state: State) => void;

class Store {
    private _state: State = {
        count: 0,
        Plant: null,
    };

    private _listeners: Listener[] = [];

    constructor() {
        AppDispatcher.register(this._onActionReceived.bind(this));
    }

    getState(): State {
        return this._state;
    }

    subscribe(listener: Listener): void {
        this._listeners.push(listener);
        listener(this.getState());
    }

    unsubscribe(listener: Listener): void {
        this._listeners = this._listeners.filter(fn => fn !== listener);
    }

    private _onActionReceived(action: Action): void {
        const { type, payload } = action;

        if (type === CounterActionTypes.INCREMENT_COUNT && typeof payload === 'number') {
            this._state = { ...this._state, count: this._state.count + payload };
        }
        else if (type === CounterActionTypes.DECREMENT_COUNT && typeof payload === 'number') {
            this._state = { ...this._state, count: this._state.count - payload };
        }
        else if (type === PlantActions.SAVE_PLANT && typeof payload === 'object') {
            this._state = { ...this._state, Plant: payload as Plant };
        }
        else if (type === StoreActionTypes.LOAD_STATE && typeof payload === 'object') {
            this._state = { ...this._state, ...payload };
        }

        this._notify();
        this._persist();
    }

    private _notify(): void {
        const snapshot = this.getState();
        for (const callback of this._listeners) {
            callback(snapshot);
        }
    }

    private _persist(): void {
        localStorage.setItem('flux:state', JSON.stringify(this._state));
    }

    load(): void {
        const saved = localStorage.getItem('flux:state');
        if (saved) {
            this._state = JSON.parse(saved);
            this._notify();
        }
    }
}

export const store = new Store();