import { ValidationError } from '@hilla/form';
import { EndpointError } from '@hilla/frontend';
import '@polymer/iron-icon';
import '@vaadin/button';
import '@vaadin/checkbox';
import 'patched-crud/crud';
import type { Crud, CrudDataProviderCallback, CrudDataProviderParams, CrudDeleteEvent, CrudSaveEvent } from 'patched-crud/crud';
import '@vaadin/date-picker';
import '@vaadin/date-time-picker';
import '@vaadin/form-layout';
import { Notification } from '@vaadin/notification';
import '@vaadin/polymer-legacy-adapter';
import '@vaadin/text-field';
import '@vaadin/upload';
import '@vaadin/vaadin-icons';
import Sort from 'Frontend/generated/dev/hilla/mappedtypes/Sort';
import Person from 'Frontend/generated/es/manolo/data/entity/Person';
import Direction from 'Frontend/generated/org/springframework/data/domain/Sort/Direction';
import * as PersonEndpoint from 'Frontend/generated/PersonEndpoint';
import { html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { View } from '../view';

@customElement('crud-hilla-view')
export class CrudHillaView extends View {
  private dataProvider = this.getData.bind(this);
  @query("#crud")
  private crud!: Crud<Person>;

  render() {
    return html`
      <vaadin-crud
        class="w-full h-full"
        id="crud"
        exclude="Id"
        no-filter
        .dataProvider=${this.dataProvider}
        @save=${this.save}
        @delete=${this.delete}
        @edited-item-changed=${this.requestUpdate}
      >
        <vaadin-form-layout slot="form"
          ><vaadin-text-field label="First name" id="firstName" path="firstName"></vaadin-text-field
          ><vaadin-text-field label="Last name" id="lastName" path="lastName"></vaadin-text-field
          ><vaadin-text-field label="Email" id="email" path="email"></vaadin-text-field
          ><vaadin-text-field label="Phone" id="phone" path="phone"></vaadin-text-field
          ><vaadin-date-picker label="Date of birth" id="dateOfBirth" path="dateOfBirth"></vaadin-date-picker
          ><vaadin-text-field label="Occupation" id="occupation" path="occupation"></vaadin-text-field>
        </vaadin-form-layout>
      </vaadin-crud>
    `;
  }

  private async getData(params: CrudDataProviderParams, callback: CrudDataProviderCallback<Person | undefined>) {
    const sort: Sort = {
      orders: params.sortOrders.map((order) => ({
        property: order.path,
        direction: order.direction == 'asc' ? Direction.ASC : Direction.DESC,
        ignoreCase: false,
      })),
    };
    const data = await PersonEndpoint.list({ pageNumber: params.page, pageSize: params.pageSize, sort });
    const size = await PersonEndpoint.count();
    callback(data, size);
  }

  async firstUpdated() {
    this.classList.add('flex', 'flex-col', 'h-full');
  }

  private async save(e: CrudSaveEvent<Person>) {
    await this.doServerAction(() => PersonEndpoint.update(e.detail.item), 'Person details stored.');
  }

  private async delete(e: CrudDeleteEvent<Person>) {
    await this.doServerAction(() => PersonEndpoint.delete(e.detail.item.id!), 'Person deleted.');
  }

  private async doServerAction(fnc: () => Promise<Person|void>, msg: string) {
    try {
      await fnc();
      (this.crud as any)._grid.clearCache();
      Notification.show(msg, { position: 'bottom-start' });
    } catch (error: any) {
      if (error instanceof EndpointError || error instanceof ValidationError) {
        Notification.show(`Server error. ${error.message}`, { theme: 'error', position: 'bottom-start' });
      } else {
        throw error;
      }
    }
  }
}
