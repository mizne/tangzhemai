import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { HomePage } from './home'

import { SharedModule } from '../../shared/shared.module'

import { StoreModule } from '@ngrx/store'
import { reducers } from './reducers'
import { EffectsModule } from '@ngrx/effects'
import { HomeEffects } from './home.effects'

const effects = [
  HomeEffects
]

@NgModule({
  declarations: [HomePage],
  imports: [
    SharedModule, 
    StoreModule.forFeature('home', reducers),
    EffectsModule.forFeature(effects),
    IonicPageModule.forChild(HomePage)
  ]
})
export class HomePageModule {}
