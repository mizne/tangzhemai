import { Component, ViewChild } from '@angular/core'
import {
  IonicPage,
  Navbar,
  NavController,
  NavParams,
  App,
  AlertController,
  ModalController
} from 'ionic-angular'
import { FormControl } from '@angular/forms'
import { AddGoodsPage, GooodsActionType } from './add-goods/add-goods'
import { GoodsDetailPage } from './goods-detail/goods-detail'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { FeedbackService } from '../../app/services/feedback.service'
import { DestroyService } from '../../app/services/destroy.service'

import { Store } from '@ngrx/store'
import { State, getTotalCount, getCurrentGoods } from './reducers'
import {
  FetchGoodsCountAction,
  FetchGoodsAction,
  FetchGoodsParams,
  FetchGoodsCountParams,
  FetchGoodsUnitsAction,
  FectchGoodsTypesAction
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
  goodsParams: FetchGoodsParams
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

  addGoodsSub: Subject<void> = new Subject<void>()
  viewDetailSub: Subject<string> = new Subject<string>()

  ionViewDidEnterSub: Subject<void> = new Subject<void>()

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
    private destroyService: DestroyService,
    private modalCtrl: ModalController
  ) {}

  ionViewDidLoad() {
    this.initDataSource()
    this.initSubscriber()
  }

  ionViewDidEnter(): void {
    this.ionViewDidEnterSub.next()
  }

  toAddGoods() {
    this.addGoodsSub.next()
  }

  toGoodsDetail(id: string): void {
    this.viewDetailSub.next(id)
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
    this.initFetchGoodsAndCount()
    this.initSelectedFeedback()

    this.initCreateGoods()
    this.initToViewGoodsDetail()
  }

  private initFetchGoodsAndCount(): void {
    const initFilter$ = this.filterCtrl.valueChanges.startWith('all')
    const fetchParams$: Observable<
      FetchParams
    > = Observable.merge(
      initFilter$,
      this.ionViewDidEnterSub.skip(1)
    ).withLatestFrom(initFilter$, (_, value) => this.mapToParams(value))

    fetchParams$
      .takeUntil(this.destroyService)
      .subscribe(({ goodsParams, countParams }) => {
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

  private initSelectedFeedback(): void {
    this.filterCtrl.valueChanges
      .do(_ => {
        this.feedbackService.feedback()
      })
      .takeUntil(this.destroyService)
      .subscribe()
  }

  private initCreateGoods(): void {
    this.addGoodsSub
      .do(_ => {
        this.feedbackService.feedback()
      })
      .takeUntil(this.destroyService)
      .subscribe(data => {
        this.modalCtrl.create(AddGoodsPage, {
          action: GooodsActionType.CREATE
        }).present()
      })
  }

  private initToViewGoodsDetail(): void {
    this.viewDetailSub
      .asObservable()
      .do(_ => {
        this.feedbackService.feedback()
      })
      .takeUntil(this.destroyService)
      .subscribe(id => {
        this.app.getRootNav().push(GoodsDetailPage, {
          id
        })
      })
  }
}
