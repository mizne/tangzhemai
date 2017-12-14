import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs/Subscription'

import {
  State,
  getGoodsStatisticsOfToday,
  getGoodsStatisticsOfThisMonth,
  getGoodsStatisticsOfThisYear
} from '../reducers'
import * as fromGoodsStatistics from './goods-statistics.action'

import { DestroyService } from '../../../app/services/destroy.service'
import { FeedbackService } from '../../../app/services/feedback.service'
/**
 * Generated class for the StatisticsManage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
export enum DateType {
  TODAY,
  THIS_MONTH,
  THIS_YEAR
}

@Component({
  selector: 'page-goods-statistics',
  templateUrl: 'goods-statistics.html',
  providers: [DestroyService]
})
export class GoodsStatisticsPage implements OnInit {
  dateTypeCtrl: FormControl = new FormControl(DateType.TODAY)
  dateType$: Observable<DateType> = this.dateTypeCtrl.valueChanges.startWith(
    DateType.TODAY
  )

  chartType = 'doughnut'
  goodsCountOfToday$: Observable<number[]> = Observable.of([])
  goodsNameOfToday$: Observable<string[]> = Observable.of([])
  goodsAmountOfToday$: Observable<number[]> = Observable.of([])

  goodsCountOfThisMonth$: Observable<number[]>
  goodsNameOfThisMonth$: Observable<string[]>
  goodsAmountOfThisMonth$: Observable<number[]>

  goodsCountOfThisYear$: Observable<number[]>
  goodsNameOfThisYear$: Observable<string[]>
  goodsAmountOfThisYear$: Observable<number[]>

  goodsTotalCount$: Observable<number>
  goodsTotalAmount$: Observable<number>

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<State>,
    private destroyService: DestroyService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.initDataSource()
  }

  ionViewDidEnter(): void {
    this.store.dispatch(
      new fromGoodsStatistics.FetchGoodsStatisticsOfTodayAction()
    )
    this.store.dispatch(
      new fromGoodsStatistics.FetchGoodsStatisticsOfThisMonthAction()
    )
    this.store.dispatch(
      new fromGoodsStatistics.FetchGoodsStatisticsOfThisYearAction()
    )
  }

  segmentChanged() {
    this.feedbackService.feedback()
  }

  private initDataSource(): void {
    this.initTodayData()
    this.initThisMonthData()
    this.initThisYearData()

    this.initGoodsTotalCount()
    this.initGoodsTotalAmount()
  }

  private initTodayData(): void {
    this.goodsNameOfToday$ = this.store
      .select(getGoodsStatisticsOfToday)
      .map(e => e.map(f => f.name))
    this.goodsAmountOfToday$ = this.store
      .select(getGoodsStatisticsOfToday)
      .map(e => e.map(f => f.amount))
    this.goodsCountOfToday$ = this.store
      .select(getGoodsStatisticsOfToday)
      .map(e => e.map(f => f.num))
  }

  private initThisMonthData(): void {
    this.goodsNameOfThisMonth$ = this.store
      .select(getGoodsStatisticsOfThisMonth)
      .map(e => e.map(f => f.name))
    this.goodsAmountOfThisMonth$ = this.store
      .select(getGoodsStatisticsOfThisMonth)
      .map(e => e.map(f => f.amount))
    this.goodsCountOfThisMonth$ = this.store
      .select(getGoodsStatisticsOfThisMonth)
      .map(e => e.map(f => f.num))
  }

  private initThisYearData(): void {
    this.goodsNameOfThisYear$ = this.store
      .select(getGoodsStatisticsOfThisYear)
      .map(e => e.map(f => f.name))
    this.goodsAmountOfThisYear$ = this.store
      .select(getGoodsStatisticsOfThisYear)
      .map(e => e.map(f => f.amount))
    this.goodsCountOfThisYear$ = this.store
      .select(getGoodsStatisticsOfThisYear)
      .map(e => e.map(f => f.num))
  }

  private initGoodsTotalCount(): void {
    const todayGoodsCount$: Observable<number> = Observable.combineLatest(
      this.dateType$.filter(e => e === DateType.TODAY),
      this.store.select(getGoodsStatisticsOfToday)
    ).map(([_, items]) => {
      return items.reduce((accu, curr) => ((accu += curr.num), accu), 0)
    })

    const thisMonthGoodsCount$: Observable<number> = Observable.combineLatest(
      this.dateType$.filter(e => e === DateType.THIS_MONTH),
      this.store.select(getGoodsStatisticsOfThisMonth)
    ).map(([_, items]) => {
      return items.reduce((accu, curr) => ((accu += curr.num), accu), 0)
    })

    const thisYearGoodsCount$: Observable<number> = Observable.combineLatest(
      this.dateType$.filter(e => e === DateType.THIS_YEAR),
      this.store.select(getGoodsStatisticsOfThisYear)
    ).map(([_, items]) => {
      return items.reduce((accu, curr) => ((accu += curr.num), accu), 0)
    })

    this.goodsTotalCount$ = Observable.merge(
      todayGoodsCount$,
      thisMonthGoodsCount$,
      thisYearGoodsCount$
    )
  }

  private initGoodsTotalAmount(): void {
    const todayGoodsAmount$: Observable<number> = Observable.combineLatest(
      this.dateType$.filter(e => e === DateType.TODAY),
      this.store.select(getGoodsStatisticsOfToday)
    ).map(([_, items]) => {
      return items.reduce((accu, curr) => ((accu += curr.amount), accu), 0)
    })

    const thisMonthGoodsAmount$: Observable<number> = Observable.combineLatest(
      this.dateType$.filter(e => e === DateType.THIS_MONTH),
      this.store.select(getGoodsStatisticsOfThisMonth)
    ).map(([_, items]) => {
      return items.reduce((accu, curr) => ((accu += curr.amount), accu), 0)
    })

    const thisYearGoodsAmount$: Observable<number> = Observable.combineLatest(
      this.dateType$.filter(e => e === DateType.THIS_YEAR),
      this.store.select(getGoodsStatisticsOfThisYear)
    ).map(([_, items]) => {
      return items.reduce((accu, curr) => ((accu += curr.amount), accu), 0)
    })

    this.goodsTotalAmount$ = Observable.merge(
      todayGoodsAmount$,
      thisMonthGoodsAmount$,
      thisYearGoodsAmount$
    )
  }
}
