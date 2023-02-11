import Contact from "Frontend/generated/com/example/application/data/entity/Contact";
import ContactModel from "Frontend/generated/com/example/application/data/entity/ContactModel";
import { crmStore } from "Frontend/stores/app-store";
import { makeAutoObservable, observable } from "mobx";

class ListViewStore {
  filterText = '';
  selectedContact: Contact | null = null;

  constructor() {
    makeAutoObservable(this, {selectedContact: observable.ref}, {autoBind: true});
  }

  updateFilter(filterText: string) {
    this.filterText = filterText;
  }

  get filteredContacts() {
    const filter = new RegExp(this.filterText, 'i');
    const contacts = crmStore.contacts;
    return contacts.filter((contact) => filter.test(`${contact.firstName} ${contact.lastName}`))
  }

  setSelectedContact(contact: Contact) {
    this.selectedContact = contact;
  }

  editNew() {
    this.selectedContact = ContactModel.createEmptyValue();
  }

  cancelEdit() {
    this.selectedContact = null;
  }

  async save(contact:Contact) {
    await crmStore.saveContact(contact);
    this.cancelEdit();
  }

  async delete() {
    if (this.selectedContact) {
      await crmStore.deleteContact(this.selectedContact);
      this.cancelEdit();
    }
  }
}

export const listViewStore = new ListViewStore();