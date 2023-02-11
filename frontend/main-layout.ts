import { html } from "lit";
import { customElement } from "lit/decorators.js";
import '@vaadin/app-layout';
import '@vaadin/app-layout/vaadin-drawer-toggle';
import { Layout } from "./views/view";
import { views } from "./routes";

@customElement('main-layout')
export class MainLayout extends Layout {
  connectedCallback(): void {
      super.connectedCallback();
      this.classList.add('flex', 'h-full', 'w-full')
  }

  render() {
    return html`
      <vaadin-app-layout class="h-full w-full">
        <header slot="navbar" class="w-full flex items-center px-m">
          <vaadin-drawer-toggle></vaadin-drawer-toggle>
          <h1 class="text-l m-m">Hilla CRM</h1>
        </header>

        <div slot="drawer">
          <div class="flex flex-col h-full m-l spacing-b-s">
            ${views.map((view) => html`<a href=${view.path}>${view.title}</a>`)}
          </div>
        </div>

        <div class="h-full">
          <slot></slot>
        </div>
      </vaadin-app-layout>
    `
  }
}