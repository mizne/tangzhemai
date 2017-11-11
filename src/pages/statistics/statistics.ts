
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/zip'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs/Subscription'

import {
  State,
  getOrdersStatisticsOfToday,
  getOrdersStatisticsOfThisMonth,
  getOrdersStatisticsOfThisYear,
  getStatisticsLoading
} from './reducers'
import {
  FetchOrdersStatisticsOfToday,
  FetchOrdersStatisticsOfThisMonth,
  FetchOrdersStatisticsOfThisYear
} from './statistics.action'

import { DestroyService } from '../../app/services/destroy.service'
import { FeedbackService } from '../../app/services/feedback.service'
/**
 * Generated class for the StatisticsManage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
  providers: [DestroyService]
})
export class StatisticsPage implements OnInit {
  dateType: '今日' | '本月' | '本年' = '今日'

  // chartTypes: string[] = ['line', 'bar', 'doughnut']
  chartTypes: string[] = ['line', 'bar']

  subscription: Subscription

  gridStatistics: any[] = [
    {
      icon: 'aperture',
      label: '订单总数',
      value: {
        今日: 0,
        本月: 0,
        本年: 0
      },
      unit: '个',
      field: 'num'
    },
    {
      icon: 'albums',
      label: '商家实收总计',
      value: {
        今日: 0,
        本月: 0,
        本年: 0
      },
      unit: '元',
      field: 'merchantAmount'
    },
    {
      icon: 'analytics',
      label: '商家优惠',
      value: {
        今日: 0,
        本月: 0,
        本年: 0
      },
      unit: '元',
      field: 'merchantCouponFee'
    },
    {
      icon: 'apps',
      label: '平台优惠',
      value: {
        今日: 0,
        本月: 0,
        本年: 0
      },
      unit: '元',
      field: 'platformCouponFee'
    },
    {
      icon: 'calculator',
      label: '平台服务费',
      value: {
        今日: 0,
        本月: 0,
        本年: 0
      },
      unit: '元',
      field: 'platformAmount'
    }
  ]

  barChartOptions: any = {
    // scaleShowVerticalLines: true,
    // responsive: true
  }

  barChartType: string = 'line'
  barChartLegend: boolean = true

  todayChartLabels: string[] = Array.from(new Array(8)).map((_, i) =>
    String(`${i * 3}-${(i + 1) * 3}时`)
  )
  todayChartData: any[] = [
    {
      data: [],
      label: '订单价格'
    },
    {
      data: [],
      label: '转给商户的钱'
    }
  ]

  monthChartLabels: string[] = Array.from(new Array(5)).map((_, i) =>
    String(`第${i + 1}周`)
  )
  monthChartData: any[] = [
    {
      data: [],
      label: '订单价格'
    },
    {
      data: [],
      label: '转给商户的钱'
    }
  ]

  yearChartLabels: string[] = Array.from(new Array(12)).map((_, i) =>
    String(`${i + 1}月`)
  )
  yearChartData: any[] = [
    {
      data: [],
      label: '订单价格'
    },
    {
      data: [],
      label: '转给商户的钱'
    }
  ]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<State>,
    private destroyService: DestroyService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.initSubscriber()
  }

  ionViewDidEnter(): void {
    this.store.dispatch(new FetchOrdersStatisticsOfToday())
    this.store.dispatch(new FetchOrdersStatisticsOfThisMonth())
    this.store.dispatch(new FetchOrdersStatisticsOfThisYear())
  }

  segmentChanged() {
    this.feedbackService.feedback()
  }

  private initSubscriber(): void {
    Observable.combineLatest(
      this.store.select(getOrdersStatisticsOfToday).filter(e => e.length > 0),
      this.store.select(getOrdersStatisticsOfThisMonth).filter(e => e.length > 0),
      this.store.select(getOrdersStatisticsOfThisYear).filter(e => e.length > 0)
    )
    .takeUntil(this.destroyService)
    .subscribe(([today, month, year]) => {
      this.computeGridStatistics(today, month, year)
      this.computeChartStatistics(today, month, year)
    })
  }

  

  /**
   * 计算 表格统计信息
   * 
   * @private
   * @param {any} today 
   * @param {any} month 
   * @param {any} year 
   * @memberof StatisticsManage
   */
  private computeGridStatistics(today, month, year): void {
    this.gridStatistics.forEach(item => {
      const accumulateField = this.accumulateField(item.field)
      item.value = {
        今日:
          item.unit === '个'
            ? accumulateField(today)
            : accumulateField(today).toFixed(2),
        本月:
          item.unit === '个'
            ? accumulateField(month)
            : accumulateField(month).toFixed(2),
        本年:
          item.unit === '个'
            ? accumulateField(year)
            : accumulateField(year).toFixed(2)
      }
    })
  }

  /**
   * 计算 图表统计信息
   * 
   * @private
   * @param {any} today 
   * @param {any} month 
   * @param {any} year 
   * @memberof StatisticsManage
   */
  private computeChartStatistics(today, month, year): void {
    this.todayChartData = this.transform(today)
    this.monthChartData = this.transform(month)
    this.yearChartData = this.transform(year)
  }

  /**
   * 返回 计算某个属性值的 函数
   * 
   * @private
   * @param {string} field 
   * @returns {*} 
   * @memberof StatisticsManage
   */
  private accumulateField(field: string): any {
    return arr =>
      arr.reduce((accu, curr) => {
        accu += Number(curr[field].value)
        return accu
      }, 0)
  }

  /**
   * 转化 成适当的图表数据格式
   * 
   * @private
   * @param {any} result 
   * @returns {*} 
   * @memberof StatisticsManage
   */
  private transform(result): any {
    return [
      {
        data: result.map(e => e.merchantAmount.value).map(Number),
        label: '商户实收'
      },
      {
        data: result.map(e => e.totalPrice.value).map(Number),
        label: '订单价格'
      }
    ]
  }
}

