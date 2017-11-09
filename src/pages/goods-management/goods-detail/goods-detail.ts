import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { Goods } from '../models/goods.model'

import { Store } from '@ngrx/store'
import { State, getCurrentGoods } from '../reducers'


/**
 * Generated class for the GoodsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-goods-detail',
  templateUrl: 'goods-detail.html',
})
export class GoodsDetailPage {

  goodsDetail$: Observable<Goods>

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private store: Store<State>
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoodsDetailPage');
    console.log('goods id: ' + this.navParams.get('id'))
    const goodsId = this.navParams.get('id')
    const currentGoods$ = this.store.select(getCurrentGoods)

    this.goodsDetail$ = currentGoods$.map(goodses => {
      return goodses.find(goods => goods.id === goodsId)
    })
  }

}
