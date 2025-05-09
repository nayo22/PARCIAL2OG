class PlantCard extends HTMLElement {
    static get observedAttributes() {
        return ['image', 'common', 'scientific'];
    }

    private image = '';
    private common = '';
    private scientific = '';

    attributeChangedCallback(name: string, _: string, newValue: string) {
        if (name === 'image') this.image = newValue;
        if (name === 'common') this.common = newValue;
        if (name === 'scientific') this.scientific = newValue;
        this.render();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    private render() {
        if (!this.shadowRoot) return;

        const styles = `
            <style>
                .card {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    overflow: hidden;
                    width: 200px;
                    font-family: sans-serif;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    background: white;
                }
                img {
                    width: 100%;
                    height: 150px;
                    object-fit: cover;
                }
                .info {
                    padding: 10px;
                }
                .common {
                    font-weight: bold;
                    font-size: 1.1em;
                    color: #333;
                }
                .scientific {
                    font-style: italic;
                    font-size: 0.95em;
                    color: #666;
                }
            </style>
        `;

        this.shadowRoot.innerHTML = `
            ${styles}
            <div class="card">
                <img src="${this.image}" alt="${this.common}" />
                <div class="info">
                    <div class="common">${this.common}</div>
                    <div class="scientific">${this.scientific}</div>
                </div>
            </div>
        `;
    }
}

if (!customElements.get('plant-card')) {
    customElements.define('plant-card', PlantCard);
}

export default PlantCard;