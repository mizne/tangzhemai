import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { APIResponse } from '../../app/interceptors/api-error-interceptor'

import * as R from 'ramda'

@Injectable()
export class CheckAccountService {
  private goodsUrl = '/admin/food'
  constructor(private http: HttpClient) {}

  fetchGoods(
    tenantId: string,
  ): Observable<any> {
    
    return this.http
      .get(this.goodsUrl)
      .map(resp => (resp as APIResponse).result)
      // .map(result =>
      //   result.map(Goods.convertFromResp)
      // )
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
