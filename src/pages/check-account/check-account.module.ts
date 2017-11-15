import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckAccountPage } from './check-account';
import { GoodsWriteoffPage } from './goods-writeoff/goods-writeoff'
import { CollectMoneyPage } from './collect-money/collect-money'
import { RevenueItem } from './revenue-item/revenue-item'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { CheckEffects } from './check-account.effects'

import { CheckAccountService } from './check-account.service'

import { SharedModule } from '../../shared/shared.module'

const effects = [
  CheckEffects
]

@NgModule({
  declarations: [
    CheckAccountPage,
    GoodsWriteoffPage,
    CollectMoneyPage,
    RevenueItem,
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('checkAccout', reducers),
    EffectsModule.forFeature(effects),
    IonicPageModule.forChild(CheckAccountPage),
  ],
  providers: [CheckAccountService],
  entryComponents: [
    GoodsWriteoffPage,
    CollectMoneyPage,
  ]
})
export class CheckAccountPageModule {}
