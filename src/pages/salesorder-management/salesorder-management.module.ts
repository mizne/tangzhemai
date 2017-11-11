import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesorderManagementPage } from './salesorder-management';

import { SharedModule } from '../../shared/shared.module'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { SalesOrderEffects } from './salesorder-management.effects'

import { SalesOrderService } from './salesorder.service'

const effects = [
  SalesOrderEffects
]

@NgModule({
  declarations: [
    SalesorderManagementPage,
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('salesOrderManagement', reducers),
    EffectsModule.forFeature(effects),
    IonicPageModule.forChild(SalesorderManagementPage),
  ],
  providers: [SalesOrderService]
})
export class SalesorderManagementPageModule {}
