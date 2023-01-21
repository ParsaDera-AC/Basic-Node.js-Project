
import { View } from '../../views/view';
import '@vaadin/button';
import '@vaadin/dialog';
import '@vaadin/text-field';
import '@vaadin/vertical-layout';
import '@vaadin/date-picker';
import '@vaadin/notification';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/email-field';
import '@vaadin/time-picker';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/combo-box';
import '@vaadin/text-field';
import { dialogFooterRenderer, dialogRenderer } from '@vaadin/dialog/lit.js';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/confirm-dialog';
import '@vaadin/horizontal-layout';
import type { ConfirmDialogOpenedChangedEvent } from '@vaadin/confirm-dialog';
import { html, css, LitElement } from 'lit';
@customElement('about-view')
export class AboutView extends View {

  name = '';
  @state()
  private dialogOpened = true;

  @state()
  private status = '';

  render() {
    return html`
      <vaadin-horizontal-layout
        style="align-items: center; justify-content: center;"
        theme="spacing"
      >
        <vaadin-button @click="${() => (this.dialogOpened = true)}">
          Open confirm dialog
        </vaadin-button>

        <vaadin-confirm-dialog
          header="Delete Event"
          cancel
          @cancel="${() => (this.status = 'Canceled')}"
          reject
          reject-text="Discard"
          @reject="${() => (this.status = 'Discarded')}"
          confirm-text="Delete"
          @confirm="${() => (this.status = 'Saved')}"
          .opened="${this.dialogOpened}"
          @opened-changed="${this.openedChanged}"
        >
          Are you sure you want to delete this event?
        </vaadin-confirm-dialog>

        <span ?hidden="${this.status === ''}">Status: ${this.status}</span>
      </vaadin-horizontal-layout>
    `;
  }

  openedChanged(e: ConfirmDialogOpenedChangedEvent) {
    this.dialogOpened = e.detail.value;
    if (this.dialogOpened) {
      this.status = '';
    }
  }

  static styles = css`
    /* Center the button within the example */
    :host {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex !important;
      align-items: center;
      justify-content: center;
    }
  `;
}