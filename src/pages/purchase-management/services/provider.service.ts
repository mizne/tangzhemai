import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { APIResponse } from '../../../app/interceptors/api-error-interceptor'
import { Provider, ProviderResp } from '../models/provider.model'

import * as R from 'ramda'

@Injectable()
export class ProviderService {
  private providerUrl = '/admin/food'

  constructor(private http: HttpClient) {}

  fetchProviders(
    tenantId: string,
  ): Observable<Provider[]> {
    const query = `?tenantId=${tenantId}`
    
    // return this.http
    //   .get(this.providerUrl + query)
    //   .map(resp => (resp as APIResponse).result as ProviderResp[])
    //   .map(result =>
    //     result.map(Provider.convertFromResp)
    //   )
    //   .catch(this.handleError)

      return Observable.of([
        {
          id: '0',
          name: '测试供应商0'
        },
        {
          id: '1',
          name: '测试供应商1'
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
