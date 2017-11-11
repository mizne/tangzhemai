import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseManagementPage } from './purchase-management';
import { SharedModule } from '../../shared/shared.module'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { PurchaseEffects } from './purchase-management.effects'

import { PurchaseService } from './purchase.service'

const effects = [
  PurchaseEffects
]

@NgModule({
  declarations: [
    PurchaseManagementPage,
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('purchaseManagement', reducers),
    EffectsModule.forFeature(effects),
    IonicPageModule.forChild(PurchaseManagementPage),
  ],
  providers: [PurchaseService]
})
export class PurchaseManagementPageModule {}
