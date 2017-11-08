import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { OrderPage } from '../order/order'

import { Store } from '@ngrx/store'
import { State, getCount } from './reducers'
import { IncrementAction, DecrementAction } from './home.action'
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  appRow1 = [
    {
      id: 0,
      label: '商品管理',
      value: 'goods'
    },
    {
      id: 1,
      label: '进货管理',
      icon: 'jinhuo',
      value: 'purchase'
    },
    {
      id: 2,
      label: '销售订单',
      value: 'sales'
    },
    {
      id: 3,
      label: '库存管理',
      value: 'stock'
    }
  ]

  appRow2 = [
    {
      id: 0,
      label: '统计管理',
      value: 'statistics'
    },
    {
      id: 1,
      label: '更多',
      value: 'more'
    }
  ]

  constructor(
    public navCtrl: NavController,
    private store: Store<State>
  ) {
  }

  toOrder() {
    this.navCtrl.push(OrderPage)
  }

}
