import '@vaadin/button';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { View } from '../view';

@customElement('awards-view')
export class AwardsView extends View {

  render() {
    return html`
    <p> Award page works! </p>
    <vaadin-button class="buttonSpacer" @click="${this.onClickBack}">Back</vaadin-button>
    `;
  }

  onClickBack(){
    window.location.href = "/";
  }
}