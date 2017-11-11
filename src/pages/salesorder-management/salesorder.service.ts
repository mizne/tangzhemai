import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { APIResponse } from '../../app/interceptors/api-error-interceptor'
import { SalesOrder, SalesOrderResp } from './models/salesorder.model'

import * as R from 'ramda'

@Injectable()
export class SalesOrderService {
  private goodsUrl = '/admin/food'
  private goodsCountUrl = '/admin/foodByCount'
  private goodsTypeUrl = '/admin/menus'
  private goodsUnitUrl = '/admin/units'
  constructor(private http: HttpClient) {}

  fetchSalesOrders(
    tenantId: string,
  ): Observable<SalesOrder[]> {
    const query = `?tenantId=${tenantId}`
    
    return this.http
      .get(this.goodsUrl + query)
      .map(resp => (resp as APIResponse).result as SalesOrderResp[])
      .map(result =>
        result.map(SalesOrder.convertFromResp)
      )
      .catch(this.handleError)
  }

  
  private handleError(error: any) {
    const errMsg = error.message
      ? error.message
      : error.status ? `${error.status} - ${error.statusText}` : 'Server error'
    console.error(errMsg) // log to console instead
    return Observable.throw(errMsg)
  }
}
