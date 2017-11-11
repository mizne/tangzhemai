import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckAccountPage } from './check-account';

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
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('checkAccout', reducers),
    EffectsModule.forFeature(effects),
    IonicPageModule.forChild(CheckAccountPage),
  ],
  providers: [CheckAccountService]
})
export class CheckAccountPageModule {}
