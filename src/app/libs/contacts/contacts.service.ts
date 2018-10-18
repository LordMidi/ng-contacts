import { Injectable } from '@angular/core';
import { Observable, Subscriber, of } from 'rxjs';
import { filter, concatAll } from 'rxjs/operators';
import { mockContacts } from './mock-contacts';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contacts: Observable<Contact[]>;
  contactsObserver: Subscriber<Contact[]>;

  constructor() {
    this.contacts = new Observable(observer => {
      this.contactsObserver = observer;
      observer.next(mockContacts);
      return {unsubscribe() {}};
    });
  }

  /**
   * Get all contacts.
   */
  getContacts(): Observable<Contact[]> {
    return this.contacts;
  }

  /**
   * Get a specific contact.
   * @param id identifier of the contact
   */
  getContact(id: number): Observable<Contact> {
    return this
      .getContacts()
      .pipe(
        concatAll(),
        filter(contact => contact.id === id)
      );
  }
  /**
   * Update a contact.
   * In a real world this should be using immutables.
   * (updating backend, fetching contacts list, new observable update)
   * @param id identifier of the contact to update
   * @param data object holding params to update contact with
   */
  updateContact(id: number, data: any) {
    var contactToUpdate = mockContacts.find(contact => contact.id === id);
    if (contactToUpdate) {

      // update only exisiting properties
      Object.keys(contactToUpdate).forEach(key => {
        if (data[key]) {
          contactToUpdate[key] = data[key];
        }
      });

    }
  }

}
