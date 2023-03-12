import type { Route } from '@vaadin/router';
import './views/homepage/homepage';
import './views/events/events-view';
import './views/financial-report/financial-report-view';
import './views/hr-history/hr-history-view';
import './views/training-history/training-history-view';
import './views/main-layout';

export type ViewRoute = Route & {
  title?: string;
  icon?: string;
  children?: ViewRoute[];
};

export const views: ViewRoute[] = [
  // place routes below (more info https://hilla.dev/docs/routing)
  {
    path: '',
    component: 'homepage-view',
    title: "User's Homepage",
  },
  {
    path: 'Events',
    component: 'events-view',
    title: 'Events',
  },
  {
    path: 'TrainingHistory',
    component: 'training-history-view',
    title: 'Training History',
  },
  {
    path: 'HrHistory',
    component: 'hr-history-view',
    title: 'Human Resources History',
  },
  {
    path: 'FinancialReport',
    component: 'financial-report-view',
    title: 'Financial Report',
  },
];
export const routes: ViewRoute[] = [
  {
    path: '',
    component: 'main-layout',
    children: views,
  },
];
