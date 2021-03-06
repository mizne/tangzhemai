import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Storage } from '@ionic/storage'
import fecha from 'fecha'

import { GoodsStatistics } from '../../pages/statistics/models/statistics.model'
import { LoggerService } from './logger.service'

// import { LoggerService } from '../../app/services/logger.service'

/*
  Generated class for the OrderProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StatisticsService {
  private url = '/admin/echats/orderStatisticByTime'
  private goodsUrl = '/admin/echats/foodsEchats'

  constructor(
    public http: HttpClient,
    // private logger: LoggerService,
    private storage: Storage,
    private logger: LoggerService
  ) {}


  /**
   * 获取 当天 所有订单统计信息
   *
   * @returns {Observable<Array<any>>}
   * @memberof StatisticsService
   */
  fetchOrderStatisticsOfToday(): Observable<Array<any>> {
    const now = new Date()
    const nextDay = new Date(now.getTime() + 24 * 60 * 60 * 1000)

    const startTime = fecha.format(now, 'YYYY-M-DD')
    const endTime = fecha.format(nextDay, 'YYYY-M-DD')
    return this._fetchOrderStatistics({
      startTime,
      endTime,
      type: 1,
      status: 3
    })
  }


  /**
   * 获取 当月 所有订单统计信息
   *
   * @returns {Observable<Array<any>>}
   * @memberof StatisticsService
   */
  fetchOrderStatisticsOfThisMonth(): Observable<Array<any>> {
    const [startYear, startMonth] = fecha
      .format(new Date(), 'YYYY-MM')
      .split('-')
      .map(Number)
    let endTime

    if (startMonth === 12) {
      endTime = `${startYear + 1}-1`
    } else {
      endTime = `${startYear}-${startMonth + 1}`
    }

    return this._fetchOrderStatistics({
      startTime: `${startYear}-${startMonth}`,
      endTime,
      type: 2,
      status: 3
    })
  }


  /**
   * 获取 当年 所有订单统计信息
   *
   * @returns {Observable<Array<any>>}
   * @memberof StatisticsService
   */
  fetchOrderStatisticsOfThisYear(): Observable<Array<any>> {
    const startYear = fecha.format(new Date(), 'YYYY')
    const endYear = String(+startYear + 1)

    return this._fetchOrderStatistics({
      startTime: startYear,
      endTime: endYear,
      type: 3,
      status: 3
    })
  }


  /**
   * 获取 统计信息
   *
   * @private
   * @param {any} {
   *     startTime,
   *     endTime,
   *     type,
   *     status
   *   }
   * @returns {Observable<Array<any>>}
   * @memberof StatisticsService
   */
  private _fetchOrderStatistics({
    startTime,
    endTime,
    type,
    status
  }): Observable<Array<any>> {
    return Observable.fromPromise(this.storage.get('TENANT_ID'))
      .mergeMap(tenantId => {
        return this.http.post(this.url, {
          tenantId,
          startTime,
          endTime,
          type,
          status
        })
      })
      .map(resp => (resp as any).result)
      .catch((e) => {
        return this.logger.httpError({
          module: 'StatisticsService',
          method: '_fetchOrderStatistics',
          error: e
        })
      })
  }

  fetchGoodsStatisticsOfToday(): Observable<GoodsStatistics[]> {
    const now = new Date()
    const startTime = fecha.format(now, 'YYYY-M-DD')
    return this._fetchGoodsStatistics({ startTime, type: 1 })
  }

  fetchGoodsStatisticsOfThisMonth(): Observable<GoodsStatistics[]> {
    const now = new Date()
    const startTime = fecha.format(now, 'YYYY-M')
    return this._fetchGoodsStatistics({ startTime, type: 3 })
  }

  fetchGoodsStatisticsOfThisYear(): Observable<GoodsStatistics[]> {
    const now = new Date()
    const startTime = fecha.format(now, 'YYYY')
    return this._fetchGoodsStatistics({ startTime, type: 4 })
  }

  private _fetchGoodsStatistics({ startTime, type }): Observable<GoodsStatistics[]> {
    return Observable.fromPromise(this.storage.get('TENANT_ID'))
      .mergeMap(tenantId => {
        return this.http.post(this.goodsUrl, { tenantId, startTime, type })
      })
      .map(resp => (resp as any).result)
      .map(results => results.map(GoodsStatistics.convertFromResp))
      .catch((e) => {
        return this.logger.httpError({
          module: 'StatisticsService',
          method: '_fetchGoodsStatistics',
          error: e
        })
      })
  }
}
