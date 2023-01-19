import { Route } from '@vaadin/router';
import './views/main-layout';
import './views/masterdetailhilla/master-detail-hilla-view';

export type ViewRoute = Route & {
  title?: string;
  icon?: string;
  children?: ViewRoute[];
};

export const views: ViewRoute[] = [
  // place routes below (more info https://hilla.dev/docs/routing)
  {
    path: '',
    component: 'master-detail-hilla-view',
    icon: '',
    title: '',
  },
  {
    path: 'master-detail-hilla',
    component: 'master-detail-hilla-view',
    icon: 'la la-columns',
    title: 'Master Detail Hilla',
  },
  {
    path: 'crud-hilla',
    component: 'crud-hilla-view',
    icon: 'la la-edit',
    title: 'Crud Hilla',
    action: async (_context, _command) => {
      await import('./views/crudhilla/crud-hilla-view');
      return;
    },
  },
  {
    path: 'crud-hilla-binder',
    component: 'crud-hilla-binder-view',
    icon: 'la la-edit',
    title: 'Crud Hilla Binder',
    action: async (_context, _command) => {
      await import('./views/crudhillabinder/crud-hilla-binder-view');
      return;
    },
  },
];
export const routes: ViewRoute[] = [
  {
    path: '',
    component: 'main-layout',
    children: [...views],
  },
];
