import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockManagementPage } from './stock-management';

import { SharedModule } from '../../shared/shared.module'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { StockEffects } from './stock-management.effects'

import { StockService } from './stock.service'

const effects = [
  StockEffects
]

@NgModule({
  declarations: [
    StockManagementPage,
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('stockManagement', reducers),
    EffectsModule.forFeature(effects),
    IonicPageModule.forChild(StockManagementPage),
  ],
  providers: [StockService]
})
export class StockManagementPageModule {}
