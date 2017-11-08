import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoodsManagementPage } from './goods-management';

@NgModule({
  declarations: [
    GoodsManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(GoodsManagementPage),
  ],
})
export class GoodsManagementPageModule {}
