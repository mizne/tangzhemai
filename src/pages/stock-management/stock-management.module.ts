import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockManagementPage } from './stock-management';

@NgModule({
  declarations: [
    StockManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(StockManagementPage),
  ],
})
export class StockManagementPageModule {}
