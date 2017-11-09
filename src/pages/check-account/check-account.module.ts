import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckAccountPage } from './check-account';

import { SharedModule } from '../../shared/shared.module'

@NgModule({
  declarations: [
    CheckAccountPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(CheckAccountPage),
  ],
})
export class CheckAccountPageModule {}
