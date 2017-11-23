import { Component, ViewChild } from '@angular/core';
import { NavController, App } from 'ionic-angular';

import { OrderPage } from '../order/order'

import { Store } from '@ngrx/store'
import { State, getTodayStatistics } from './reducers'
import { FetchTodayStatisticsAction } from './home.action'

import { Observable } from 'rxjs/Observable';

import { LocalService } from '../../app/services/local.service'
import { DestroyService } from '../../app/services/destroy.service'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DestroyService]
})
export class HomePage {

  appRow1 = [
    {
      id: 0,
      label: '商品管理',
      value: 'goods',
      page: 'GoodsManagementPage'
    },
    {
      id: 1,
      label: '进货管理',
      icon: 'jinhuo',
      value: 'purchase',
      page: 'PurchaseManagementPage'
    },
    {
      id: 2,
      label: '销售订单',
      value: 'sales',
      page: 'SalesorderManagementPage'
    },
    // {
    //   id: 3,
    //   label: '库存管理',
    //   value: 'stock',
    //   page: 'StockManagementPage'
    // }
    {
      id: 3,
      label: '统计管理',
      value: 'statistics',
      page: 'StatisticsPage'
    },
  ]

  appRow2 = [
    // {
    //   id: 0,
    //   label: '统计管理',
    //   value: 'statistics',
    //   page: 'StatisticsPage'
    // },
    {
      id: 1,
      label: '更多',
      value: 'more',
      page: 'MoreAppsPage'
    }
  ]

  todayMerchantAmount: string
  todayOrderCount: string

  merchantName: Promise<string>

  constructor(
    public navCtrl: NavController,
    private store: Store<State>,
    private app: App,
    private localService: LocalService,
    private destroyService: DestroyService
  ) {

  }

  ionViewDidLoad() {
    this.merchantName = this.localService.getAliasName()
    this.store.dispatch(new FetchTodayStatisticsAction())

    this.store.select(getTodayStatistics)
    .takeUntil(this.destroyService)
    .subscribe((todayStatistics) => {
      const total = todayStatistics.map(e => ({
        orderCount: Number(e.num.value),
        merchantAmount: Number(e.merchantAmount.value)
      }))
      .reduce((accu, curr) => {
        accu.orderCount += curr.orderCount
        accu.merchantAmount += curr.merchantAmount
        return accu
      }, {
        orderCount: 0,
        merchantAmount: 0,
      })

      this.todayMerchantAmount = total.merchantAmount.toFixed(2)
      this.todayOrderCount = String(total.orderCount)
    })
  }

  toPage(pageName: string): void {
    this.app.getRootNav().push(pageName)
  }

}
