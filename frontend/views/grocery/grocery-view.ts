import '@vaadin/button';
import '@vaadin/text-field';
import '@vaadin/number-field';
import '@vaadin/grid/vaadin-grid';
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { View } from 'Frontend/views/view';
import { Binder, field } from '@hilla/form';
import { getGroceries, save } from 'Frontend/generated/GroceryEndpoint';
import GroceryItem from 'Frontend/generated/com/example/application/GroceryItem';
import GroceryItemModel from 'Frontend/generated/com/example/application/GroceryItemModel';

@customElement('grocery-view') 
export class GroceryView extends View { 

  @state()
  private groceries: GroceryItem[] = []; 
  private binder = new Binder(this, GroceryItemModel); 

  render() {
    return html`
      <div class="p-m">
        <div>
          <vaadin-number-field
            ${field(this.binder.model.id)}
            label="Id"> 
          </vaadin-number-field> 
          <vaadin-text-field
            ${field(this.binder.model.client)}
            label="Client"> 
          </vaadin-text-field> 
          <vaadin-number-field
            ${field(this.binder.model.cost)}
            label="Cost"> 
          </vaadin-number-field> 
          <vaadin-text-field
            ${field(this.binder.model.status)}
            label="Status"> 
          </vaadin-text-field> 
          <vaadin-date-picker
            ${field(this.binder.model.startDate)}
            has-controls
            label="Start Date">
          </vaadin-date-picker>
          <vaadin-date-picker
            ${field(this.binder.model.endDate)}
            has-controls
            label="End Date">
          </vaadin-date-picker>
          <vaadin-button
            theme="primary"
            @click=${this.addItem}
            ?disabled=${this.binder.invalid}>Schedule Event!
          </vaadin-button> 
        </div>

        <h3>Event Summary</h3>
        <vaadin-grid .items="${this.groceries}" theme="row-stripes" style="max-width: 400px">
          <vaadin-grid-column path="id"></vaadin-grid-column>
          <vaadin-grid-column path="client"></vaadin-grid-column>
          <vaadin-grid-column path="cost"></vaadin-grid-column>
          <vaadin-grid-column path="status"></vaadin-grid-column>
          <vaadin-grid-column path="startDate"></vaadin-grid-column>
          <vaadin-grid-column path="endDate"></vaadin-grid-column>
        </vaadin-grid>
      </div>
    `;
  }

  async addItem() {
    const groceryItem = await this.binder.submitTo(save); 
    if (groceryItem) { 
      this.groceries = [...this.groceries, groceryItem];
      this.binder.clear();
    }
  }

  async firstUpdated() { 
    const groceries = await getGroceries();
    this.groceries = groceries;
  }
}