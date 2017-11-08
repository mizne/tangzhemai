import { Component, OnInit } from '@angular/core'
import { IonicPage, NavController, NavParams, App } from 'ionic-angular'
import { FormControl } from '@angular/forms'
import { AddGoodsPage } from './add-goods/add-goods'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'

/**
 * Generated class for the GoodsManagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-goods-management',
  templateUrl: 'goods-management.html'
})
export class GoodsManagementPage implements OnInit {
  totalCount$: Observable<number> = Observable.of(42)

  selectMode = 'all'
  mode: FormControl = new FormControl('')

  goodses = [
    {
      id: 0,
      name: '瓜子',
      price: '11'
    },
    {
      id: 1,
      name: '饮料',
      price: '14'
    },
    {
      id: 2,
      name: '蛋糕',
      price: '21'
    }
  ]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoodsManagementPage')
  }

  ngOnInit() {
    this.mode.valueChanges.subscribe(e => {
      console.log(e)
    })
  }

  toAddGoods() {
    this.app.getRootNav().push(AddGoodsPage)
  }
}
