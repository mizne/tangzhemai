import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderPage } from './order';

import { SharedModule } from '../../shared/shared.module'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { OrderEffects } from './order.effects'

import { OrderService } from './order.service'

const effects = [
  OrderEffects
]

@NgModule({
  declarations: [
    OrderPage,
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('order', reducers),
    EffectsModule.forFeature(effects),
    IonicPageModule.forChild(OrderPage),
  ],
  providers: [OrderService]
})
export class OrderPageModule {}
