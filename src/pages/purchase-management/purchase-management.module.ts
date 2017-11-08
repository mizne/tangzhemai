import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseManagementPage } from './purchase-management';
import { SharedModule } from '../../shared/shared.module'

@NgModule({
  declarations: [
    PurchaseManagementPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(PurchaseManagementPage),
  ],
})
export class PurchaseManagementPageModule {}
