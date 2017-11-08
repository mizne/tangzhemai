import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';

import { SharedModule } from '../../shared/shared.module'

import { LoginService } from './login.service'

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(LoginPage),
  ],
  providers: [LoginService]
})
export class LoginPageModule {}
