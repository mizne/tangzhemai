import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { APIResponse } from '../../app/interceptors/api-error-interceptor'
import { Order, OrderResp } from './models/order.model'

import * as R from 'ramda'

@Injectable()
export class OrderService {
  private orderUrl = '/admin/order'
  constructor(private http: HttpClient) {}

  fetchOrders(
    tenantId: string,
    startTime: string,
    endTime: string
  ): Observable<Order[]> {
    const query = `?tenantId=${tenantId}&startTime=${startTime}&endTime=${endTime}`

    console.log(startTime)
    console.log(endTime)
    return this.http
      .get(this.orderUrl + query)
      .map(resp => (resp as APIResponse).result as OrderResp[])
      .map(result =>
        result.map(Order.convertFromResp)
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
