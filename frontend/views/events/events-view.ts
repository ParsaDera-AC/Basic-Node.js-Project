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
import '@vaadin/text-field';
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { View } from '../../views/view';
import { dialogFooterRenderer, dialogRenderer } from '@vaadin/dialog/lit.js';
import type { DialogOpenedChangedEvent } from '@vaadin/dialog';
import { addDays, formatISO } from 'date-fns';
import { Event } from '../../../src/main/models/Event'
import '@vaadin/grid/vaadin-grid-selection-column.js';
import '@vaadin/confirm-dialog';
import type { ConfirmDialogOpenedChangedEvent } from '@vaadin/confirm-dialog';
import { GridActiveItemChangedEvent } from '@vaadin/vaadin-grid/vaadin-grid';

@customElement('events-view')
export class EventsView extends View {
  name = '';
  @state()
  private confirmDialogOpened = false;
  @state()
  private status = '';
  @state()
  private today = '';
  @state()
  private upperLimit = '';
  @state()
  private dialogOpened = false;
  @state()
  private eventOptions = ['Patrol', 'Training', 'Workshop'];
  @state()
  private selectedItems: Event[] = [];
  @state()
  private isRowSelected = false;

  private items: Event[] = [
    { event: 'Patrol', location: 'Ottawa, ON', date: '2023-02-24', time: '16:00' },
    { event: 'Course', location: 'Gatineau, QB', date: '2023-03-04', time: '12:00' },
  ];


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
    <style>
    .table{
      width: 1000px;
      padding-left:480px;
      padding-bottom: 20px;
    }
    .button-spacing{
      padding-left:480px;
    }
    .spacing{
      padding-left: 545px;
    }
    </style>


  <vaadin-vertical-layout>
    <span class="table">
        <vaadin-grid
        .items="${this.items}"
        .selectedItems="${this.selectedItems}"
        @active-item-changed="${(e: GridActiveItemChangedEvent<Event>) => {
        const item = e.detail.value;
        this.selectedItems = item ? [item] : [];
        this.isRowSelected = Boolean(item);
      }}"
      >
          <vaadin-grid-sort-column header="Event" path="event"></vaadin-grid-sort-column>
          <vaadin-grid-column header="Location" path="location"></vaadin-grid-column>
          <vaadin-grid-sort-column header="Date" path="date"></vaadin-grid-sort-column>
          <vaadin-grid-column header="Time" path="time"></vaadin-grid-column>
        </vaadin-grid>
    </span>

        <vaadin-dialog header-title="New Event" .opened="${this.dialogOpened}" @opened-changed="${(e: DialogOpenedChangedEvent) => (this.dialogOpened = e.detail.value)}"
        ${dialogRenderer(this.renderDialog, [])}
        ${dialogFooterRenderer(this.renderFooter, [])}
      ></vaadin-dialog>

      <vaadin-confirm-dialog
          header="Delete Event"
          cancel
          @cancel="${() => (this.status = 'Canceled')}"
          reject
          reject-text="Discard"
          @reject="${() => (this.status = 'Discarded')}"
          confirm-text="Delete"
          @confirm="${() => (this.status = 'Saved')}"
          .opened="${this.confirmDialogOpened}"
          @opened-changed="${this.openedChanged}"
        >
          Are you sure you want to delete this event?
        </vaadin-confirm-dialog>


    <vaadin-horizontal-layout>
    <span class="button-spacing">
      <vaadin-button @click="${() => (this.dialogOpened = true)}">Create New Event</vaadin-button>
      <vaadin-button id="editEventBtn" @click="${this.editButton}">Edit Event</vaadin-button>
      <vaadin-button @click="${() => (this.confirmDialogOpened = true)}">Delete Event</vaadin-button>

    </span>
      
      <span class="spacing">
      <vaadin-button class="buttonSpacer" @click="${this.onClickBack}">Back</vaadin-button>
      </span>
    </vaadin-horizontal-layout>
    </vaadin-vertical-layout>
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

  openedChanged(e: ConfirmDialogOpenedChangedEvent) {
    this.confirmDialogOpened = e.detail.value;
    if (this.confirmDialogOpened) {
      this.status = '';
    }
  }

  private close() {
    this.dialogOpened = false;
  }

  editButton(){
    const button = document.getElementById("editEventBtn") as HTMLButtonElement;

    if(this.selectedItems.length == 0){
      this.isRowSelected = true;
      this.dialogOpened = true;
    
    }else{
      this.isRowSelected = false;
      button.disabled;
    }
  }

  onClickBack() {
    window.location.href = "/";
  }

}

