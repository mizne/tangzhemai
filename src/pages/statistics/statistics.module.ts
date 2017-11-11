import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatisticsPage } from './statistics';

import { SharedModule } from '../../shared/shared.module'

import { StoreModule } from '@ngrx/store'
import { reducers } from './reducers'
import { EffectsModule } from '@ngrx/effects'
import { StatisticsEffects } from './statistics.effects'

import { ChartsModule } from 'ng2-charts'

const effects = [
  StatisticsEffects
]

@NgModule({
  declarations: [
    StatisticsPage,
  ],
  imports: [
    SharedModule,
    
    StoreModule.forFeature('statistics', reducers),
    EffectsModule.forFeature(effects),
    IonicPageModule.forChild(StatisticsPage),
    ChartsModule,
  ],
  providers: []
})
export class StatisticsPageModule {}
