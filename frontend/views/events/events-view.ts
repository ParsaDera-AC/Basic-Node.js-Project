import '@vaadin/button';
import '@vaadin/dialog';
import '@vaadin/text-field';
import '@vaadin/vertical-layout';
import '@vaadin/date-picker';
import '@vaadin/notification';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/email-field';
import '@vaadin/time-picker';
import '@vaadin/grid';
import '@vaadin/combo-box';
//import { Notification } from '@vaadin/notification';
import '@vaadin/text-field';
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { View } from '../../views/view';
import { dialogFooterRenderer, dialogRenderer } from '@vaadin/dialog/lit.js';
import type { DialogOpenedChangedEvent } from '@vaadin/dialog';
import { addDays, formatISO } from 'date-fns';
import { Event } from '../../../src/main/models/Event'
import '@vaadin/grid/vaadin-grid-selection-column.js';

@customElement('hello-world-view')
export class HelloWorldView extends View {
  name = '';
  
  @state()
  private today = '';
  @state()
  private upperLimit = '';
  @state()
  private dialogOpened = false;
  @state()
  private eventOptions = ['Event type 1', 'Event type 2', 'Event type 3', 'Event type 4'];
  
  private items: Event[] = [
    { event: 'Patrol', location: 'Ottawa, ON', date: '2023-02-24', time: '16:00' },
    { event: 'Course', location: 'Gatineau, QB', date: '2023-03-04', time: '12:00' },
  ];
  private selected: boolean = false;








  async firstUpdated() {
    this.today = formatISO(Date.now(), { representation: 'date' });
    const upperLimit = addDays(Date.now(), 3650);
    this.upperLimit = formatISO(upperLimit, { representation: 'date' });
  }



  connectedCallback() {
    super.connectedCallback();
    this.classList.add('flex', 'p-m', 'gap-m', 'items-end');
  }



  render() {
    return html`
      <div id="user-info">
      
        Username: Dave01
        <br>
        Name: Dave Chappelle
      
        <vaadin-grid .items="${this.items}">
          <vaadin-grid-selection-column></vaadin-grid-selection-column>
          <vaadin-grid-column header="Event" path="event"></vaadin-grid-column>
          <vaadin-grid-column header="Location" path="location"></vaadin-grid-column>
          <vaadin-grid-column header="Date" path="date"></vaadin-grid-column>
          <vaadin-grid-column header="Time" path="time"></vaadin-grid-column>
        </vaadin-grid>
      
        <br>
        <vaadin-dialog header-title="New Event" .opened="${this.dialogOpened}" @opened-changed="${(e: DialogOpenedChangedEvent) => (this.dialogOpened = e.detail.value)}"
        ${dialogRenderer(this.renderDialog, [])}
        ${dialogFooterRenderer(this.renderFooter, [])}
      ></vaadin-dialog>
      
      <vaadin-button @click="${() => (this.dialogOpened = true)}">Create New Event</vaadin-button>
      <vaadin-button @click="${() => (this.dialogOpened = true)}">Edit Event</vaadin-button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>  

     
    `;
  }
  private renderDialog = () => html`
    <vaadin-vertical-layout style="align-items: stretch; width: 18rem; max-width: 100%;">
      <vaadin-text-field label="Event name"></vaadin-text-field>
      <vaadin-email-field
      label="Email address"
      name="email"
      value=""
      error-message="Enter a valid email address"
      clear-button-visible
      invalid
      ></vaadin-email-field>
      <vaadin-date-picker
        .min="${this.today}"
        .max="${this.upperLimit}"
        label="Appointment date"
        error-message="Format must be MM/DD/YYYY"
      ></vaadin-date-picker>
      <vaadin-time-picker label="Time" value="07:00"></vaadin-time-picker>
      <vaadin-text-field label="Location"></vaadin-text-field>
      <vaadin-combo-box
      label="Event type"
      item-label-path="name"
      item-value-path="id"
      .items="${this.eventOptions}"
      ></vaadin-combo-box>
    </vaadin-vertical-layout>
  `;

  private renderFooter = () => html`
  <vaadin-button theme="primary" @click="${this.close}">Submit</vaadin-button>
  <vaadin-button @click="${this.close}">Cancel</vaadin-button>
  
`;

private close() {
    this.dialogOpened = false;
  }

  nameChanged(e: CustomEvent) {
    this.name = e.detail.value;
  }

}
