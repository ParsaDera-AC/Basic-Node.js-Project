import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { View } from 'Frontend/views/view';
import '@vaadin/button';
import '@vaadin/combo-box';
import '@vaadin/text-field';
import { Binder, field } from '@hilla/form';
import EventModel from 'Frontend/generated/com/example/application/data/entity/EventModel';
import { crmStore } from 'Frontend/stores/app-store';
import { listViewStore } from './list-view-store';

@customElement('event-form')
export class EventForm extends View {
  protected binder = new Binder(this, EventModel)

  constructor() {
    super();
    this.autorun(() => {
      if(listViewStore.selectedEvent) {
        this.binder.read(listViewStore.selectedEvent);
      } else {
        this.binder.clear();
      }
    })
  }

  render() {
    const {model} = this.binder;


    return html`
      <vaadin-text-field label="Event name" ${field(model.eventName)}></vaadin-text-field>
      <vaadin-text-field label="Location" ${field(model.location)}></vaadin-text-field>
      <vaadin-text-field label="Time" ${field(model.time)}></vaadin-text-field>
      <vaadin-text-field label="Date" ${field(model.date)}></vaadin-text-field>

      <div class="flex gap-s">
        <vaadin-button theme="primary" @click=${this.save}>${this.binder.value.id ? 'Save' : 'Create'}</vaadin-button>
        <vaadin-button theme="error" @click=${listViewStore.delete}>Delete</vaadin-button>
        <vaadin-button theme="tertiary" @click=${listViewStore.cancelEdit}>Cancel</vaadin-button>
      </div>
    `
  }

  async save() {
    await this.binder.submitTo(listViewStore.save);
    this.binder.clear();
  }
}