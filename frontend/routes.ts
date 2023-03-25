import { Route } from '@vaadin/router';
import './views/list/list-view';
import './main-layout';

export type ViewRoute = Route & {
  title?: string;
  children?: ViewRoute[];
};

export const views: ViewRoute[] = [
  {
    path: '',
    component: 'list-view',
    title: 'Contacts',
  },
  {
    path: 'dashboard',
    component: 'dashboard-view',
    title: 'Dashboard',
    action: async () => {
      await import('./views/dashboard/dashboard-view');
    }
  }
];
export const routes: ViewRoute[] = [{path: '', component: 'main-layout', children: views}];
