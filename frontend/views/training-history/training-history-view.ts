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

  private gridItems: TrainingHistory[] = [
    { registeredDate: "2019-01-16", course: 'Ski Patrol Course 1',completedDate: "2019-10-30" },
    { registeredDate: "2020-01-16", course: 'Ski Patrol Course 2',completedDate: "2020-10-30" },
  ];
 

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
    <vaadin-grid .items="${this.gridItems}">    
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

  onClickBack(){
    window.location.href = "/";
  }
}