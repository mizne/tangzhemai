import { Component } from '@angular/core'
import { NavController, NavParams, PopoverController } from 'ionic-angular'
import { FormControl } from '@angular/forms'

import { Observable } from 'rxjs/Observable'
import { Goods } from '../models/goods.model'

import { Store } from '@ngrx/store'
import { State, getCurrentGoods } from '../reducers'

import { GoodsActionPopoverPage } from './goods-action-popover'

/**
 * Generated class for the GoodsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-goods-detail',
  templateUrl: 'goods-detail.html'
})
export class GoodsDetailPage {
  goodsDetail$: Observable<Goods>

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private popoverCtrl: PopoverController,
    private store: Store<State>
  ) {}

  ionViewDidLoad() {
    const goodsId = this.navParams.get('id')
    const currentGoods$ = this.store.select(getCurrentGoods)

    this.goodsDetail$ = currentGoods$.map(goodses => {
      return goodses.find(goods => goods.id === goodsId)
    })
  }

  toActionPopover(ev) {
    let popover = this.popoverCtrl.create(GoodsActionPopoverPage, {
      id: this.navParams.get('id')
    })
    popover.present({
      ev
    })
  }
}
