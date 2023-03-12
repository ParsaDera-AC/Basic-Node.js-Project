import '@vaadin/button';
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { View } from '../view';
import { HumanResourcesHistory } from '../../../src/main/models/HumanResourcesHistory'


@customElement('hr-history-view')
export class HrHistoryView extends View {

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('flex', 'p-m', 'gap-m', 'items-end');
    this.prepareData();
  }

  private history: HumanResourcesHistory [] = [
    { hireDate: this.formatDate(new Date("2003/01/02")), reason:"Maternity leave", leaveDate:this.formatDate(new Date("2018/01/25"))},
    { hireDate: this.formatDate(new Date("2019/04/01")), reason:"COVID-19", leaveDate:this.formatDate(new Date("2020/10/10"))}
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
        <vaadin-grid
        .items="${this.history}">
          <vaadin-grid-sort-column header="Hire Date" path="hireDate"></vaadin-grid-sort-column>
          <vaadin-grid-column header="Reason" path="reason" ></vaadin-grid-column>
          <vaadin-grid-sort-column header="Leave Date" path="leaveDate"></vaadin-grid-sort-column>
        </vaadin-grid>
        </span>
       
        <span class="spacing">
        <vaadin-button  @click="${this.onClickBack}">Back</vaadin-button>
        </vaadin-vertical-layout>
        </span>
    `;
  }

  formatDate(date: Date): string {
    return date.toISOString().substr(0, 10);
  }

  prepareData(){
    this.history.sort((a, b) => {
      const dateA = new Date(a.hireDate);
      const dateB = new Date(b.hireDate);
      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
      return 0;
    });

  }
  onClickBack(){
    window.location.href = "/";
  }
}