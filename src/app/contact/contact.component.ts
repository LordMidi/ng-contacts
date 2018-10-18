import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ContactsService } from '../libs/contacts/contacts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../libs/contacts/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  // contact to edit
  contact: Contact;

  // value validation
  contactFormGroup: FormGroup;

  private datePipe = new DatePipe('en-US');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private contactService: ContactsService) { }

  ngOnInit() {

    // get contact with id matching to url param
    let id: number = +this.route.snapshot.paramMap.get('id');

    this
      .contactService
      .getContact(id)
      .subscribe(contact => {
        this.contact = contact;
        this.contactFormGroup = this.formBuilder.group({
          personnelNumber: [
            this.contact.personnelNumber,
            [
              Validators.required,
              Validators.maxLength(10),
              Validators.pattern(/[A-Z]{3}-[1-9]{1}[0-9]{5}/)
            ]
          ],
          firstName: [this.contact.firstName, [Validators.required]],
          lastName: [this.contact.lastName, [Validators.required]],
          birthdate: [
            this.datePipe.transform(this.contact.birthdate, 'dd.MM.y'),
            [
              Validators.required,
              Validators.maxLength(10),
              Validators.pattern(/[0-9]{6}|[0-9]{7}|[0-9]{8}|[0-9]{2}.[0-9]{2}.[0-9]{4}/)

            ]
          ],
          email: [this.contact.email, [Validators.required, Validators.email]]
        });
      });
  }

  /**
   * Submit callback for contact edit form.
   */
  onSubmit() {

    // clone value object before modification
    let formGroupValue: any = Object.assign({}, this.contactFormGroup.value);

    // recreate type date for birthdate
    formGroupValue.birthdate = this.convertFormValueDate(formGroupValue.birthdate);

    // check for invalid date
    if (formGroupValue.birthdate.toString() === 'Invalid Date') {
      this.contactFormGroup.controls['birthdate'].setErrors({ 'invalid': true });
      return false;
    }

    // abort if not adult
    if (this.isAdult(formGroupValue.birthdate)) {
      this.contactFormGroup.controls['birthdate'].setErrors({ 'isNotAdult': true });
      return false;
    }

    // update contact & navigate to index
    this.contactService.updateContact(this.contact.id, formGroupValue);
    this.router.navigate(['/']);
  }

  /**
   * Check if given birthdate is more than 18 years ago.
   * @param birthdate the birthdate to check
   */
  private isAdult(birthdate: Date): boolean {
    let ageCheck: Date = new Date(
      birthdate.getFullYear() + 18,
      birthdate.getMonth() - 1, // JS month start at 0
      birthdate.getDay()
    );
    return ageCheck > new Date();
  }

  /**
   * Convert custom date string from input to date object.
   * @param dateString custom date string
   */
  private convertFormValueDate(dateString: string): Date {

    // support & convert datestrings 111980 => 1.1.1980, 1111980 => 1.11.1980, 11111980 => 11.11.1980
    if (dateString.search('\\.') === -1) {
      let split: Array<string> = dateString.split('');
      let insertIndexes: Array<number> = [];
      if (split.length === 6) {
        insertIndexes = [1, 3];
      } else if (split.length === 7) {
        insertIndexes = [1, 4];
      } else if (split.length === 8) {
        insertIndexes = [2, 5];
      }
      insertIndexes.forEach(index => split.splice(index, 0, '.'));
      dateString = split.join('');
    }

    // create date object via iso date string
    return new Date(dateString.split('.').reverse().join('-'));
  }

}
