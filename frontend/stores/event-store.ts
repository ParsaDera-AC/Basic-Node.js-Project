import { makeAutoObservable, observable, runInAction } from 'mobx';

import Event from 'Frontend/generated/com/example/application/data/entity/Event';
import EventManager from 'Frontend/generated/com/example/application/data/entity/EventManager';
import { EventCrudEndpoint } from 'Frontend/generated/endpoints';
import { uiStore } from './app-store';

export class EventStore {
  events: Event[] = [];
  eventManagers: EventManager[] = [];

  constructor() {
    makeAutoObservable(
      this,
      {
        initFromServer: false,
        events: observable.shallow,
        eventManagers: observable.shallow
      },
      { autoBind: true }
    );

    this.initFromServer();
  }

  async initFromServer() {
    const data = await EventCrudEndpoint.getEventData();

    runInAction(() => {
      this.events = data.events;
      this.eventManagers = data.eventManagers;
    });
  }

  async saveEvent(event: Event) {
    try {
      const saved = await EventCrudEndpoint.saveEvent(event);
      if (saved) {
        this.saveLocal(saved);
        uiStore.showSuccess('Event saved');
      } else {
        uiStore.showError('Event save failed');
      }
    } catch (e) {
      console.log(e);
      uiStore.showError('Event save failed');
    }
  }

  async deleteEvent(event: Event) {
    if (!event.id) return;

    try {
      await EventCrudEndpoint.deleteEvent(event.id);
      this.deleteLocal(event);
      uiStore.showSuccess('Event deleted');
    } catch (e) {
      console.log(e);
      uiStore.showError('Failed to delete event');
    }
  }

  private saveLocal(saved: Event) {
    const eventExists = this.events.some((e) => e.id === saved.id);
    if (eventExists) {
      this.events = this.events.map((existing) => {
        if (existing.id === saved.id) {
          return saved;
        } else {
          return existing;
        }
      });
    } else {
      this.events.push(saved);
    }
  }

  private deleteLocal(event: Event) {
    this.events = this.events.filter((e) => e.id !== event.id);
  }
}
