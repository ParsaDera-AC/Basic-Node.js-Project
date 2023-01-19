import '@vaadin/button';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { View } from '../view';

@customElement('hr-history-view')
export class HrHistoryView extends View {

  render() {
    return html`
    <p> HR History page works! </p>
    <vaadin-button class="buttonSpacer" @click="${this.onClickBack}">Back</vaadin-button>
    `;
  }

  onClickBack(){
    window.location.href = "/";
  }
}