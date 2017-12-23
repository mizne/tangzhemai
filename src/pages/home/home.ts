import { Component } from '@angular/core'
import { NavController, App } from 'ionic-angular'

import { Store } from '@ngrx/store'
import { State, getTodayStatistics } from './reducers'
import { FetchTodayStatisticsAction } from './home.action'

import { TenantService } from '../../app/services/tenant.service'
import { DestroyService } from '../../app/services/destroy.service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DestroyService]
})
export class HomePage {
  appRow1 = [
    {
      id: 0,
      label: '商品管理',
      value: 'goods',
      page: 'GoodsManagementPage'
    },
    {
      id: 1,
      label: '进货管理',
      icon: 'jinhuo',
      value: 'purchase',
      page: 'PurchaseManagementPage'
    },
    {
      id: 2,
      label: '销售订单',
      value: 'sales',
      page: 'SalesorderManagementPage'
    },
    {
      id: 3,
      label: '统计管理',
      value: 'statistics',
      page: 'StatisticsPage'
    }
  ]

  appRow2 = [
    {
      id: 0,
      label: '更多',
      value: 'more',
      page: 'MoreAppsPage'
    }
  ]

  todayMerchantAmount: number
  todayOrderCount: number

  merchantName: Promise<string>

  constructor(
    public navCtrl: NavController,
    private store: Store<State>,
    private app: App,
    private tenantService: TenantService,
    private destroyService: DestroyService
  ) {}

  ionViewDidLoad() {
    this.initDataSource()
    this.initSubscriber()
  }

  ionViewDidEnter() {
    this.store.dispatch(new FetchTodayStatisticsAction())
  }

  toPage(pageName: string): void {
    this.app.getRootNav().push(pageName)
  }

  private initDataSource(): void {
    this.merchantName = this.tenantService.getAliasName()
  }

  private initSubscriber(): void {
    this.store
      .select(getTodayStatistics)
      .skip(1)
      .takeUntil(this.destroyService)
      .subscribe(todayStatistics => {
        const total = todayStatistics
          .map(e => ({
            orderCount: Number(e.num.value),
            merchantAmount: Number(e.merchantAmount.value)
          }))
          .reduce(
            (accu, curr) => {
              accu.orderCount += curr.orderCount
              accu.merchantAmount += curr.merchantAmount
              return accu
            },
            {
              orderCount: 0,
              merchantAmount: 0
            }
          )

        this.todayMerchantAmount = Number(total.merchantAmount.toFixed(2))
        this.todayOrderCount = total.orderCount

      })
  }
}
