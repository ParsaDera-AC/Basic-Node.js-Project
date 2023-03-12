import { crmStore } from "Frontend/stores/app-store";
import { makeAutoObservable } from "mobx";


class DashboardViewStore {
  constructor() {
    makeAutoObservable(this);
  }

  get eventCount() {
    return crmStore.events.length;
  }

}

export const dashboardViewStore = new DashboardViewStore();