import '@vaadin/button';
import '@vaadin/dialog';
import '@vaadin/text-field';
import '@vaadin/vertical-layout';
import '@vaadin/date-picker';
import '@vaadin/notification';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/email-field';
import '@vaadin/time-picker';
import '@vaadin/grid';
import '@vaadin/combo-box';
import '@vaadin/text-field';
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { View } from '../../views/view';
import '@vaadin/grid/vaadin-grid-selection-column.js';
import '@vaadin/confirm-dialog';
import '@vaadin/grid/vaadin-grid-sort-column.js';
import '@vaadin/text-area';
import { TrainingHistory } from '../../../src/main/models/TrainingHistory'



@customElement('training-history-view')
export class TrainingHistoryView extends View {

  @state()

  private items: TrainingHistory[] = [
    { registeredDate: this.formatDate(new Date("2019/01/16")), course: 'Ski Patrol Course 1',completedDate: this.formatDate(new Date("2019/10/30")) },
    { registeredDate: this.formatDate(new Date("2020/01/16")), course: 'Ski Patrol Course 2',completedDate: this.formatDate(new Date("2020/10/30")) },
  ];
  connectedCallback() {
    super.connectedCallback();
    this.classList.add('flex', 'p-m', 'gap-m', 'items-end');
    this.prepareData();
  }

  render() {
    return html`
    <style>
    .table{
      width: 1000px;
      padding-left:480px;
      padding-bottom: 20px;
    }
    .spacing{
      padding-left: 1410px;
    }
    </style>
    <vaadin-vertical-layout>
    <span class="table">
    <vaadin-grid .items="${this.items}">    
    <vaadin-grid-sort-column path="registeredDate" header="Registered Date"></vaadin-grid-sort-column>
    <vaadin-grid-column path="course" header="Course Name"></vaadin-grid-column>
    <vaadin-grid-sort-column path="completedDate" header="Completion Date"></vaadin-grid-sort-column>
    </vaadin-grid>
    </span>

    <span class="spacing">
    <vaadin-button @click="${this.onClickBack}">Back</vaadin-button>
    </span>
    </vaadin-vertical-layout>
      
    `;
  }
  formatDate(date: Date): string {
    return date.toISOString().substr(0, 10);
  }

  prepareData(){
    this.items.sort((a, b) => {
      const dateA = new Date(a.completedDate);
      const dateB = new Date(b.completedDate);
      if (dateA > dateB) {
        return -1;
      }
      if (dateA < dateB) {
        return 1;
      }
      return 0;
    });

  }

  onClickBack(){
    window.location.href = "/";
  }
}