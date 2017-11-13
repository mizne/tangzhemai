import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoreAppsPage } from './more-apps';

import { SharedModule } from '../../shared/shared.module'

@NgModule({
  declarations: [
    MoreAppsPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(MoreAppsPage),
  ],
})
export class MoreAppsPageModule {}
