import '@vaadin-component-factory/vcf-nav';
import '@vaadin/app-layout';
import { AppLayout } from '@vaadin/app-layout';
import '@vaadin/app-layout/vaadin-drawer-toggle';
import '@vaadin/avatar';
import '@vaadin/icon';
import '@vaadin/menu-bar';
import '@vaadin/scroller';
import '@vaadin/tabs';
import '@vaadin/tabs/vaadin-tab';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { router } from '../index';
import { views } from '../routes';
import { appStore } from '../stores/app-store';
import { Layout } from './view';
import { use } from 'lit-translate';
import { ComboBoxValueChangedEvent } from '@vaadin/vaadin-combo-box';

interface RouteInfo {
  path: string;
  title: string;
  icon: string;
}
@customElement('main-layout')
export class MainLayout extends Layout {
  render() {
    return html`
    <style>
    h1{
      text-align:center;
    }
    </style>
      <vaadin-app-layout primary-section="drawer">
        <h1>${appStore.currentViewTitle}</h1>
        <div style="margin-left: 85%;" slot="navbar"> <!-- Replace my-element with div -->
          <vaadin-combo-box
            label="Select language"
            .items="${[{ value: 'en', label: 'English' }, { value: 'fr', label: 'French' }]}"
            item-value-path="value"
            item-label-path="label"
            @value-changed="${this.onLanguageChanged}"
          ></vaadin-combo-box>
        </div>
        <slot></slot>
      </vaadin-app-layout>
    `;
  }

  onLanguageChanged(event: ComboBoxValueChangedEvent) {
    const language = event.detail.value;
    use(language);
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('block', 'h-full');
    this.reaction(
      () => appStore.location,
      () => {
        AppLayout.dispatchCloseOverlayDrawerEvent();
      }
    );
  }
}
