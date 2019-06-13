import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'login', component: LoginComponent }
    ]),
    SharedModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class UserModule { }
