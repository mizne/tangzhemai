import { Component } from '@angular/core'

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

  constructor() {}
}
