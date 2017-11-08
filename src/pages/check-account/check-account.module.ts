import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckAccountPage } from './check-account';

@NgModule({
  declarations: [
    CheckAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckAccountPage),
  ],
})
export class CheckAccountPageModule {}
