import '@vaadin/button';
import '@vaadin/notification';
import '@vaadin/grid';
import { Notification } from '@vaadin/notification';
import '@vaadin/text-field';
import * as HelloWorldEndpoint from 'Frontend/generated/HelloWorldEndpoint';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { View } from '../view';

import { Person } from '../../../src/main/models/Person';
//import { getPeople } from '../../../src/main/services/people';

@customElement('hello-world-view')
export class HelloWorldView extends View {
  private items: Person[] = [];

  async firstUpdated() {
    
  }

  connectedCallback() {
    super.connectedCallback();
    this.items = getDummyPeople();
    this.classList.add('flex', 'p-m', 'gap-m', 'items-end');
  }

  render() {
    return html`
    <vaadin-grid .items="${this.items}">
      <vaadin-grid-column path="firstName"></vaadin-grid-column>
      <vaadin-grid-column path="lastName"></vaadin-grid-column>
      <vaadin-grid-column path="email"></vaadin-grid-column>
      <vaadin-grid-column path="profession"></vaadin-grid-column>
    </vaadin-grid>
  `;
  }

}


function getDummyPeople(): Person[] {
  return [
    { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', profession: 'Developer' },
    { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', profession: 'Designer' },
  ];
}
