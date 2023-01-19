import { Binder, field } from '@hilla/form';
import { EndpointError } from '@hilla/frontend';
import '@vaadin/button';
import '@vaadin/date-picker';
import '@vaadin/date-time-picker';
import '@vaadin/form-layout';
import '@vaadin/grid';
import type { Grid, GridDataProviderCallback, GridDataProviderParams } from '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-sort-column';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import { Notification } from '@vaadin/notification';
import '@vaadin/polymer-legacy-adapter';
import '@vaadin/split-layout';
import '@vaadin/text-field';
import '@vaadin/upload';
import '@vaadin/vaadin-icons';
import Sort from 'Frontend/generated/dev/hilla/mappedtypes/Sort';
import Person from 'Frontend/generated/es/manolo/data/entity/Person';
import PersonModel from 'Frontend/generated/es/manolo/data/entity/PersonModel';
import Direction from 'Frontend/generated/org/springframework/data/domain/Sort/Direction';
import * as PersonEndpoint from 'Frontend/generated/PersonEndpoint';
import { html } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { View } from '../view';

@customElement('master-detail-hilla-view')
export class MasterDetailHillaView extends View {
  @query('#grid')
  private grid!: Grid;

  @state()
  private gridSize = 0;

  private gridDataProvider = this.getGridData.bind(this);

  private binder = new Binder<Person, PersonModel>(this, PersonModel, {onSubmit: PersonEndpoint.update});

  render() {
    return html`
      <vaadin-split-layout>
        <div class="grid-wrapper">
          <vaadin-grid
            id="grid"
            theme="no-border"
            .size=${this.gridSize}
            .dataProvider=${this.gridDataProvider}
            @active-item-changed=${this.itemSelected}
          >
            <vaadin-grid-sort-column path="firstName" auto-width></vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="lastName" auto-width></vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="email" auto-width></vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="phone" auto-width></vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="dateOfBirth" auto-width></vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="occupation" auto-width></vaadin-grid-sort-column>
          </vaadin-grid>
        </div>
        <div class="editor-layout">
          <div class="editor">
            <vaadin-form-layout
              ><vaadin-text-field
                label="First name"
                id="firstName"
                ${field(this.binder.model.firstName)}
              ></vaadin-text-field
              ><vaadin-text-field
                label="Last name"
                id="lastName"
                ${field(this.binder.model.lastName)}
              ></vaadin-text-field
              ><vaadin-text-field label="Email" id="email" ${field(this.binder.model.email)}></vaadin-text-field
              ><vaadin-text-field label="Phone" id="phone" ${field(this.binder.model.phone)}></vaadin-text-field
              ><vaadin-date-picker
                label="Date of birth"
                id="dateOfBirth"
                ${field(this.binder.model.dateOfBirth)}
              ></vaadin-date-picker
              ><vaadin-text-field
                label="Occupation"
                id="occupation"
                ${field(this.binder.model.occupation)}
              ></vaadin-text-field
            ></vaadin-form-layout>
          </div>
          <vaadin-horizontal-layout class="button-layout">
            <vaadin-button theme="primary" @click=${this.save}>Save</vaadin-button>
            <vaadin-button theme="tertiary" @click=${this.cancel}>Cancel</vaadin-button>
          </vaadin-horizontal-layout>
        </div>
      </vaadin-split-layout>
    `;
  }

  private async getGridData(
    params: GridDataProviderParams<Person>,
    callback: GridDataProviderCallback<Person | undefined>
  ) {
    const sort: Sort = {
      orders: params.sortOrders.map((order) => ({
        property: order.path,
        direction: order.direction == 'asc' ? Direction.ASC : Direction.DESC,
        ignoreCase: false,
      })),
    };
    const data = await PersonEndpoint.list({ pageNumber: params.page, pageSize: params.pageSize, sort });
    callback(data);
  }

  async connectedCallback() {
    super.connectedCallback();
    this.gridSize = (await PersonEndpoint.count()) ?? 0;
  }

  private async itemSelected(event: CustomEvent) {
    const item: Person = event.detail.value as Person;
    this.grid.selectedItems = item ? [item] : [];

    if (item) {
      const fromBackend = await PersonEndpoint.get(item.id!);
      fromBackend ? this.binder.read(fromBackend) : this.refreshGrid();
    } else {
      this.clearForm();
    }
  }

  private async save() {
    try {
      const isNew = !this.binder.value.id;
      await this.binder.submit();
      if (isNew) {
        // We added a new item
        this.gridSize++;
      }
      this.clearForm();
      this.refreshGrid();
      Notification.show(`Person details stored.`, { position: 'bottom-start' });
    } catch (error: any) {
      if (error instanceof EndpointError) {
        Notification.show(`Server error. ${error.message}`, { theme: 'error', position: 'bottom-start' });
      } else {
        throw error;
      }
    }
  }

  private cancel() {
    this.grid.activeItem = undefined;
  }

  private clearForm() {
    this.binder.clear();
  }

  private refreshGrid() {
    this.grid.selectedItems = [];
    this.grid.clearCache();
  }
}
