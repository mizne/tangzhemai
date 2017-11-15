import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { APIResponse } from '../../../app/interceptors/api-error-interceptor'
import { Stock, StockResp } from '../models/stock.model'

import * as R from 'ramda'

@Injectable()
export class StockService {
  private stockUrl = '/admin/food'
  
  constructor(private http: HttpClient) {}

  fetchStocks(
    tenantId: string,
  ): Observable<Stock[]> {
    const query = `?tenantId=${tenantId}`
    
    // return this.http
    //   .get(this.stockUrl + query)
    //   .map(resp => (resp as APIResponse).result as StockResp[])
    //   .map(result =>
    //     result.map(Stock.convertFromResp)
    //   )
    //   .catch(this.handleError)

    return Observable.of([
      {
        id: '0',
        name: '仓库0'
      },
      {
        id: '1',
        name: '仓库1'
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
