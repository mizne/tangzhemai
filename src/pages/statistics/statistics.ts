import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, App } from 'ionic-angular'

import { Observable } from 'rxjs/Observable'

import { DestroyService } from '../../app/services/destroy.service'
import { FeedbackService } from '../../app/services/feedback.service'

import { OrderStatisticsPage } from './order-statistics/order-statistics'
import { GoodsStatisticsPage } from './goods-statistics/goods-statistics'

/**
 * Generated class for the StatisticsManage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
  providers: [DestroyService]
})
export class StatisticsPage {
  appRow1 = [
    {
      id: 0,
      label: '订单统计',
      value: 'sales',
      page: 'OrderStatisticsPage'
    },
    {
      id: 1,
      label: '商品统计',
      value: 'goods',
      page: 'GoodsStatisticsPage'
    }
  ]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    private destroyService: DestroyService,
    private feedbackService: FeedbackService
  ) {}



  toPage(pageName: string): void {
    switch (pageName) {
      case 'OrderStatisticsPage':
        this.app.getRootNav().push(OrderStatisticsPage)
        break
      case 'GoodsStatisticsPage':
        this.app.getRootNav().push(GoodsStatisticsPage)
      default:
        console.warn(`Unknown page name: ${pageName}`)
        break
    }
  }
}
