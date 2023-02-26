import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { View } from '../../views/view';
import '@vaadin/button';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-column';
import '@vaadin/text-field';

import './event-form';
import { crmStore } from 'Frontend/stores/app-store';
import { listViewStore } from './list-view-store';
import '@vaadin/notification';
import { uiStore } from 'Frontend/stores/app-store';

@customElement('list-view')
export class ListView extends View {
  render() {
    return html`
      <div class="toolbar flex gap-s">
        <vaadin-text-field
          placeholder="Filter by name"
          .value=${listViewStore.filterText}
          @input=${this.updateFilter}
          clear-button-visible
        ></vaadin-text-field>
        <vaadin-button @click=${listViewStore.editNew}>Add Event</vaadin-button>
      </div>
      <div class="content flex gap-m h-full">
        <vaadin-grid
          class="grid h-full"ublyou
          .items=${listViewStore.filteredEvents}
          .selectedItems=${[listViewStore.selectedEvent]}
          @active-item-changed=${this.handleGridSelection}
        >
          <vaadin-grid-column path="eventName" auto-width></vaadin-grid-column>
          <vaadin-grid-column path="location" auto-width></vaadin-grid-column>
          <vaadin-grid-column path="time" auto-width></vaadin-grid-column>
          <vaadin-grid-column path="date" auto-width></vaadin-grid-column>
        </vaadin-grid>
        <contact-form class="flex flex-col gap-s" ?hidden=${!listViewStore.selectedEvent}></contact-form>
      </div>
      <vaadin-notification
        theme=${uiStore.message.error ? 'error' : 'contrast'}
        position="bottom-start"
        .opened=${uiStore.message.open}
        .renderer=${(root: HTMLElement) => (root.textContent = uiStore.message.text)}
      >
      </vaadin-notification>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('box-border', 'flex', 'flex-col', 'p-m', 'gap-s', 'w-full', 'h-full');
    this.autorun(() => {
      if (listViewStore.selectedEvent) {
        this.classList.add('editing');
      } else {
        this.classList.remove('editing');
      }
    });
  }

  updateFilter(e: { target: HTMLInputElement }) {
    listViewStore.updateFilter(e.target.value);
  }

  firstSelectionEvent = true;
  handleGridSelection(e: CustomEvent) {
    if (this.firstSelectionEvent) {
      this.firstSelectionEvent = false;
      return;
    }
    listViewStore.setSelectedContact(e.detail.value);
  }
}
