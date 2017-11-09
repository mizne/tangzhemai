import { Component, OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, Validators } from '@angular/forms'
/**
 * Generated class for the AddGoodsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-goods',
  templateUrl: 'add-goods.html',
})
export class AddGoodsPage implements OnDestroy {
  nameCtrol: FormControl = new FormControl('', Validators.required)

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    this.nameCtrol.valueChanges.subscribe(e => {
      console.log(e)
    })
  }

  toSaveGoods() {
    console.log('save goods')
  }

  ngOnDestroy() {
    console.log('on destroy')
  }

}
