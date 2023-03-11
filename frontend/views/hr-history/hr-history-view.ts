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
  }

  private history: HumanResourcesHistory [] = [
    { hireDate: "2003-01-02", reason:"Maternity leave", leaveDate:"2018-01-25"},
    { hireDate: "2019-04-01", reason:"COVID-19", leaveDate:"2020-10-10"}
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


  onClickBack(){
    window.location.href = "/";
  }
}