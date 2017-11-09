import { Component, ViewChild } from '@angular/core'
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

import { FeedbackService } from '../../app/services/feedback.service'

import { Store } from '@ngrx/store'
import { State, getTotalCount } from './reducers'
import { FetchGoodsCountAction } from './goods-management.action'

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
export class GoodsManagementPage {
  totalCount$: Observable<number>

  modeCtrl: FormControl = new FormControl('all')
  showFilter$: Observable<string>

  modes = [
    {
      id: 0,
      label: '全部商品',
      value: 'all'
    },
    {
      id: 1,
      label: '已上架',
      value: 'onShelf'
    },
    {
      id: 2,
      label: '已下架',
      value: 'offShelf'
    }
  ]

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
    private alertCtrl: AlertController,
    private store: Store<State>
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoodsManagementPage')


    this.totalCount$ = this.store.select(getTotalCount)
    this.store.dispatch(new FetchGoodsCountAction())

    this.showFilter$ = Observable.combineLatest(
      this.totalCount$,
      this.modeCtrl.valueChanges
      .map(this.findModeLabel).startWith(this.modes[0].label)
    )
    .map(([count, modeLabel]) => `${modeLabel}(${count})`)
  }

  private findModeLabel = (value: string): string => {
    return this.modes.find(e => e.value === value).label
  }

  ionViewCanLeave(): Promise<any> {
    return new Promise((res, rej) => {
      this.alertCtrl.create({
        title: '可以走么',
        message: '真的不可以走么',
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked')
              rej()
            }
          },
          {
            text: '确定',
            handler: () => {
              console.log('ensure')
              res()
            }
          }
        ]
      }).present()
    })
  }

  toAddGoods() {
    this.app.getRootNav().push(AddGoodsPage)
  }
}
