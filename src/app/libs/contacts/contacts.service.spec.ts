import { TestBed } from '@angular/core/testing';

import { ContactsService } from './contacts.service';
import { Contact } from './contact';

describe('ContactsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactsService = TestBed.get(ContactsService);
    expect(service).toBeTruthy();
  });

  it('should return contacts', (done) => {
    const service: ContactsService = TestBed.get(ContactsService);
    service.getContacts().subscribe((contacts: Contact[]) => {
      expect(contacts).toBeDefined;
    });
    done();
  });

});
