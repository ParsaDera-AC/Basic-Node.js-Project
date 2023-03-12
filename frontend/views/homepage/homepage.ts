import '@vaadin/button';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { View } from '../view';
const localUrl = window.location.hostname;
@customElement('homepage-view')
export class HomepageView extends View {

  render() {
    return html`
    <style>
    .button-container-div {
        text-align: center;
        height: 40vh;
        width: 100%;
        margin-top:100px;
        margin-left:auto;
        
    }
    .buttonSpacer{
      margin-left:25px;
    }
</style>
    <div class="button-container-div">
      <vaadin-button class="buttonSpacer" @click="${this.onClickEvents}">Events</vaadin-button>
      <vaadin-button class="buttonSpacer" @click="${this.onClickHrHistory}">Human Resources History</vaadin-button>
      <vaadin-button class="buttonSpacer" @click="${this.onClickTrainingHistory}">Training History</vaadin-button>
      <vaadin-button class="buttonSpacer" @click="${this.onClickFinacialReport}">Financial Report</vaadin-button>
    </div>
    `;
  }
  onClickEvents() {
    window.location.href = "/Events";

  }
  onClickHrHistory() {
    window.location.href = "/HrHistory";
  }

  onClickTrainingHistory() {
    window.location.href = "/TrainingHistory";
  }
  onClickFinacialReport() {
    window.location.href = "/FinancialReport";
  }

}
