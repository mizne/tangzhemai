import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { APIResponse } from '../../app/interceptors/api-error-interceptor'

import { CheckAccount } from './models/check-account.model' 
import { GoodsWriteOff } from './models/goods-writeoff.model'
import { CollectMoney } from './models/collect-money.model'

import * as R from 'ramda'

export interface FetchCheckAccountResp {
  checkAccount: CheckAccount,
  goodsWriteOff: GoodsWriteOff,
  collectMoney: CollectMoney
}

@Injectable()
export class CheckAccountService {
  private goodsWriteOffUrl = '/admin/GoodsWriteOff'
  private revenueReceivedUrl = '/admin/revenueReceived'

  constructor(private http: HttpClient) {}

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
      console.log(result)
      return result
    })
  }

  fetchGoodsWriteOff(tenantId: string, startTime: string, endTime: string): Observable<GoodsWriteOff[]> {
    const query = `?tenantId=${tenantId}&startDate=${startTime}&endDate=${endTime}`

    return this.http
      .get(this.goodsWriteOffUrl + query)
      .map(resp => (resp as APIResponse).result)
  }

  fetchRevenueReceived(tenantId: string, startTime: string, endTime: string): Observable<CollectMoney[]> {
    const query = `?tenantId=${tenantId}&startDate=${startTime}&endDate=${endTime}`

    return this.http
      .get(this.revenueReceivedUrl + query)
      .map(resp => (resp as APIResponse).result)
  }

  private handleError(error: any) {
    const errMsg = error.message
      ? error.message
      : error.status ? `${error.status} - ${error.statusText}` : 'Server error'
    console.error(errMsg) // log to console instead
    return Observable.throw(errMsg)
  }
}
