import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoreAppsPage } from './more-apps';

@NgModule({
  declarations: [
    MoreAppsPage,
  ],
  imports: [
    IonicPageModule.forChild(MoreAppsPage),
  ],
})
export class MoreAppsPageModule {}
