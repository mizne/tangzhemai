import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesorderManagementPage } from './salesorder-management';

@NgModule({
  declarations: [
    SalesorderManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesorderManagementPage),
  ],
})
export class SalesorderManagementPageModule {}
