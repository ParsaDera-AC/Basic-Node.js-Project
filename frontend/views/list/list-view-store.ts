import Event from "Frontend/entity/Event";
import EventModel from "Frontend/entity/EventModel";
import { crmStore } from "Frontend/stores/app-store";
import { makeAutoObservable, observable } from "mobx";

class ListViewStore {
  filterText = '';
  selectedEvent: Event | null = null;

  constructor() {
    makeAutoObservable(this, {selectedEvent: observable.ref}, {autoBind: true});
  }

  updateFilter(filterText: string) {
    this.filterText = filterText;
  }

  get filteredEvents() {
    const filter = new RegExp(this.filterText, 'i');
    const events = crmStore.events;
    return events.filter((event) => filter.test(`${event.eventName}`))
  }

  setSelectedContact(event: Event) {
    this.selectedEvent = event;
  }

  editNew() {
    this.selectedEvent = EventModel.createEmptyValue();
  }

  cancelEdit() {
    this.selectedEvent = null;
  }

  async save(event:Event) {
    await crmStore.saveEvent(event);
    this.cancelEdit();
  }

  async delete() {
    if (this.selectedEvent) {
      await crmStore.deleteContact(this.selectedEvent);
      this.cancelEdit();
    }
  }
}

export const listViewStore = new ListViewStore();