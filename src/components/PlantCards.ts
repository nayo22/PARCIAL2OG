import { CounterActions, StoreActions, PlantActiontype } from '../flux/Actions';
import { State, store } from '../flux/Store';
import { getPlants } from '../services/PlantsAPI';
import { isStateValid } from '../utils/StateCheck';

class PlantCards extends HTMLElement {
    render(state: State = store.getState()): void {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <section>
                <h2>Plant-Cards</h2>
                <pre>${JSON.stringify(state, null, 2)}</pre>
            </section>
        `;

        this.maybeLoadInitialState(state);
    }

    private maybeLoadInitialState(currentState: State): void {
        const estaBien = isStateValid(currentState);
        if (!estaBien) {
            getPlants()
                .then((fetchedState) => {
                    StoreActions.loadState(fetchedState);
                });
        }
    }

    private handleChange(newState: State): void {
        this.render(newState);
    }

    connectedCallback(): void {
        store.subscribe((estado) => this.handleChange(estado));
        this.attachShadow({ mode: 'open' });
        this.render();
    }
}

customElements.define('Plant-Cards', PlantCards);

export PlantCards