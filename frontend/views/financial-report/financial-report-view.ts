import '@vaadin/button';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { View } from '../view';

@customElement('financial-report-view')
export class FinancialReportView extends View {

  render() {
    return html`
    <p> Financial report page works! </p>
    <vaadin-button class="buttonSpacer" @click="${this.onClickBack}">Back</vaadin-button>
    `;
  }

  onClickBack(){
    window.location.href = "/";
  }
}