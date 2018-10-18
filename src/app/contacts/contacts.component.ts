import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../libs/contacts/contacts.service';
import { Contact } from '../libs/contacts/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  // contacts to display
  contacts: Contact[] = [];

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService
      .getContacts()
      .subscribe(contacts => {
        this.contacts = contacts;
      });
  }

}
