import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinePage } from './mine';
import { AboutPage } from './about/about'
import { HelpCenterPage } from './help-center/help-center'
import { DeliveryPage } from './delivery/delivery'

import { SharedModule } from '../../shared/shared.module'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { DeliveryEffects } from './delivery/delivery.effects'

import { MerchantInfoService } from './services/merchant-info.service'

const effects = [DeliveryEffects]

@NgModule({
  declarations: [
    MinePage,
    AboutPage,
    HelpCenterPage,
    DeliveryPage,
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('mine', reducers),
    EffectsModule.forFeature(effects),
    IonicPageModule.forChild(MinePage),
  ],
  entryComponents: [
    AboutPage,
    HelpCenterPage,
    DeliveryPage,
  ],
  providers: [MerchantInfoService]
})
export class MinePageModule {}
