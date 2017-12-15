import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { APIResponse } from '../../../app/interceptors/api-error-interceptor'
import { Purchase, PurchaseResp } from '../models/purchase.model'

import { PurchaseFilter } from '../purchase-management.action'


@Injectable()
export class PurchaseService {
  private purchaseUrl = '/admin/inStock'

  constructor(
    private http: HttpClient,
  ) {}

  fetchPurchases(
    tenantId: string,
    filter: PurchaseFilter
  ): Observable<Purchase[]> {
    let query = `?tenantId=${tenantId}`
    if (filter !== PurchaseFilter.DEFAULT) {
      query += `&status=${filter}`
    }

    return this.http
      .get(this.purchaseUrl + query)
      .map(resp => (resp as APIResponse).result as PurchaseResp[])
      .map(result =>
        result.map(Purchase.convertFromResp)
      )
      .catch(this.handleError)
  }

  addPurchase(tenantId: string, purchase: Purchase) {
    // console.log('to add purchase ', purchase)
    // return this.http.post(this.purchaseUrl, {
    //   ...purchase,
    //   tenantId
    // })
    // .catch(this.handleError)

    return this.http.post(this.purchaseUrl, {
      ...Purchase.convertFromModel(purchase),
      tenantId
    })
    .map(resp => (resp as APIResponse).result)
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
