import { Component, ViewChild } from '@angular/core';
import { NavController, App } from 'ionic-angular';

import { OrderPage } from '../order/order'

import { Store } from '@ngrx/store'
import { State, getCount } from './reducers'
import { IncrementAction, DecrementAction } from './home.action'
import { Observable } from 'rxjs/Observable';

import { LocalService } from '../../app/services/local.service'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
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
    {
      id: 3,
      label: '库存管理',
      value: 'stock',
      page: 'StockManagementPage'
    }
  ]

  appRow2 = [
    {
      id: 0,
      label: '统计管理',
      value: 'statistics',
      page: 'StatisticsPage'
    },
    {
      id: 1,
      label: '更多',
      value: 'more',
      page: 'MoreAppsPage'
    }
  ]

  constructor(
    public navCtrl: NavController,
    private store: Store<State>,
    private app: App,
    private localService: LocalService
  ) {

  }

  ionViewDidLoad() {
  }

  toPage(pageName: string): void {
    this.app.getRootNav().push(pageName)
  }

}
