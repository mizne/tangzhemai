import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditGoodsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-goods',
  templateUrl: 'edit-goods.html',
})
export class EditGoodsPage {

  goodsId: string

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.goodsId = this.navParams.get('id')
    console.log(this.goodsId)
  }

}
