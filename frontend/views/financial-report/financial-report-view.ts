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
import { ConfirmDialogOpenedChangedEvent } from '@vaadin/confirm-dialog';
import { dialogFooterRenderer, dialogRenderer } from '@vaadin/dialog/lit';
import { DialogOpenedChangedEvent } from '@vaadin/dialog';
import * as FinancialReportEndpoint from 'Frontend/generated/FinancialReportEndpoint';
import { EndpointValidationError } from '@hilla/frontend';
import { translate } from 'lit-translate';
@customElement('financial-report-view')

export class FinancialReportView extends View {
  @state()
  private confirmDialogOpened = false;
  @state()
  private dialogOpened = false;

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('flex', 'p-m', 'gap-m', 'items-end');
    this.prepareData();
  }

  private reports: FinancialReport [] = [];
  @state()
  private selectedItems: FinancialReport[] = [];
  private selected: boolean = false;

  async retrieveAllReports() {
    
    try {
    const serverResponse = await FinancialReportEndpoint.retrieveAllReports();
    this.reports = serverResponse as FinancialReport[];
    //This just triggers the table inputs
    this.close();
    } catch (error) {
      if (error instanceof EndpointValidationError) {
        (error as EndpointValidationError).validationErrorData.forEach(
          ({ message }) => {
            console.warn(message);
          }
        );
      }
    }
  
  }
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
          <vaadin-grid-column header="${translate('Title')}" path="title"></vaadin-grid-column>
          <vaadin-grid-sort-column header="${translate('Date')}" path="date" ></vaadin-grid-sort-column>
          <vaadin-grid-column header="${translate('Type')}" path="type"></vaadin-grid-column>
        </vaadin-grid>
        </span>

        <vaadin-dialog header-title="View Report" .opened="${this.dialogOpened}" @opened-changed="${(e: DialogOpenedChangedEvent) => (this.dialogOpened = e.detail.value)}"
        ${dialogRenderer(this.renderDialog, [])}
        ${dialogFooterRenderer(this.renderFooter, [])}

      ></vaadin-dialog>
        <vaadin-horizontal-layout>
        <span class="button-spacing">
        <vaadin-button @click="${this.viewButton}">${translate('View')}</vaadin-button>
        <span class="spacing">
        <vaadin-button  @click="${this.onClickBack}">Back</vaadin-button>
        </span>
        </span>
        </vaadin-horizontal-layout>
        </vaadin-vertical-layout>
    `;
  }


  openedChanged(e: ConfirmDialogOpenedChangedEvent) {
    this.confirmDialogOpened = e.detail.value;

  }
  private close() {
    this.dialogOpened = false;
    this.selectedItems = [];
  }

  private renderDialog = () => html`
  <vaadin-vertical-layout style="align-items: stretch; width: 18rem; max-width: 100%;">
    <vaadin-text-field readonly label="${translate('Income')}" value = "${this.reports[0].income}"></vaadin-text-field>
    <vaadin-text-field readonly label="${translate('TotalSpent')}" value = "${this.reports[0].totalSpent}"></vaadin-text-field>
    <vaadin-text-field readonly label="${translate('NetTotal')}" value = "${this.reports[0].netTotal}"></vaadin-text-field>
  </vaadin-vertical-layout>
  
`;

private renderFooter = () => html`
<vaadin-button theme="primary" @click="${this.close}">Submit</vaadin-button>
<vaadin-button @click="${this.close}">Cancel</vaadin-button>

`;
  formatDate(date: Date): string {
    return date.toISOString().substr(0, 10);
  }

  prepareData(){
    this.retrieveAllReports();
    this.reports.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA > dateB) {
        return -1;
      }
      if (dateA < dateB) {
        return 1;
      }
      return 0;
    });

  }
  
  viewButton(){
 
    this.dialogOpened = true;

  }

  onClickBack(){
    window.location.href = "/";
  }

  
}