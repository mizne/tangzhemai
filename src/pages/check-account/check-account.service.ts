import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { APIResponse } from '../../app/interceptors/api-error-interceptor'

import { CheckAccount } from './models/check-account.model'
import { GoodsWriteOff } from './models/goods-writeoff.model'
import { CollectMoney } from './models/collect-money.model'
import { LoggerService } from '../../app/services/logger.service'

export interface FetchCheckAccountResp {
  checkAccount: CheckAccount,
  goodsWriteOff: GoodsWriteOff,
  collectMoney: CollectMoney
}

@Injectable()
export class CheckAccountService {
  private goodsWriteOffUrl = '/admin/GoodsWriteOff'
  private revenueReceivedUrl = '/admin/revenueReceived'

  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) {}

  fetchCheckAccount(tenantId: string, startTime: string, endTime: string): Observable<FetchCheckAccountResp> {

    return Observable.forkJoin(
      this.fetchGoodsWriteOff(tenantId, startTime, endTime),
      this.fetchRevenueReceived(tenantId, startTime, endTime)
    )
    .map(([goodsWriteOffs, revenueReceiveds]) => {
      const goodsWriteOff = goodsWriteOffs[0]
      const revenueReceived = revenueReceiveds[0]
      const checkAccount: CheckAccount = {
        merchantTotalRevenue: revenueReceived.revenueReceived + goodsWriteOff.goodsWriteoffRevenue,
        revenueReceived: revenueReceived.revenueReceived,
        goodsWriteoffRevenue: goodsWriteOff.goodsWriteoffRevenue,
        totalRevenueNet: revenueReceived.revenueReceivedNet + goodsWriteOff.goodsWriteoffRevenueNet,
        revenueReceivedNet: revenueReceived.revenueReceivedNet,
        goodsWriteoffRevenueNet: goodsWriteOff.goodsWriteoffRevenueNet
      }

      const result = {
        checkAccount: checkAccount,
        goodsWriteOff: goodsWriteOff,
        collectMoney: revenueReceived
      }
      return result
    })
    .catch((e) => {
      return this.logger.httpError({
        module: 'CheckAccountService',
        method: 'fetchCheckAccount',
        error: e
      })
    })
  }

  fetchGoodsWriteOff(tenantId: string, startTime: string, endTime: string): Observable<GoodsWriteOff[]> {
    const query = `?tenantId=${tenantId}&startDate=${startTime}&endDate=${endTime}`

    return this.http
      .get(this.goodsWriteOffUrl + query)
      .map(resp => (resp as APIResponse).result)
      .catch((e) => {
        return this.logger.httpError({
          module: 'CheckAccountService',
          method: 'fetchGoodsWriteOff',
          error: e
        })
      })
  }

  fetchRevenueReceived(tenantId: string, startTime: string, endTime: string): Observable<CollectMoney[]> {
    const query = `?tenantId=${tenantId}&startDate=${startTime}&endDate=${endTime}`

    return this.http
      .get(this.revenueReceivedUrl + query)
      .map(resp => (resp as APIResponse).result)
      .catch((e) => {
        return this.logger.httpError({
          module: 'CheckAccountService',
          method: 'fetchRevenueReceived',
          error: e
        })
      })
  }
}
