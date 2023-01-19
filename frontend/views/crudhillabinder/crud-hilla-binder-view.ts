import { Binder, field} from '@hilla/form';
import '@polymer/iron-icon';
import '@vaadin/button';
import '@vaadin/checkbox';
import 'patched-crud/crud';
import { Crud, CrudDataProviderCallback, CrudDataProviderParams, CrudDeleteEvent} from 'patched-crud/crud';
import '@vaadin/date-picker';
import '@vaadin/date-time-picker';
import '@vaadin/form-layout';
import '@vaadin/polymer-legacy-adapter';
import '@vaadin/text-field';
import '@vaadin/upload';
import '@vaadin/vaadin-icons';
import Sort from 'Frontend/generated/dev/hilla/mappedtypes/Sort';
import Person from 'Frontend/generated/es/manolo/data/entity/Person';
import PersonModel from 'Frontend/generated/es/manolo/data/entity/PersonModel';
import Direction from 'Frontend/generated/org/springframework/data/domain/Sort/Direction';
import * as PersonEndpoint from 'Frontend/generated/PersonEndpoint';
import { html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { View } from '../view';

@customElement('crud-hilla-binder-view')
export class CrudHillaBinderView extends View {
  private dataProvider = this.getData.bind(this);
  @query("#crud")
  private crud!: Crud<Person>;
  private binder = new Binder<Person, PersonModel>(this, PersonModel, {onSubmit: PersonEndpoint.update});
  render() {
    return html`
      <vaadin-crud
        class="w-full h-full"
        id="crud"
        exclude="Id"
        no-filter
        .dataProvider=${this.dataProvider}
        .binder=${this.binder}
        @delete=${this.delete}
        editor-position=aside
        edit-on-click
      >
        <vaadin-form-layout slot="form"
          ><vaadin-text-field ${field(this.binder.model.firstName)} label="First name" id="firstName" path="firstName"></vaadin-text-field
          ><vaadin-text-field ${field(this.binder.model.lastName)} label="Last name" id="lastName" path="lastName"></vaadin-text-field
          ><vaadin-text-field ${field(this.binder.model.email)} label="Email" id="email" path="email"></vaadin-text-field
          ><vaadin-text-field ${field(this.binder.model.phone)} label="Phone" id="phone" path="phone"></vaadin-text-field
          ><vaadin-date-picker ${field(this.binder.model.dateOfBirth)} label="Date of birth" id="dateOfBirth" path="dateOfBirth"></vaadin-date-picker
          ><vaadin-text-field ${field(this.binder.model.occupation)} label="Occupation" id="occupation" path="occupation"></vaadin-text-field>
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

  cc!: Crud<Person>;

  async firstUpdated() {
    this.classList.add('flex', 'flex-col', 'h-full');
    this.cc.binder = this.binder;

  }

  private async delete(e: CrudDeleteEvent<Person>) {
    PersonEndpoint.delete(e.detail.item.id || '');
  }
}
