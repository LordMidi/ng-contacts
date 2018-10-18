import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: 'contacts',
  loadChildren: './contacts/contacts.module#ContactsModule'
}, {
  path: 'contact/:id',
  loadChildren: './contact/contact.module#ContactModule'
}, {
  path: '',
  redirectTo: 'contacts',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
