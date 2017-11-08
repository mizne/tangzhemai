import { Component, OnInit, ViewChild } from '@angular/core'
import {
  IonicPage,
  Navbar,
  NavController,
  NavParams,
  App,
  AlertController
} from 'ionic-angular'
import { FormControl } from '@angular/forms'
import { AddGoodsPage } from './add-goods/add-goods'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'

import { FeedbackService } from '../../app/services/feedback.service'
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

  @ViewChild(Navbar) navbar: Navbar

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    private feedbackService: FeedbackService,
    private alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoodsManagementPage')
    const originalHandler = this.navbar.backButtonClick

    this.navbar.backButtonClick = (event) => {
      this.alertCtrl.create({
        title: '测试',
        message: '测试内容',
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: '确定',
            handler: () => {
              console.log('ensure');
              originalHandler.call(this, event)
            }
          }
        ]
      }).present()
    }

    console.log(this.navbar)
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
