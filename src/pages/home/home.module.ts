import { NgModule } from '@angular/core'
import { HomePage } from './home'
import { IonicPageModule } from 'ionic-angular'

import { SharedModule } from '../../shared/shared.module'

@NgModule({
  declarations: [HomePage],
  imports: [
    SharedModule,
    IonicPageModule.forChild(HomePage)
  ]
})
export class HomePageModule {}