import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinePage } from './mine';
import { AboutPage } from './about/about'

import { SharedModule } from '../../shared/shared.module'

@NgModule({
  declarations: [
    MinePage,
    AboutPage
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(MinePage),
  ],
  entryComponents: [
    AboutPage
  ]
})
export class MinePageModule {}
