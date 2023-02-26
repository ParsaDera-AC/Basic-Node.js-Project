import { crmStore } from "Frontend/stores/app-store";
import { makeAutoObservable } from "mobx";


class DashboardViewStore {
  constructor() {
    makeAutoObservable(this);
  }

  get eventCount() {
    return crmStore.events.length;
  }

  get companyStats() {
    const countByCompany = crmStore.events.reduce((map, event) => {
      const name = event.eventName || "Unknown";
      return map.set(name, (map.get(name) || 0) + 1)
    }, new Map<string, number>())

    return Array.from(countByCompany.entries()).map(([company, employees]) => ({
      name: company,
      y: employees
    }))
  }
}

export const dashboardViewStore = new DashboardViewStore();