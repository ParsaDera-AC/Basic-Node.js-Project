import { CrmStore } from "./crm-store";
import { UiStore } from "./ui-store";
import { EventStore } from './event-store';
export class AppStore {
  crmStore = new CrmStore();
  uiStore = new UiStore();
  EventStore = new EventStore();
}

export const appStore = new AppStore();
export const crmStore = appStore.crmStore;
export const uiStore = appStore.uiStore;
export const eventStore = appStore.EventStore;