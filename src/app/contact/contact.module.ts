import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactRoutingModule } from './contact-routing.module';
import { DateValueAccessor } from './date-value-accessor';
import { ContactComponent } from './contact.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContactRoutingModule
  ],
  declarations: [ContactComponent, DateValueAccessor]
})
export class ContactModule { }
