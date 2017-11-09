import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoodsManagementPage } from './goods-management';
import { AddGoodsPage } from './add-goods/add-goods'
import { GoodsDetailPage } from './goods-detail/goods-detail'
import { GoodsActionPopoverPage } from './goods-detail/goods-action-popover'

import { SharedModule } from '../../shared/shared.module'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { GoodsEffects } from './goods-management.effects'

import { GoodsService } from './goods.service'

const effects = [
  GoodsEffects
]

@NgModule({
  declarations: [
    GoodsManagementPage,
    AddGoodsPage,
    GoodsDetailPage,
    GoodsActionPopoverPage,
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('goods', reducers),
    EffectsModule.forFeature(effects),
    IonicPageModule.forChild(GoodsManagementPage),
  ],
  providers: [GoodsService],
  entryComponents: [
    AddGoodsPage, 
    GoodsDetailPage, 
    GoodsActionPopoverPage,
  ],
})
export class GoodsManagementPageModule {}
