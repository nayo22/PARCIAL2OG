import { store } from '../flux/Store';

class Root extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        store.load();
        this.render();
    }

    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <style>
                .layout {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 20px;
                    padding: 20px;
                    font-family: sans-serif;
                }
            </style>
            <div class="layout">
                <home-page></home-page>
                <!-- Puedes reemplazar los siguientes con tus otros componentes -->
                <modify-jardin></modify-jardin>
                <admin-panel></admin-panel>
            </div>
        `;
    }
}

if (!customElements.get('root-element')) {
    customElements.define('root-element', Root);
}

export default Root;