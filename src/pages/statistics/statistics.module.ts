import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatisticsPage } from './statistics';
import { GoodsStatisticsPage } from './goods-statistics/goods-statistics'
import { OrderStatisticsPage } from './order-statistics/order-statistics'

import { SharedModule } from '../../shared/shared.module'

import { StoreModule } from '@ngrx/store'
import { reducers } from './reducers'
import { EffectsModule } from '@ngrx/effects'
import { OrderStatisticsEffects } from './order-statistics/order-statistics.effects'
import { GoodsStatisticsEffects } from './goods-statistics/goods-statistics.effects'

import { ChartsModule } from 'ng2-charts'

const effects = [
  OrderStatisticsEffects,
  GoodsStatisticsEffects,
]

@NgModule({
  declarations: [
    StatisticsPage,
    GoodsStatisticsPage,
    OrderStatisticsPage,
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('statistics', reducers),
    EffectsModule.forFeature(effects),
    IonicPageModule.forChild(StatisticsPage),
    ChartsModule,
  ],
  providers: [],
  entryComponents: [
    GoodsStatisticsPage,
    OrderStatisticsPage,
  ]
})
export class StatisticsPageModule {}
