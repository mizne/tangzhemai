import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseManagementPage } from './purchase-management';
import { AddPurchasePage } from './add-purchase/add-purchase'
import { SelectGoodsPage } from './select-goods/select-goods'

import { SharedModule } from '../../shared/shared.module'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { PurchaseEffects } from './purchase-management.effects'
import { SelectGoodsEffects } from './select-goods/select-goods.effects'

import { PurchaseService } from './services/purchase.service'
import { ProviderService } from './services/provider.service'
import { StockService } from './services/stock.service'

const effects = [
  PurchaseEffects,
  SelectGoodsEffects
]

@NgModule({
  declarations: [
    PurchaseManagementPage,
    AddPurchasePage,
    SelectGoodsPage
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('purchaseManagement', reducers),
    EffectsModule.forFeature(effects),
    IonicPageModule.forChild(PurchaseManagementPage),
  ],
  providers: [
    PurchaseService,
    ProviderService,
    StockService
  ],
  entryComponents: [
    AddPurchasePage,
    SelectGoodsPage
  ]
})
export class PurchaseManagementPageModule {}
