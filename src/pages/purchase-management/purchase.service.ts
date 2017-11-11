import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { APIResponse } from '../../app/interceptors/api-error-interceptor'
import { Purchase, PurchaseResp } from './models/purchase.model'

import * as R from 'ramda'

@Injectable()
export class PurchaseService {
  private goodsUrl = '/admin/food'
  private goodsCountUrl = '/admin/foodByCount'
  private goodsTypeUrl = '/admin/menus'
  private goodsUnitUrl = '/admin/units'
  constructor(private http: HttpClient) {}

  fetchPurchases(
    tenantId: string,
  ): Observable<Purchase[]> {
    const query = `?tenantId=${tenantId}`
    
    return this.http
      .get(this.goodsUrl + query)
      .map(resp => (resp as APIResponse).result as PurchaseResp[])
      .map(result =>
        result.map(Purchase.convertFromResp)
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
