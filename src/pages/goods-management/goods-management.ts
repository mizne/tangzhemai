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
import { GoodsDetailPage } from './goods-detail/goods-detail'
import { Observable } from 'rxjs/Observable'

import { FeedbackService } from '../../app/services/feedback.service'
import { DestroyService } from '../../app/services/destroy.service'

import { Store } from '@ngrx/store'
import { 
  State, 
  getTotalCount,
  getCurrentGoods
 } from './reducers'
import {
  FetchGoodsCountAction,
  FetchGoodsAction,
  FetchGoodsParams,
  FetchGoodsCountParams
} from './goods-management.action'
import { Goods } from './models/goods.model'

import * as R from 'ramda'

/**
 * Generated class for the GoodsManagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 export interface FetchParams {
  goodsParams: FetchGoodsParams,
  countParams: FetchGoodsCountParams
}

@IonicPage()
@Component({
  selector: 'page-goods-management',
  templateUrl: 'goods-management.html',
  providers: [DestroyService]
})
export class GoodsManagementPage {
  // totalCount$: Observable<number>

  filterCtrl: FormControl = new FormControl('all')
  showFilter$: Observable<string>
  goods$: Observable<Goods[]>

  modes = [
    {
      id: 0,
      label: '全部商品',
      value: 'all',
      filter: {}
    },
    {
      id: 1,
      label: '已上架',
      value: 'onShelf',
      filter: {
        isActive: true
      }
    },
    {
      id: 2,
      label: '已下架',
      value: 'offShelf',
      filter: {
        isActive: false
      }
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
    private store: Store<State>,
    private destroyService: DestroyService
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoodsManagementPage')
    this.initFetchData()
    this.initDataSource()
    this.initSubscriber()
  }

  private initFetchData(): void {
    this.store.dispatch(new FetchGoodsAction())
    this.store.dispatch(new FetchGoodsCountAction())
  }

  private initDataSource(): void {
    const totalCount$ = this.store.select(getTotalCount)

    this.showFilter$ = Observable.combineLatest(
      totalCount$,
      this.filterCtrl.valueChanges
        .map(this.findModeLabel)
        .startWith(this.modes[0].label)
    ).map(([count, modeLabel]) => `${modeLabel}(${count})`)

    this.goods$ = this.store.select(getCurrentGoods)
  }

  private findModeLabel = (value: string): string => {
    return this.modes.find(e => e.value === value).label
  }

  private initSubscriber(): void {
    // 下拉刷新(TODO) 拉到底部load(TODO) 选择过滤条件
    const fetchParams$: Observable<FetchParams> = this.filterCtrl.valueChanges
    .map(this.mapToParams)

    fetchParams$.takeUntil(this.destroyService)
    .subscribe(({ goodsParams, countParams }) => {
      console.log(goodsParams)
      console.log(countParams)
      this.store.dispatch(new FetchGoodsAction(goodsParams))
      this.store.dispatch(new FetchGoodsCountAction(countParams))
    })
  }

  private mapToParams = (value: string): FetchParams => {
    const filterObj = this.modes.find(e => e.value === value)
    return {
      goodsParams: filterObj.filter,
      countParams: filterObj.filter
    }
  }

  toAddGoods() {
    this.app.getRootNav().push(AddGoodsPage)
  }

  selectChange() {
    console.log('select option')
  }
  

  toGoodsDetail(id: string): void {
    this.feedbackService.feedback()
    this.app.getRootNav().push(GoodsDetailPage, {
      id
    })
  }
}
