import Root from "./Root/Root";

import './components/HomePage';
import './components/PlantCard';

if (!customElements.get('root-element')) {
    customElements.define('root-element', Root);
}

document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('root-element')) {
        const root = document.createElement('root-element');
        document.body.appendChild(root);
    }
});