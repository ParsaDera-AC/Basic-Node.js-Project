import '@vaadin/button';
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { View } from '../view';
import { FinancialReport } from '../../../src/main/models/FinancialReport'
import '@vaadin/grid/vaadin-grid-selection-column.js';
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
import { GridActiveItemChangedEvent } from '@vaadin/vaadin-grid/vaadin-grid';

@customElement('financial-report-view')

export class FinancialReportView extends View {

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('flex', 'p-m', 'gap-m', 'items-end');
  }

  private reports: FinancialReport [] = [
    { title: "Tax slip", date: "2022-01-01", type: "T4" },
    { title: "Tax slip", date: "2021-01-01", type: "T4" },
    { title: "Q1 Report", date: "2023-01-01", type: "Quarterly Fiscal" }
  ];
  @state()
  private selectedItems: FinancialReport[] = [];
  private selected: boolean = false;

  render() {
    return html`
    <style>
    .table{
      width: 1000px;
      padding-left:480px;
      padding-bottom: 20px;
    }
    .button-spacing{
      padding-left:480px;
    }
    .spacing{
      padding-left: 850px;
    }
    </style>


    <vaadin-vertical-layout>
        <span class="table">
        <vaadin-grid
        .items="${this.reports}"
        .selectedItems="${this.selectedItems}"
        @active-item-changed="${(e: GridActiveItemChangedEvent<FinancialReport>) => {
          const item = e.detail.value;
          this.selectedItems = item ? [item] : [];
        }}"
      >
          <vaadin-grid-column header="Title" path="title"></vaadin-grid-column>
          <vaadin-grid-sort-column header="Date" path="date" ></vaadin-grid-sort-column>
          <vaadin-grid-column header="Type" path="type"></vaadin-grid-column>
        </vaadin-grid>
        </span>
       
        <vaadin-horizontal-layout>
        <span class="button-spacing">
        <vaadin-button @click="${this.onCLickView}">View</vaadin-button>
        <span class="spacing">
        <vaadin-button  @click="${this.onClickBack}">Back</vaadin-button>
        </span>
        </span>
        </vaadin-horizontal-layout>
        </vaadin-vertical-layout>
    `;
  }


  onCLickView(){
    //To do: Implement View dialog logic
  }


  onClickBack(){
    window.location.href = "/";
  }

  
}