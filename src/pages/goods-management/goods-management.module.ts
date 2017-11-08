import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoodsManagementPage } from './goods-management';
import { AddGoodsPage } from './add-goods/add-goods'
import { SharedModule } from '../../shared/shared.module'
@NgModule({
  declarations: [
    GoodsManagementPage,
    AddGoodsPage
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(GoodsManagementPage),
  ],
})
export class GoodsManagementPageModule {}
