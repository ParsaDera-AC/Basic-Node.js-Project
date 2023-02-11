import { makeAutoObservable } from "mobx";

class Message {
  constructor(public text = '', public error = false, public open = false) {}
}

export class UiStore {
  message = new Message();

  constructor() {
    makeAutoObservable(this, {}, {autoBind:true})
  }

  showSuccess(message:string) {
    this.showMessage(message, false);
  }

  showError(message:string) {
    this.showMessage(message, true);
  }

  clearMessage() {
    this.message = new Message();
  }

  private showMessage(text: string, error:boolean) {
    this.message = new Message(text, error, true);
    setTimeout(() => this.clearMessage(), 5000);
  }
}