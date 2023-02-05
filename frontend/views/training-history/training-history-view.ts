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
//import { Notification } from '@vaadin/notification';
import '@vaadin/text-field';
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { View } from '../../views/view';
import { dialogFooterRenderer, dialogRenderer } from '@vaadin/dialog/lit.js';
import type { DialogOpenedChangedEvent } from '@vaadin/dialog';
import { addDays, formatISO } from 'date-fns';
import { Event } from '../../../src/main/models/Event'
import '@vaadin/grid/vaadin-grid-selection-column.js';
import '@vaadin/confirm-dialog';
import '@vaadin/grid/vaadin-grid-sort-column.js';
import '@vaadin/text-area';
import type { ConfirmDialogOpenedChangedEvent } from '@vaadin/confirm-dialog';

interface CourseItem {
  regDate: Date;
  course: string;
  compDate: Date;
}

interface UserInfo {
  username: string;
  name: string;
}

@customElement('training-history-view')
export class TrainingHistoryView extends View {

  @state()
  private text = 'Username : Dave01\nName : Dave Chappelle'
  private gridItems: CourseItem[] = [
    { regDate: new Date("2019-01-16"), course: 'Ski Patrol Course 1',compDate: new Date("2019-10-30") },
    { regDate: new Date("2020-01-16"), course: 'Ski Patrol Course 2',compDate: new Date("2020-10-30") },
  ];
  private userInfo: UserInfo[] = [
    { username:"Dave01", name: "Dave Chappelle"},
  ];
  private justifyContent = 'flex-start';
  private alignItems = 'stretch';

  protected override async firstUpdated() {
    
  }

 

  render() {
    return html`

    <vaadin-horizontal-layout
    theme="spacing padding"
    style="${this.alignItems}"
    >
    
    &nbsp;Username: Dave01
    <br>
    &nbsp;Name: Dave Chappelle
    <br>
    <br>

    <vaadin-grid .items="${this.gridItems}" theme="no-border">    
      <vaadin-grid-sort-column path="regDate" name="regDate Date"></vaadin-grid-sort-column>
      <vaadin-grid-sort-column path="course" name="Course" header="Name"></vaadin-grid-sort-column>
      <vaadin-grid-sort-column path="compDate" name="Completion Date"></vaadin-grid-sort-column>
    </vaadin-grid>
    <vaadin-button class="buttonSpacer" @click="${this.onClickBack}">Back</vaadin-button>

      
    `;
  }

  onClickBack(){
    window.location.href = "/";
  }
}