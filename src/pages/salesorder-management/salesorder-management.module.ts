import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesorderManagementPage } from './salesorder-management';
import { AddSalesorderPage } from './add-salesorder/add-salesorder'
import { SalesOrderSelectGoodsPage } from './select-goods/select-goods'

import { SharedModule } from '../../shared/shared.module'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { SalesOrderEffects } from './salesorder-management.effects'
import { SalesOrderSelectGoodsEffects } from './select-goods/select-goods.effects'
import { AddSalesOrderEffects } from './add-salesorder/add-salesorder.effects'

import { SalesOrderService } from './salesorder.service'

const effects = [
  SalesOrderEffects,
  SalesOrderSelectGoodsEffects,
  AddSalesOrderEffects,
]

@NgModule({
  declarations: [
    SalesorderManagementPage,
    AddSalesorderPage,
    SalesOrderSelectGoodsPage,
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('salesOrderManagement', reducers),
    EffectsModule.forFeature(effects),
    IonicPageModule.forChild(SalesorderManagementPage),
  ],
  providers: [SalesOrderService],
  entryComponents: [
    AddSalesorderPage,
    SalesOrderSelectGoodsPage,
  ]
})
export class SalesorderManagementPageModule {}
