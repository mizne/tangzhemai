import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { APIResponse } from '../../app/interceptors/api-error-interceptor'
// import { SalesOrder, SalesOrderResp } from './models/salesorder.model'

import { Order, OrderResp } from '../order/models/order.model'
// import { Saler } from './models/saler.model'
// import { Account } from './models/account.model'


@Injectable()
export class SalesOrderService {
  private orderUrl = '/admin/order'

  constructor(
    private http: HttpClient,
  ) {}

  fetchSalesOrders(
    tenantId: string,
  ): Observable<Order[]> {
    const query = `?tenantId=${tenantId}`

    return this.http
      .get(this.orderUrl + query)
      .map(resp => (resp as APIResponse).result as OrderResp[])
      .map(result =>
        result.map(Order.convertFromResp)
      )
      .catch(this.handleError)

  }

  // addSalesOrder(tenantId: string, salesOrder: SalesOrder): Observable<any> {
  //   const accountName = allAccounts.find(e => e.id === salesOrder.accountId).name

  //   return Observable.fromPromise(this.storage.get('FAKE_SALES_ORDERS'))
  //   .mergeMap((salesOrders) => {
  //     salesOrders = salesOrders || []
  //     salesOrders.push({
  //       ...salesOrder,
  //       accountName,
  //       createdAt: new Date()
  //     })

  //     return this.storage.set('FAKE_SALES_ORDERS', salesOrders)
  //   })
  // }

  // fetchSalers(tenantId: string): Observable<Saler[]> {
  //   return Observable.of(allSalers)
  // }

  // fetchAccounts(tenantId: string): Observable<Account[]> {
  //   return Observable.of(allAccounts)
  // }


  private handleError(error: any) {
    const errMsg = error.message
      ? error.message
      : error.status ? `${error.status} - ${error.statusText}` : 'Server error'
    console.error(errMsg) // log to console instead
    return Observable.throw(errMsg)
  }
}
