import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinePage } from './mine';

import { SharedModule } from '../../shared/shared.module'

@NgModule({
  declarations: [
    MinePage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(MinePage),
  ],
})
export class MinePageModule {}
