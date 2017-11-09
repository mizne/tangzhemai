import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { HomePage } from './home'

import { SharedModule } from '../../shared/shared.module'

import { StoreModule } from '@ngrx/store'
import { reducers } from './reducers'

@NgModule({
  declarations: [HomePage],
  imports: [
    SharedModule, 
    StoreModule.forFeature('home', reducers),
    IonicPageModule.forChild(HomePage)
  ]
})
export class HomePageModule {}
