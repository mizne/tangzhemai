import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseManagementPage } from './purchase-management';

@NgModule({
  declarations: [
    PurchaseManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchaseManagementPage),
  ],
})
export class PurchaseManagementPageModule {}
