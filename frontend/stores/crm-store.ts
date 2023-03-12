import { makeAutoObservable, observable, runInAction } from 'mobx';

import Event from 'Frontend/generated/com/example/application/data/entity/Event';
import EventManager from 'Frontend/generated/com/example/application/data/entity/EventManager';
import { CrmEndpoint } from 'Frontend/generated/endpoints';
import { uiStore } from './app-store';

export class CrmStore {
  events: Event[] = [];
  eventManagers : EventManager[] = [];

  constructor() {
    makeAutoObservable(
      this,
      {
        initFromServer: false,
        events: observable.shallow,
      },
      {autoBind: true}
    )

    this.initFromServer();
  }

  async initFromServer() {
    const data = await CrmEndpoint.getCrmData();

    runInAction(() => {
      this.events = data.events;
    })
  }

  async saveEvent(event:Event) {
    try {
      const saved = await CrmEndpoint.saveEvent(event);
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

  async deleteContact(event:Event) {
    if(!event.id) return;

    try {
      await CrmEndpoint.deleteContact(event.id);
      this.deleteLocal(event);
      uiStore.showSuccess('event deleted');
    } catch (e) {
      console.log(e);
      uiStore.showError('Failed to delete event')
    }
  }

  private saveLocal(saved:Event) {
    const contactExists = this.events.some((c) => c.id == saved.id);
    if (contactExists) {
      this.events = this.events.map((existing) => {
        if (existing.id === saved.id) {
          return saved
        } else {
          return existing
        }
      })
    } else {
      this.events.push(saved)
    }
  }

  private deleteLocal(event:Event) {
    this.events = this.events.filter((c) => c.id !== event.id)
  }
}

