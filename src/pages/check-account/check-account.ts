import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { GoodsWriteoffPage } from './goods-writeoff/goods-writeoff'
import { CollectMoneyPage } from './collect-money/collect-money'

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store'
import { State, getCheckAccount } from './reducers'
import { FetchCheckAccountAction } from './check-account.action'

import { CheckAccount } from './models/check-account.model'

import { FeedbackService } from '../../app/services/feedback.service'

import fecha from 'fecha'

/**
 * Generated class for the CheckAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-check-account',
  templateUrl: 'check-account.html',
})
export class CheckAccountPage {
  checkAccountDesc$: Observable<{
    merchantTotalRevenue: string,
    revenueReceived: string,
    goodsWriteoffRevenue: string,
    totalRevenueNet: string,
    revenueReceivedNet: string,
    goodsWriteoffRevenueNet: string
  }>

  helpMap = {
    'merchantTotalRevenue': '商家总实收 = 收款实收 + 商品核销实收',
    'totalRevenueNet': `总实收净额 = 收款实收净额 + 商品核销实收净额`
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private store: Store<State>,
    private feedbackService: FeedbackService
  ) {
  }

  ionViewDidLoad() {
    this.initSubscriber()
  }

  ionViewDidEnter() {
    const today = fecha.format(new Date(), 'YYYY/MM/DD')
    this.store.dispatch(new FetchCheckAccountAction({
      startTime: today + ' 00:00:00',
      endTime: today + ' 23:59:59'
    }))
  }

  toGoodsWriteoff() {
    this.feedbackService.feedback()
    this.navCtrl.push(GoodsWriteoffPage)
  }

  toCollectMoney() {
    this.feedbackService.feedback()
    this.navCtrl.push(CollectMoneyPage)
  }

  private initSubscriber() {
    this.checkAccountDesc$ = this.store.select(getCheckAccount)
    .map(checkAccount => ({
      merchantTotalRevenue: checkAccount.merchantTotalRevenue.toFixed(2) + '元',
      revenueReceived: checkAccount.revenueReceived.toFixed(2) + '元',
      goodsWriteoffRevenue: checkAccount.goodsWriteoffRevenue.toFixed(2) + '元',
      totalRevenueNet: checkAccount.totalRevenueNet.toFixed(2) + '元',
      revenueReceivedNet: checkAccount.revenueReceivedNet.toFixed(2) + '元',
      goodsWriteoffRevenueNet: checkAccount.goodsWriteoffRevenueNet.toFixed(2) + '元'
    }))
    
  }
}
