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
import '@vaadin/notification';
import { Notification } from '@vaadin/notification';
import * as EventsEndpoint from 'Frontend/generated/EventsEndpoint';

@customElement('events-view')
export class EventsView extends View {
 @state()
 private isModify = false;
 @state()
 private isDeleting = false;
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

  private isRowSelected = false;
  private titleHeader = "";
  private items: Event[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('flex', 'p-m', 'gap-m', 'items-end');
    this.prepareData();

  }

  async firstUpdated() {
    this.today = formatISO(Date.now(), { representation: 'date' });
    const upperLimit = addDays(Date.now(), 3650);
    this.upperLimit = formatISO(upperLimit, { representation: 'date' });
  }

  async retrieveAllEvents() {
    const serverResponse = await EventsEndpoint.retrieveAllEvents();
    this.items = serverResponse as Event[];
    console.log(serverResponse);
    //This just triggers the table inputs
    this.close();
  }
  
  async addEvent() {
    const event = this.populateEvent();
    EventsEndpoint.addEvents(event);
    
  }
  async editEvent() {
    const event = this.populateEvent();
    EventsEndpoint.editEvents(event);

  }
  async deleteEvent() {
    const id = this.selectedItems[0].id
    EventsEndpoint.deleteEvent(id);
    
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
        <vaadin-grid-sort-column header="Event Name" path="name"></vaadin-grid-sort-column>
          <vaadin-grid-sort-column header="Event Type" path="event"></vaadin-grid-sort-column>
          <vaadin-grid-column header="Location" path="location"></vaadin-grid-column>
          <vaadin-grid-sort-column header="Date" path="date"></vaadin-grid-sort-column>
          <vaadin-grid-column header="Time" path="time"></vaadin-grid-column>
        </vaadin-grid>
    </span>

        <vaadin-dialog header-title="${this.titleHeader}" .opened="${this.dialogOpened}" @opened-changed="${(e: DialogOpenedChangedEvent) => (this.dialogOpened = e.detail.value)}"
        ${dialogRenderer(this.renderDialog, [])}
        ${dialogFooterRenderer(this.renderFooter, [])}
      ></vaadin-dialog>

     
      <vaadin-confirm-dialog
      header="Delete Event"
      cancel
      @cancel="${() => (this.status = 'Canceled')}"
      confirm-text="Delete"
      @confirm="${this.onClickDelete}"
      .opened="${this.confirmDialogOpened}"
      @opened-changed="${this.openedChanged}">
      Are you sure you want to delete this event?
      </vaadin-confirm-dialog>

    <vaadin-horizontal-layout>
    <span class="button-spacing">
      <vaadin-button id="newEventBtn" @click="${this.newButton}">Create New Event</vaadin-button>
      <vaadin-button id="editEventBtn" @click="${this.editButton}">Edit Event</vaadin-button>
      <vaadin-button id="deleteEventBtn" @click="${this.deleteButton}">Delete Event</vaadin-button>

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
      <vaadin-text-field id = "eventName" label="Event name" value="${this.selectedItems.length > 0 ? this.selectedItems[0].name : ''}"></vaadin-text-field>
      <vaadin-email-field id = "email"
      label="Email address"
      name="email"
      value="${this.selectedItems.length > 0 ? this.selectedItems[0].email : ''}"
      error-message="Enter a valid email address"
      clear-button-visible
      invalid
     ></vaadin-email-field>
      <vaadin-date-picker id = "date" .value="${this.selectedItems.length > 0 ? this.selectedItems[0].date  : ''}" .valueMapper="${(value: string | null) => {
        return value ? new Date(value).toISOString().substr(0, 10) : null;
      }}" 
        .min="${this.today}"
        .max="${this.upperLimit}"
        label="Appointment date"
        error-message="Format is Month/Day/Year"
      ></vaadin-date-picker>
      <vaadin-time-picker id = "time" label="Time" value="${this.selectedItems.length > 0 ? this.selectedItems[0].time : ''}"></vaadin-time-picker>
      <vaadin-text-field id="location" label="Location" value="${this.selectedItems.length > 0 ? this.selectedItems[0].location: ''}"></vaadin-text-field>
      <vaadin-combo-box
      id = "eventType" label="Event type"
      item-label-path="name"
      item-value-path="id"
      .items="${this.eventOptions}"
      value="${this.selectedItems.length > 0 ? this.selectedItems[0].event : ''}"></vaadin-combo-box>
    </vaadin-vertical-layout>
    
  `;

  private renderFooter = () => html`
  <vaadin-button theme="primary" @click="${this.onClickSubmit}">Submit</vaadin-button>
  <vaadin-button @click="${this.close}">Cancel</vaadin-button>
  
`;
  populateEvent(){
    var eventName = document.getElementById("eventName") as HTMLFormElement;
    var email = document.getElementById("email") as HTMLFormElement;
    var location = document.getElementById("location") as HTMLFormElement;
    var date = document.getElementById("date") as HTMLFormElement;
    var time = document.getElementById("time") as HTMLFormElement;
    var eventType = document.getElementById("eventType") as HTMLFormElement;
  
    const event = {
      
      name: eventName.value,
      event: eventType.value,
      location: location.value,
      date: date.value,
      time: time.value,
      email: email.value,

    }
    return event as Event;

  }
    
  
  openedChanged(e: ConfirmDialogOpenedChangedEvent) {
    this.confirmDialogOpened = e.detail.value;
    if (this.confirmDialogOpened) {
      this.status = '';
    }else{
      this.selectedItems = [];
    }
  }

  onClickSubmit(){
    if(this.isModify == true){
      this.addEvent();
    }else if(this.isModify == false){
      this.editEvent();
    }
    this.close();
    this.refresh();
  }

  onClickDelete(){
    this.deleteEvent();
    this.close();
    this.refresh();
  }
  private close() {
    this.dialogOpened = false;
    this.selectedItems = [];
  }

  newButton(){
    const button = document.getElementById("newEventBtn") as HTMLButtonElement;
    if(this.selectedItems.length == 0){
      this.dialogOpened = true;
      this.titleHeader ="New Event";
      this.isModify = true;
      
    }else{

      button.disabled;
      Notification.show("Deselect a entry from the table before creating a new event.", {position:"top-center", duration:3000, theme:"error"});
      
    }

  }

  editButton(){
    const button = document.getElementById("editEventBtn") as HTMLButtonElement;

    if(this.selectedItems.length == 0){
      this.isRowSelected = false;
      button.disabled;
      Notification.show("Select a entry from the table before editing your event.", {position:"top-center", duration:3000, theme:"error"});
      this.isModify = false;
    
    }else{
      this.isRowSelected = true;
      this.dialogOpened = true;
      this.titleHeader ="Edit Event";
      this.isModify = true;
    }

  }

  deleteButton(){
    const button = document.getElementById("deleteEventBtn") as HTMLButtonElement;

    if(this.selectedItems.length == 0){
      this.isRowSelected = false;
      button.disabled;
      Notification.show("Select a entry from the table before deleting your event.", {position:"top-center", duration:3000, theme:"error"});
      
    
    }else{
      this.isRowSelected = true;
      this.confirmDialogOpened = true
      
    }

  }

  formatDate(date: Date): string {
    return date.toISOString().substr(0, 10);
  }

  prepareData(){
  this.retrieveAllEvents();
    this.items.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
      return 0;
    });

  }


  onClickBack() {
    window.location.href = "/";
  }

  refresh(){
    window.location.reload();
  }

}

