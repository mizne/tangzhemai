import { Component } from '@angular/core'

import { DeviceFeedback } from '@ionic-native/device-feedback'

import { MinePage } from '../mine/mine'
import { StatisticsPage } from '../statistics/statistics'
import { HomePage } from '../home/home'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  home = HomePage
  statistics = StatisticsPage
  mine = MinePage

  constructor(
    private deviceFeedback: DeviceFeedback
  ) {}

  clickTab() {
    console.log(123)
    this.deviceFeedback.acoustic();
    this.deviceFeedback.haptic(0);
  }
}
