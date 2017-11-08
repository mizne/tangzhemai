import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoodsManagementPage } from './goods-management';
import { AddGoodsPage } from './add-goods/add-goods'

@NgModule({
  declarations: [
    GoodsManagementPage,
    AddGoodsPage
  ],
  imports: [
    IonicPageModule.forChild(GoodsManagementPage),
  ],
})
export class GoodsManagementPageModule {}
