import { State, store } from '../flux/Store';

class HomePage extends HTMLElement {
    private render(estadoActual: State = store.getState()): void {
        if (!this.shadowRoot) return;

        const plants = [...estadoActual.Plant.userGarden];
        plants.sort((a, b) => a.commonName.localeCompare(b.commonName));

        const styles = `
            <style>
                :host {
                    display: block;
                    padding: 1rem;
                    font-family: sans-serif;
                }
                .grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    justify-content: center;
                }
            </style>
        `;

        const plantList = plants.map(plant => `
            <plant-card
                image="${plant.image}"
                common="${plant.commonName}"
                scientific="${plant.scientificName}">
            </plant-card>
        `).join('');

        this.shadowRoot.innerHTML = `
            ${styles}
            <div class="grid">
                ${plantList}
            </div>
        `;
    }

    private handleChange = (estado: State): void => {
        this.render(estado);
    };

    connectedCallback(): void {
        this.attachShadow({ mode: 'open' });
        store.subscribe(this.handleChange);
        this.render();
    }
}

if (!customElements.get('home-page')) {
    customElements.define('home-page', HomePage);
}