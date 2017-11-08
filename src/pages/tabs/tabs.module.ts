import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';

import { SharedModule } from '../../shared/shared.module'

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(TabsPage),
  ],
})
export class TabsPageModule {}
