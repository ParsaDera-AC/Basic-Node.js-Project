import Event from "Frontend/generated/com/example/application/data/entity/Event";
import EventModel from "Frontend/generated/com/example/application/data/entity/EventModel";
import { eventStore } from "Frontend/stores/app-store";
import { makeAutoObservable, observable } from "mobx";

class EventCrudViewStore {
  filterText = "";
  selectedEvent: Event | null = null;

  constructor() {
    makeAutoObservable(this, { selectedEvent: observable.ref }, { autoBind: true });
  }

  updateFilter(filterText: string) {
    this.filterText = filterText;
  }

  get filteredEvents() {
    const filter = new RegExp(this.filterText, "i");
    const events = eventStore.events;
    return events.filter((event) => filter.test(`${event.eventName}`));
  }

  setSelectedEvent(event: Event) {
    this.selectedEvent = event;
  }

  editNew() {
    this.selectedEvent = EventModel.createEmptyValue();
  }

  cancelEdit() {
    this.selectedEvent = null;
  }

  async save(event: Event) {
    await eventStore.saveEvent(event);
    this.cancelEdit();
  }

  async delete() {
    if (this.selectedEvent) {
      await eventStore.deleteEvent(this.selectedEvent);
      this.cancelEdit();
    }
  }
}

export const eventCrudViewStore = new EventCrudViewStore();
