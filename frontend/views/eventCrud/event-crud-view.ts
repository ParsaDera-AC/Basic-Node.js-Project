import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { View } from "../view";
import '@vaadin/charts';
import '@vaadin/charts/src/vaadin-chart-series';


@customElement('event-crud-view')
export class EventView extends View {
    connectedCallback(): void {
        super.connectedCallback();
        this.classList.add('flex', 'flex-col', 'items-center', 'pt-xl');
    }

    render() {
        return html`Heloooo`
}

}