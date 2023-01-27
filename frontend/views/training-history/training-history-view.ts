import '@vaadin/button';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { View } from '../view';

@customElement('training-history-view')
export class TrainingHistoryView extends View {

  render() {
    return html`
    <p> Training History page works! </p>
    <vaadin-button class="buttonSpacer" @click="${this.onClickBack}">Back</vaadin-button>
    `;
  }

  onClickBack(){
    window.location.href = "/";
  }
}