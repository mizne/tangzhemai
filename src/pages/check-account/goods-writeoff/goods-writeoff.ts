import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store'
import { State, getGoodsWriteOff } from '../reducers'

/**
 * Generated class for the GoodsWriteoffPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-goods-writeoff',
  templateUrl: 'goods-writeoff.html',
})
export class GoodsWriteoffPage {
  goodsWriteOffDesc$: Observable<{
    goodsWriteoffRevenue: string // 商品核销实收
    goodsWriteoffRevenueNet: string // 商品核销实收净额

    goodsOrderAmount: string // 商品订单金额
    goodsWriteoffMerchantDiscount: string // 商品核销 商家优惠
    writeoffRefundAmount: string // 核销实退金额
    goodsWriteoffCount: string // 商品核销笔数
    goodsWriteoffRefundCount: string // 退款笔数
  }>

  helpMap = {
    'goodsWriteoffRevenue': `商品核销实收 = 商品订单金额 - 商家优惠 - 核销实退金额
    (商品订单金额指商品抵扣金额，是商品原价或代金券面值)`,
    'goodsWriteoffRevenueNet': `商品核销实收净额 = 商品核销实收 - 商品核销服务费`
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<State>
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoodsWriteoffPage');
    this.initSubscriber()
  }

  private initSubscriber() {
    this.goodsWriteOffDesc$ = this.store.select(getGoodsWriteOff)
    .map(goodsWriteOff => ({
      goodsWriteoffRevenue: goodsWriteOff.goodsWriteoffRevenue.toFixed(2) + '元',
      goodsWriteoffRevenueNet: goodsWriteOff.goodsWriteoffRevenueNet.toFixed(2) + '元',

      goodsOrderAmount: goodsWriteOff.goodsOrderAmount.toFixed(2) + '元',
      goodsWriteoffMerchantDiscount: goodsWriteOff.goodsWriteoffMerchantDiscount.toFixed(2) + '元',
      writeoffRefundAmount: goodsWriteOff.writeoffRefundAmount.toFixed(2) + '元',
      goodsWriteoffCount: goodsWriteOff.goodsWriteoffCount + '笔',
      goodsWriteoffRefundCount: goodsWriteOff.goodsWriteoffRefundCount + '笔'
    }))
  }

}
