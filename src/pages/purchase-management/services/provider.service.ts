import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { APIResponse } from '../../../app/interceptors/api-error-interceptor'
import { Provider, ProviderResp } from '../models/provider.model'

import * as R from 'ramda'

@Injectable()
export class ProviderService {
  private providerUrl = '/admin/supplierManage'

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

      return this.http.get(this.providerUrl + query)
      .map(resp => (resp as APIResponse).result as Provider[])
      .catch(this.handleError)
  }

  addProvider(tenantId: string, providerName: string): Observable<any> {
    return this.http.post(this.providerUrl, {
      name: providerName
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
