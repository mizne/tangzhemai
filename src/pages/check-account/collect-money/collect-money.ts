import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store'
import { State, getCollectMoney } from '../reducers'

/**
 * Generated class for the CollectMoneyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-collect-money',
  templateUrl: 'collect-money.html',
})
export class CollectMoneyPage {
  collectMoneyDesc$: Observable<{
    revenueReceived: string // 收款实收
    revenueReceivedNet: string // 收款实收净额

    receivedOrderAmount: string // 收款订单金额
    receivedOrderMerchantDiscount: string // 收款订单 商家优惠
    receivedRefundAmount: string // 收款实退金额
    receivedOrderCount: string // 收款订单笔数
    receivedOrderRefundCount: string // 退款笔数
  }>

  helpMap = {
    'revenueReceived': `收款实收 = 收款订单金额 - 商家优惠 - 收款实退金额`,
    'revenueReceivedNet': `收款实收净额 = 收款实收 - 收款服务费 - 分润金额(分润金额仅部分商户才有)`
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<State>
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CollectMoneyPage');
    this.initSubscriber()
  }

  private initSubscriber(): void {
    this.collectMoneyDesc$ = this.store.select(getCollectMoney)
    .map((collectMoney) => ({
      revenueReceived: collectMoney.revenueReceived.toFixed(2) + '元',// 收款实收
      revenueReceivedNet: collectMoney.revenueReceivedNet.toFixed(2) + '元', // 收款实收净额

      receivedOrderAmount: collectMoney.receivedOrderAmount.toFixed(2) + '元', // 收款订单金额
      receivedOrderMerchantDiscount: collectMoney.receivedOrderMerchantDiscount.toFixed(2) + '元', // 收款订单 商家优惠
      receivedRefundAmount: collectMoney.receivedRefundAmount.toFixed(2) + '元', // 收款实退金额
      receivedOrderCount: collectMoney.receivedOrderCount + '笔', // 收款订单笔数
      receivedOrderRefundCount: collectMoney.receivedOrderRefundCount + '笔' // 退款笔数
    }))
  }

}
