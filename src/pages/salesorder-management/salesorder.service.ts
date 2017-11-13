import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { APIResponse } from '../../app/interceptors/api-error-interceptor'
import { SalesOrder, SalesOrderResp } from './models/salesorder.model'
import { Saler } from './models/saler.model'
import { Account } from './models/account.model'

import * as R from 'ramda'

const fakeSalesOrders: SalesOrder[] = [
]

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
    
    // return this.http
    //   .get(this.goodsUrl + query)
    //   .map(resp => (resp as APIResponse).result as SalesOrderResp[])
    //   .map(result =>
    //     result.map(SalesOrder.convertFromResp)
    //   )
    //   .catch(this.handleError)

    return Observable.of(fakeSalesOrders)
  }

  addSalesOrder(tenantId: string, salesOrder: SalesOrder): Observable<any> {
    console.log('to add sales order ', salesOrder)
    fakeSalesOrders.push(salesOrder)
    return Observable.of('success')
  }

  fetchSalers(tenantId: string): Observable<Saler[]> {
    return Observable.of([
      {
        id: '0',
        name: '0号销售员'
      },
      {
        id: '1',
        name: '1号销售员'
      }
    ])
  }

  fetchAccounts(tenantId: string): Observable<Account[]> {
    return Observable.of([
      {
        id: '0',
        name: '客户0'
      },
      {
        id: '1',
        name: '客户1'
      }
    ])
  }

  
  private handleError(error: any) {
    const errMsg = error.message
      ? error.message
      : error.status ? `${error.status} - ${error.statusText}` : 'Server error'
    console.error(errMsg) // log to console instead
    return Observable.throw(errMsg)
  }
}
