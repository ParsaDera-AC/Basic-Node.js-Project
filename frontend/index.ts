import { Router } from '@vaadin/router';
import { routes } from './routes';
import { appStore } from './stores/app-store';
import { registerTranslateConfig } from 'lit-translate';
import { use } from 'lit-translate';

export const router = new Router(document.querySelector('#outlet'));

router.setRoutes(routes);

window.addEventListener('vaadin-router-location-changed', (e) => {
  appStore.setLocation((e as CustomEvent).detail.location);
  const title = appStore.currentViewTitle;
  if (title) {
    document.title = title
  } else {
    document.title = appStore.applicationName;
  }
});

registerTranslateConfig({
  loader: (lang) => import(`./i18n/${lang}.json`).then((mod) => mod.default),
});

use('en');