import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinePage } from './mine';
import { AboutPage } from './about/about'
import { HelpCenterPage } from './help-center/help-center'

import { SharedModule } from '../../shared/shared.module'

@NgModule({
  declarations: [
    MinePage,
    AboutPage,
    HelpCenterPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(MinePage),
  ],
  entryComponents: [
    AboutPage,
    HelpCenterPage
  ]
})
export class MinePageModule {}
