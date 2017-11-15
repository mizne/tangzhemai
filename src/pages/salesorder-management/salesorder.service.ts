import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { APIResponse } from '../../app/interceptors/api-error-interceptor'
import { SalesOrder, SalesOrderResp } from './models/salesorder.model'
import { Saler } from './models/saler.model'
import { Account } from './models/account.model'

import * as R from 'ramda'

import { Storage } from '@ionic/storage'

const allSalers = [
  {
    id: '0',
    name: '0号销售员'
  },
  {
    id: '1',
    name: '1号销售员'
  }
]

const allAccounts = [
  {
    id: '0',
    name: '客户0'
  },
  {
    id: '1',
    name: '客户1'
  }
]

@Injectable()
export class SalesOrderService {
  private goodsUrl = '/admin/food'
  private goodsCountUrl = '/admin/foodByCount'
  private goodsTypeUrl = '/admin/menus'
  private goodsUnitUrl = '/admin/units'
  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {}

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

    return Observable.fromPromise(this.storage.get('FAKE_SALES_ORDERS').then(salesOrders => salesOrders || []))
  }

  addSalesOrder(tenantId: string, salesOrder: SalesOrder): Observable<any> {
    const accountName = allAccounts.find(e => e.id === salesOrder.accountId).name
    
    return Observable.fromPromise(this.storage.get('FAKE_SALES_ORDERS'))
    .mergeMap((salesOrders) => {
      salesOrders = salesOrders || []
      salesOrders.push({
        ...salesOrder,
        accountName,
        createdAt: new Date()
      })

      return this.storage.set('FAKE_SALES_ORDERS', salesOrders)
    })
  }

  fetchSalers(tenantId: string): Observable<Saler[]> {
    return Observable.of(allSalers)
  }

  fetchAccounts(tenantId: string): Observable<Account[]> {
    return Observable.of(allAccounts)
  }

  
  private handleError(error: any) {
    const errMsg = error.message
      ? error.message
      : error.status ? `${error.status} - ${error.statusText}` : 'Server error'
    console.error(errMsg) // log to console instead
    return Observable.throw(errMsg)
  }
}
