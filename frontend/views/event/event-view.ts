import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { View } from "../view";
import '@vaadin/charts';
import '@vaadin/charts/src/vaadin-chart-series';
import { eventCrmStore } from "./event-view-store";

@customElement('event-view')
export class EventView extends View {
    connectedCallback(): void {
        super.connectedCallback();
        this.classList.add('flex', 'flex-col', 'items-center', 'pt-xl');
    }

    render() {
        return html``
}

}
